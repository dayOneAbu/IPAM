/*
  Warnings:

  - You are about to drop the column `lanRangeId` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `tunnelRangeId` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `TunnelIP_DC_ER21` on the `LeasedATMIps` table. All the data in the column will be lost.
  - You are about to drop the column `TunnelIP_DC_ER22` on the `LeasedATMIps` table. All the data in the column will be lost.
  - You are about to drop the column `TunnelIP_DR_ER11` on the `LeasedATMIps` table. All the data in the column will be lost.
  - You are about to drop the column `TunnelIP_DR_ER12` on the `LeasedATMIps` table. All the data in the column will be lost.
  - You are about to drop the column `isReserved` on the `LeasedATMIps` table. All the data in the column will be lost.
  - You are about to drop the column `isTaken` on the `LeasedATMIps` table. All the data in the column will be lost.
  - You are about to drop the column `TunnelIP_DC_ER21` on the `LeasedBranchIps` table. All the data in the column will be lost.
  - You are about to drop the column `TunnelIP_DC_ER22` on the `LeasedBranchIps` table. All the data in the column will be lost.
  - You are about to drop the column `TunnelIP_DR_ER11` on the `LeasedBranchIps` table. All the data in the column will be lost.
  - You are about to drop the column `TunnelIP_DR_ER12` on the `LeasedBranchIps` table. All the data in the column will be lost.
  - You are about to drop the column `assignedTo` on the `LeasedBranchIps` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `LeasedBranchIps` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tunnelIpId]` on the table `LeasedATMIps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tunnelIpId]` on the table `LeasedBranchIps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[assignedToId]` on the table `LeasedBranchIps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `allLANIpsId` to the `LeasedATMIps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tunnelIpId` to the `LeasedATMIps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allLANIpsId` to the `LeasedBranchIps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedToId` to the `LeasedBranchIps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tunnelIpId` to the `LeasedBranchIps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_lanRangeId_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_tunnelRangeId_fkey";

-- DropForeignKey
ALTER TABLE "LeasedBranchIps" DROP CONSTRAINT "LeasedBranchIps_branchId_fkey";

-- DropIndex
DROP INDEX "LeasedBranchIps_branchId_key";

-- AlterTable
ALTER TABLE "District" DROP COLUMN "lanRangeId",
DROP COLUMN "tunnelRangeId";

-- AlterTable
ALTER TABLE "LeasedATMIps" DROP COLUMN "TunnelIP_DC_ER21",
DROP COLUMN "TunnelIP_DC_ER22",
DROP COLUMN "TunnelIP_DR_ER11",
DROP COLUMN "TunnelIP_DR_ER12",
DROP COLUMN "isReserved",
DROP COLUMN "isTaken",
ADD COLUMN     "allLANIpsId" INTEGER NOT NULL,
ADD COLUMN     "tunnelIpId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LeasedBranchIps" DROP COLUMN "TunnelIP_DC_ER21",
DROP COLUMN "TunnelIP_DC_ER22",
DROP COLUMN "TunnelIP_DR_ER11",
DROP COLUMN "TunnelIP_DR_ER12",
DROP COLUMN "assignedTo",
DROP COLUMN "branchId",
ADD COLUMN     "allLANIpsId" INTEGER NOT NULL,
ADD COLUMN     "assignedToId" INTEGER NOT NULL,
ADD COLUMN     "tunnelIpId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AllLANIps" (
    "id" SERIAL NOT NULL,
    "isTaken" BOOLEAN NOT NULL,
    "isReserved" BOOLEAN NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AllLANIps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllTunnelIps" (
    "id" SERIAL NOT NULL,
    "isTaken" BOOLEAN NOT NULL,
    "isReserved" BOOLEAN NOT NULL,
    "TunnelIP_DR_ER11" TEXT NOT NULL,
    "TunnelIP_DR_ER12" TEXT NOT NULL,
    "TunnelIP_DC_ER21" TEXT NOT NULL,
    "TunnelIP_DC_ER22" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AllTunnelIps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeasedATMIps_tunnelIpId_key" ON "LeasedATMIps"("tunnelIpId");

-- CreateIndex
CREATE UNIQUE INDEX "LeasedBranchIps_tunnelIpId_key" ON "LeasedBranchIps"("tunnelIpId");

-- CreateIndex
CREATE UNIQUE INDEX "LeasedBranchIps_assignedToId_key" ON "LeasedBranchIps"("assignedToId");

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_allLANIpsId_fkey" FOREIGN KEY ("allLANIpsId") REFERENCES "AllLANIps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_tunnelIpId_fkey" FOREIGN KEY ("tunnelIpId") REFERENCES "AllTunnelIps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedATMIps" ADD CONSTRAINT "LeasedATMIps_allLANIpsId_fkey" FOREIGN KEY ("allLANIpsId") REFERENCES "AllLANIps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedATMIps" ADD CONSTRAINT "LeasedATMIps_tunnelIpId_fkey" FOREIGN KEY ("tunnelIpId") REFERENCES "AllTunnelIps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
