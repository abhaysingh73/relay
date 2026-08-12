import { Queue } from "bullmq";

export const queue = 'events';
export const connection = {
    host: 'localhost',
    port: 6379
};

export const eventQueue = new Queue(queue, { connection });
