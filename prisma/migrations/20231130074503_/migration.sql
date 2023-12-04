/*
  Warnings:

  - A unique constraint covering the columns `[lowerLimit]` on the table `LANRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[upperLimit]` on the table `LANRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lowerLimit]` on the table `TunnelRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[upperLimit]` on the table `TunnelRange` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LANRange_lowerLimit_upperLimit_key";

-- CreateIndex
CREATE UNIQUE INDEX "LANRange_lowerLimit_key" ON "LANRange"("lowerLimit");

-- CreateIndex
CREATE UNIQUE INDEX "LANRange_upperLimit_key" ON "LANRange"("upperLimit");

-- CreateIndex
CREATE UNIQUE INDEX "TunnelRange_lowerLimit_key" ON "TunnelRange"("lowerLimit");

-- CreateIndex
CREATE UNIQUE INDEX "TunnelRange_upperLimit_key" ON "TunnelRange"("upperLimit");
