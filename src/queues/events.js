import { Queue } from "bullmq";

export const queue = 'events';
export const dlq = 'events-dlq';

export const connection = {
    host: 'localhost',
    port: 6379
};

export const eventQueue = new Queue(queue, { connection });
export const eventDlq = new Queue(dlq, { connection });
