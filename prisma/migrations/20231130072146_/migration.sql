/*
  Warnings:

  - A unique constraint covering the columns `[clusterName]` on the table `LANRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lowerLimit]` on the table `LANRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[upperLimit]` on the table `LANRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clusterName]` on the table `TunnelRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lowerLimit]` on the table `TunnelRange` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[upperLimit]` on the table `TunnelRange` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clusterName` to the `LANRange` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clusterName` to the `TunnelRange` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LANRange" ADD COLUMN     "clusterName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TunnelRange" ADD COLUMN     "clusterName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LANRange_clusterName_key" ON "LANRange"("clusterName");

-- CreateIndex
CREATE UNIQUE INDEX "LANRange_lowerLimit_key" ON "LANRange"("lowerLimit");

-- CreateIndex
CREATE UNIQUE INDEX "LANRange_upperLimit_key" ON "LANRange"("upperLimit");

-- CreateIndex
CREATE UNIQUE INDEX "TunnelRange_clusterName_key" ON "TunnelRange"("clusterName");

-- CreateIndex
CREATE UNIQUE INDEX "TunnelRange_lowerLimit_key" ON "TunnelRange"("lowerLimit");

-- CreateIndex
CREATE UNIQUE INDEX "TunnelRange_upperLimit_key" ON "TunnelRange"("upperLimit");
