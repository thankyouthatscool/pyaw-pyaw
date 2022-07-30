/*
  Warnings:

  - A unique constraint covering the columns `[socketId]` on the table `SessionData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SessionData_socketId_key" ON "SessionData"("socketId");
