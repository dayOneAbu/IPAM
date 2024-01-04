-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "ATM" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    "wanAddress" TEXT NOT NULL,
    "loopBackAddress" TEXT NOT NULL,
    "isOutlet" BOOLEAN NOT NULL DEFAULT false,
    "remark" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ATM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "clusterId" INTEGER,
    "tunnelRangeId" INTEGER,
    "lanRangeId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cluster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TunnelRange" (
    "id" SERIAL NOT NULL,
    "clusterName" TEXT NOT NULL,
    "lowerLimit" TEXT NOT NULL,
    "upperLimit" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TunnelRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LANRange" (
    "id" SERIAL NOT NULL,
    "clusterName" TEXT NOT NULL,
    "lowerLimit" TEXT NOT NULL,
    "upperLimit" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LANRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeasedBranchIps" (
    "id" SERIAL NOT NULL,
    "isTaken" BOOLEAN NOT NULL,
    "isReserved" BOOLEAN NOT NULL,
    "remark" TEXT NOT NULL,
    "allLANIpsId" INTEGER NOT NULL,
    "tunnelIpId" INTEGER NOT NULL,
    "assignedToId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeasedBranchIps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeasedATMIps" (
    "id" SERIAL NOT NULL,
    "remark" TEXT NOT NULL,
    "allLANIpsId" INTEGER NOT NULL,
    "tunnelIpId" INTEGER NOT NULL,
    "atmId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeasedATMIps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllLANIps" (
    "id" SERIAL NOT NULL,
    "isTaken" BOOLEAN NOT NULL DEFAULT false,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clusterId" INTEGER NOT NULL,

    CONSTRAINT "AllLANIps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllTunnelIps" (
    "id" SERIAL NOT NULL,
    "isTaken" BOOLEAN NOT NULL DEFAULT false,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "TunnelIP_DR_ER11" TEXT NOT NULL,
    "TunnelIP_DR_ER12" TEXT NOT NULL,
    "TunnelIP_DC_ER21" TEXT NOT NULL,
    "TunnelIP_DC_ER22" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clusterId" INTEGER NOT NULL,

    CONSTRAINT "AllTunnelIps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Branch_name_idx" ON "Branch"("name");

-- CreateIndex
CREATE INDEX "ATM_name_idx" ON "ATM"("name");

-- CreateIndex
CREATE UNIQUE INDEX "District_name_key" ON "District"("name");

-- CreateIndex
CREATE INDEX "District_name_idx" ON "District"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cluster_name_key" ON "Cluster"("name");

-- CreateIndex
CREATE INDEX "Cluster_name_idx" ON "Cluster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TunnelRange_lowerLimit_key" ON "TunnelRange"("lowerLimit");

-- CreateIndex
CREATE UNIQUE INDEX "TunnelRange_upperLimit_key" ON "TunnelRange"("upperLimit");

-- CreateIndex
CREATE UNIQUE INDEX "LANRange_lowerLimit_key" ON "LANRange"("lowerLimit");

-- CreateIndex
CREATE UNIQUE INDEX "LANRange_upperLimit_key" ON "LANRange"("upperLimit");

-- CreateIndex
CREATE UNIQUE INDEX "LeasedBranchIps_allLANIpsId_key" ON "LeasedBranchIps"("allLANIpsId");

-- CreateIndex
CREATE UNIQUE INDEX "LeasedBranchIps_tunnelIpId_key" ON "LeasedBranchIps"("tunnelIpId");

-- CreateIndex
CREATE UNIQUE INDEX "LeasedBranchIps_assignedToId_key" ON "LeasedBranchIps"("assignedToId");

-- CreateIndex
CREATE UNIQUE INDEX "LeasedATMIps_allLANIpsId_key" ON "LeasedATMIps"("allLANIpsId");

-- CreateIndex
CREATE UNIQUE INDEX "LeasedATMIps_tunnelIpId_key" ON "LeasedATMIps"("tunnelIpId");

-- CreateIndex
CREATE UNIQUE INDEX "LeasedATMIps_atmId_key" ON "LeasedATMIps"("atmId");

-- CreateIndex
CREATE UNIQUE INDEX "AllLANIps_ipAddress_key" ON "AllLANIps"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "AllTunnelIps_TunnelIP_DR_ER11_key" ON "AllTunnelIps"("TunnelIP_DR_ER11");

-- CreateIndex
CREATE UNIQUE INDEX "AllTunnelIps_TunnelIP_DR_ER12_key" ON "AllTunnelIps"("TunnelIP_DR_ER12");

-- CreateIndex
CREATE UNIQUE INDEX "AllTunnelIps_TunnelIP_DC_ER21_key" ON "AllTunnelIps"("TunnelIP_DC_ER21");

-- CreateIndex
CREATE UNIQUE INDEX "AllTunnelIps_TunnelIP_DC_ER22_key" ON "AllTunnelIps"("TunnelIP_DC_ER22");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ATM" ADD CONSTRAINT "ATM_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ATM" ADD CONSTRAINT "ATM_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_tunnelRangeId_fkey" FOREIGN KEY ("tunnelRangeId") REFERENCES "TunnelRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_lanRangeId_fkey" FOREIGN KEY ("lanRangeId") REFERENCES "LANRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cluster" ADD CONSTRAINT "Cluster_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TunnelRange" ADD CONSTRAINT "TunnelRange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LANRange" ADD CONSTRAINT "LANRange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_allLANIpsId_fkey" FOREIGN KEY ("allLANIpsId") REFERENCES "AllLANIps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_tunnelIpId_fkey" FOREIGN KEY ("tunnelIpId") REFERENCES "AllTunnelIps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedBranchIps" ADD CONSTRAINT "LeasedBranchIps_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedATMIps" ADD CONSTRAINT "LeasedATMIps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedATMIps" ADD CONSTRAINT "LeasedATMIps_allLANIpsId_fkey" FOREIGN KEY ("allLANIpsId") REFERENCES "AllLANIps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedATMIps" ADD CONSTRAINT "LeasedATMIps_tunnelIpId_fkey" FOREIGN KEY ("tunnelIpId") REFERENCES "AllTunnelIps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasedATMIps" ADD CONSTRAINT "LeasedATMIps_atmId_fkey" FOREIGN KEY ("atmId") REFERENCES "ATM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllLANIps" ADD CONSTRAINT "AllLANIps_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllTunnelIps" ADD CONSTRAINT "AllTunnelIps_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
