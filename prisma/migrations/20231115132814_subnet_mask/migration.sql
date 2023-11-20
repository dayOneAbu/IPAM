/*
  Warnings:

  - You are about to drop the column `authoredBy` on the `LeasedATMIps` table. All the data in the column will be lost.
  - You are about to drop the column `authoredBy` on the `LeasedBranchIps` table. All the data in the column will be lost.
  - Added the required column `subnetMask` to the `AllLANIps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LeasedATMIps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LeasedBranchIps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AllLANIps" ADD COLUMN     "subnetMask" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LeasedATMIps" DROP COLUMN "authoredBy",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LeasedBranchIps" DROP COLUMN "authoredBy",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedATMIps" ADD CONSTRAINT "LeasedATMIps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
