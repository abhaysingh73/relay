-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('queued', 'delivered', 'failed');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "webhookUrl" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'queued',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
