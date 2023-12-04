/*
  Warnings:

  - A unique constraint covering the columns `[lowerLimit,upperLimit]` on the table `LANRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lowerLimit,upperLimit]` on the table `TunnelRange` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LANRange_clusterName_key";

-- DropIndex
DROP INDEX "LANRange_lowerLimit_key";

-- DropIndex
DROP INDEX "LANRange_upperLimit_key";

-- DropIndex
DROP INDEX "TunnelRange_clusterName_key";

-- DropIndex
DROP INDEX "TunnelRange_lowerLimit_key";

-- DropIndex
DROP INDEX "TunnelRange_upperLimit_key";

-- CreateIndex
CREATE UNIQUE INDEX "LANRange_lowerLimit_upperLimit_key" ON "LANRange"("lowerLimit", "upperLimit");

-- CreateIndex
CREATE UNIQUE INDEX "TunnelRange_lowerLimit_upperLimit_key" ON "TunnelRange"("lowerLimit", "upperLimit");
