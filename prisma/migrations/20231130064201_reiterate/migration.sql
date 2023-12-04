-- AlterTable
ALTER TABLE "AllLANIps" ALTER COLUMN "isTaken" SET DEFAULT false;

-- AlterTable
ALTER TABLE "AllTunnelIps" ALTER COLUMN "isTaken" SET DEFAULT false,
ALTER COLUMN "isReserved" SET DEFAULT false;
