import { connection, eventDlq } from "../queues/events.js";

const main = async () => {
    const counts = await eventDlq.getJobCounts(
        "waiting",
        "active",
        "failed",
        "delayed",
        "paused"
    );

    console.log("DLQ counts:", counts);

    const jobs = await eventDlq.getJobs([
        'waiting',
        'active',
        'failed',
        'delayed',
        'paused'
    ]);

    for (const job of jobs) {
        console.log({
            id: job.id,
            name: job.name,
            attemptsMade: job.attemptsMade,
            data: job.data,
            state: await job.getState(),
        })
    }

    await eventDlq.close();
}

main().catch((error) =>{
    console.error("Failed to inspect DLQ:", error);
    process.exit(1);
});