import "dotenv/config";
import { Worker } from "bullmq";
import axios from "axios";
import { connection, eventDlq, queue } from "../queues/events.js";
import { fetchDelivery, incrementDeliveryAttempt, updateDeliveryStatus } from "../services/deliveries.js";
import { decrypt, hmac } from "../utils/crypto.js";

const eventDlqPush = async (job, error, retryable = true, attemptsMade = job.attemptsMade) => {
    const lastAttempt = job.attemptsMade >= job.opts.attempts - 1;
    if (lastAttempt || !retryable) {
        await eventDlq.add('delivery',
            {
                id: job.data.id,
                originalJobId: job.id,
                attempts: attemptsMade,
                failedAt: new Date().toISOString(),
                error: error.message
            });
        console.log(`Job ${job.id}, pushed to DLQ`);
    }
}

const worker = new Worker(
    queue,
    async (job) => {
        console.log("Processing job:", job.id);
        console.log(
            new Date().toISOString(),
            "attempt:",
            job.attemptsMade
        );

        const delivery = await fetchDelivery(job.data?.id);

        if (!delivery) {
            throw new Error(`Delivery not found: ${job.data?.id}`);
        }
        const { endpoint, event, status } = delivery;
        const body = JSON.stringify(event.payload);

        try {
            const hmacSign = hmac(
                decrypt(endpoint.encryptedSecret),
                body
            );

            if (status !== "queued") {
                return {
                    skipped: true,
                    status
                };
            }

            let response;

            try {
                response = (await axios.post(
                    endpoint.url,
                    body,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-signature": hmacSign
                        }
                    }
                ));
            }
            catch (err) {
                let httpStatus;
                let retryable = true;

                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        httpStatus = err.response.status;
                        retryable =
                            httpStatus === 429 ||
                            (httpStatus >= 500 && httpStatus <= 599);
                    }
                }

                if (!retryable) {
                    await eventDlqPush(job, err, false, job.attemptsMade + 1);
                    await updateDeliveryStatus(delivery.id, 'failed');
                    return {
                        skipped: true,
                        httpStatus
                    };
                }

                const lastAttempt = job.attemptsMade >= job.opts.attempts - 1;
                if (lastAttempt) {
                    await updateDeliveryStatus(delivery.id, 'failed');
                }

                throw err;
            }

            await updateDeliveryStatus(delivery.id, 'delivered');

            return {
                sent: true,
                statusCode: response.status
            };
        } catch (err) {
            console.error("Event Delivery Worker:", err);
            throw err;
        } finally {
            await incrementDeliveryAttempt(delivery.id);
        }
    },
    {
        connection
    }
);

worker.on('completed', async (job, result) => {
    console.log(`Job ${job.id}, completed`, result);
});

worker.on('error', (error) => {
    console.log(`Worker error`);
});

worker.on('failed', async (job, error) => {
    console.error(`Job ${job?.id} failed:`);
    await eventDlqPush(job, error);
});