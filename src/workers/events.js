import "dotenv/config";
import { Worker } from "bullmq";
import { fetchOne, updateEvent } from "../services/events.js";
import axios from "axios";
import { connection, queue } from "../queues/events.js";
import { maxEventQueueAttempts } from "../config/constants.js";

const worker = new Worker(
    queue,
    async (job) => {
        console.log("Processing job:", job.id);
        console.log(
            new Date().toISOString(),
            "attempt:",
            job.attemptsMade
        );
        const event = await fetchOne(job.data?.id);

        if (!event) {
            throw new Error(`Event not found: ${job.data?.id}`);
        }

        const { status, webhookUrl, payload } = event;

        if (status !== "queued") {
            return {
                skipped: true,
                status
            };
        }

        let response;

        try {
            response = await axios.post(webhookUrl, payload);
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
                await updateEvent(event.id, { status: 'failed' });
                return {
                    skipped: true,
                    httpStatus
                };
            }

            if (job.attemptsMade > maxEventQueueAttempts - 2) {
                await updateEvent(event.id, { status: 'failed' });
            }

            throw err;
        }

        await updateEvent(event.id, { status: 'delivered' });

        return {
            sent: true,
            statusCode: response.status
        };
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

worker.on('failed', (job, error) => {
    console.error(`Job ${job?.id} failed:`);
});