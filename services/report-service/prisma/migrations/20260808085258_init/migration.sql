-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "reports";

-- CreateEnum
CREATE TYPE "reports"."ReportStatus" AS ENUM ('draft', 'submitted');

-- CreateTable
CREATE TABLE "reports"."Report" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "weekEnd" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT,
    "tasksCompleted" TEXT NOT NULL,
    "tasksPlanned" TEXT NOT NULL,
    "blockers" TEXT,
    "hoursWorked" DOUBLE PRECISION,
    "notes" TEXT,
    "status" "reports"."ReportStatus" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
