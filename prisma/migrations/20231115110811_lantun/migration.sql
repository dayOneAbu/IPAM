-- AlterTable
ALTER TABLE "District" ADD COLUMN     "lanRangeId" INTEGER,
ADD COLUMN     "tunnelRangeId" INTEGER;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_tunnelRangeId_fkey" FOREIGN KEY ("tunnelRangeId") REFERENCES "TunnelRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_lanRangeId_fkey" FOREIGN KEY ("lanRangeId") REFERENCES "LANRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;
