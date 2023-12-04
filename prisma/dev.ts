import { hash } from "bcryptjs";
import { db } from "~/server/db";
import { clusters, lanRange, tunnelRange } from "./data";

export const generatedLanIps = () => {
  /* */
};
export async function generatedTunnelIps() {
  /** */
}
export async function seedTunnelRange({
  item,
  userId,
}: {
  userId: number;
  item: {
    clusterName: string;
    lowerLimit: string;
    upperLimit: string;
    districts: string[];
  };
}) {
  return await db.tunnelRange.create({
    data: {
      clusterName: item.clusterName,
      lowerLimit: item.lowerLimit,
      upperLimit: item.upperLimit,
      createdBy: {
        connect: {
          id: userId,
        },
      },
      District: {
        connect: item.districts.map((d) => ({ name: d })),
      },
    },
  });
}

export async function seedLanRange({
  userId,
  item,
}: {
  userId: number;
  item: {
    clusterName: string;
    lowerLimit: string;
    upperLimit: string;
    districts: string[];
  };
}) {
  return await db.lANRange.create({
    data: {
      clusterName: item.clusterName,
      lowerLimit: item.lowerLimit,
      upperLimit: item.upperLimit,
      createdBy: {
        connect: {
          id: userId,
        },
      },
      District: {
        connect: item.districts.map((d) => ({ name: d })),
      },
    },
  });
}
export async function seedClusters({
  cName,
  userId,
}: {
  cName: string;
  userId: number;
}) {
  return await db.cluster.create({
    data: {
      name: cName,
      createdBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
export async function seedDistrict({
  district,
  userId,
  clusterId,
}: {
  district: string;
  userId: number;
  clusterId: number;
}) {
  return await db.district.create({
    data: {
      name: district,
      createdBy: {
        connect: {
          id: userId,
        },
      },
      cluster: {
        connect: {
          id: clusterId,
        },
      },
    },
  });
}
async function seedTopAdmin() {
  const user = await db.user.upsert({
    where: {
      email: "admin@cbe.com.et",
    },
    create: {
      email: "admin@cbe.com.et",
      password: await hash("&&P@ssw0rd$$23", 10),
      isAdmin: true,
    },
    update: {
      email: "admin@cbe.com.et",
      password: await hash("&&P@ssw0rd$$23", 10),
      isAdmin: true,
    },
  });
  if (!user) {
    console.log("admin user not seeded");
  }
  return user;
}
async function seed() {
  //step1: seed Cluster and district
  const admin = await seedTopAdmin();
  //step2: seed Cluster and district
  // clusters.map(async (item) => {
  //   const newCluster = await seedClusters({
  //     cName: item.name,
  //     userId: admin?.id,
  //   });
  //   item.districts.map(async (district) => {
  //     await seedDistrict({
  //       district: district,
  //       userId: admin?.id,
  //       clusterId: newCluster.id,
  //     });
  //   });
  // });
  //step3: seed Tunnel range
  tunnelRange.map(async (item) => {
    await seedTunnelRange({ userId: admin.id, item });
  });
  //step4: seed Tunnel range
  lanRange.map(async (item) => {
    await seedLanRange({ userId: admin.id, item });
  });
}

void seed();
