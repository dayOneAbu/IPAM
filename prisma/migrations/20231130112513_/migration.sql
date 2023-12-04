/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Cluster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `District` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TunnelRange_lowerLimit_upperLimit_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cluster_name_key" ON "Cluster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "District_name_key" ON "District"("name");
