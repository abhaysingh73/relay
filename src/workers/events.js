import "dotenv/config";
import { Worker } from "bullmq";
import { fetchOne, updateEvent } from "../services/events.js";
import axios from "axios";

const worker = new Worker(
    'events',
    async (job) => {
        console.log("Processing job:", job.id);

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
        const response = await axios.post(webhookUrl, payload);

        await updateEvent(event.id, { status: 'delivered' });

        return {
            sent: true,
            statusCode: response.status
        };
    },
    {
        connection: {
            host: 'localhost',
            port: 6379
        }
    }
);

worker.on('completed', async (job, result) => {
    console.log(`Job ${job.id}, completed`, result);
});

worker.on('error', (error) => {
    console.log(`Worker error`, error);
});

worker.on('failed', (job, error) => {
    console.error(`Job ${job?.id} failed:`, error);
});