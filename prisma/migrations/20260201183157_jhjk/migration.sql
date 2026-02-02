/*
  Warnings:

  - You are about to drop the `branch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeasedBranchIps" DROP CONSTRAINT "LeasedBranchIps_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "branch" DROP CONSTRAINT "Branch_districtId_fkey";

-- DropForeignKey
ALTER TABLE "branch" DROP CONSTRAINT "Branch_userId_fkey";

-- DropTable
DROP TABLE "branch";

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    "wanAddress" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Branch_name_idx" ON "Branch"("name");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
