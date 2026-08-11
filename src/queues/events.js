import { Queue } from "bullmq";

export const eventQueue = new Queue('events', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});
