/*
  Warnings:

  - Added the required column `socketId` to the `SessionData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionData" ADD COLUMN     "socketId" TEXT NOT NULL;
