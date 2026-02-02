/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { hash } from "bcryptjs";
import { db } from "~/server/db";
import { clusters, lanRange, tunnelRange } from "./data";
import tunnelInfo from "./data/tunnelInfo";
import atm_lanIntersection from "./data/atm-by-br-int.json";
import branch_lanIntersection from "./data/by-lan-int.json";

export const generateAndSeedLanIps = () => {
  lanRange.map(async (lan) => {
    if (lan.clusterName == "Group-12") {
      for (let x = lan.lowerLimit; x <= lan.upperLimit; x++) {
        for (let y = 0; y <= 254; y++) {
          for (let z = 0; z <= 248; z += 8) {
            await db.allLANIps.create({
              data: {
                ipAddress: `10.${x}.${y}.${z}`,
                cluster: {
                  connect: {
                    name: lan.clusterName.toLowerCase(),
                  },
                },
                lanRange: {
                  connect: {
                    upperLimit: `10.${lan.upperLimit}.0.0`,
                  },
                },
              },
            });
          }
        }
      }
    } else {
      for (let x = lan.lowerLimit; x <= lan.upperLimit; x++) {
        for (let y = 0; y <= 254; y++) {
          await db.allLANIps.create({
            data: {
              ipAddress: `10.${x}.${y}.${1}`,
              cluster: {
                connect: {
                  name: lan.clusterName.toLowerCase(),
                },
              },
              lanRange: {
                connect: {
                  upperLimit: `10.${lan.upperLimit}.0.0`,
                },
              },
            },
          });
        }
      }
    }
  });
};
export function generateAndSeedTunnelIps() {
  tunnelRange.map(async (tunnel) => {
    for (let x = tunnel.lowerLimit; x + 12 <= tunnel.upperLimit; x++) {
      for (let z = 0; z < 255; z++) {
        await db.allTunnelIps.create({
          data: {
            TunnelIP_DR_ER11: `10.220.${x}.${z}`,
            TunnelIP_DR_ER12: `10.220.${x + 4}.${z}`,
            TunnelIP_DC_ER21: `10.220.${x + 8}.${z}`,
            TunnelIP_DC_ER22: `10.220.${x + 12}.${z}`,
            cluster: {
              connect: {
                name: tunnel.clusterName.toLowerCase(),
              },
            },
            tunnelRange: {
              connect: {
                upperLimit: `10.220.${tunnel.upperLimit}.254`,
              },
            },
          },
        });
      }
    }
  });
}

export async function seedTunnelRange({
  item,
  userId,
}: {
  userId: number;
  item: {
    clusterName: string;
    lowerLimit: number;
    upperLimit: number;
    districts: string[];
  };
}) {
  return await db.tunnelRange.create({
    data: {
      clusterName: item.clusterName.toLowerCase(),
      lowerLimit: `10.220.${item.lowerLimit}.0`,
      upperLimit: `10.220.${item.upperLimit}.254`,
      createdBy: {
        connect: {
          id: userId,
        },
      },
      District: {
        connect: item.districts.map((d) => ({ name: d.toLowerCase() })),
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
    lowerLimit: number;
    upperLimit: number;
    districts: string[];
  };
}) {
  return await db.lANRange.create({
    data: {
      clusterName: item.clusterName.toLowerCase(),
      lowerLimit: `10.${item.lowerLimit}.0.0`,
      upperLimit: `10.${item.upperLimit}.0.0`,
      createdBy: {
        connect: {
          id: userId,
        },
      },
      District: {
        connect: item.districts.map((d) => ({ name: d.toLowerCase() })),
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
      name: cName.toLowerCase(),
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
      name: district.toLowerCase(),
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
export async function seedTopAdmin() {
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

export async function seedBranch_LeasedBranchIps({
  userId,
  item,
  Tunnel_IP_DC_ER21,
}: {
  userId: number;
  item: {
    Branch_Name: string;
    LAN_Address: string;
    District_Name: string;
    WAN_Address: string;
  };
  Tunnel_IP_DC_ER21: string;
}) {
  try {
    const district = await db.district.findUnique({
      where: {
        name: item.District_Name.toLowerCase(),
      },
      select: {
        id: true,
        cluster: {
          select: {
            id: true,
            name: true,
          },
        },
        usableTunnelRange: {
          select: {
            id: true,
          },
        },
        usableLANRange: {
          select: {
            id: true,
          },
        },
      },
    });
    const result = await db.branch.create({
      data: {
        name: item.Branch_Name.toLowerCase(),
        remark: "this is initial seed data",
        wanAddress: item.WAN_Address ? item.WAN_Address.toLowerCase() : "",
        ipWithTunnel: {
          create: {
            isReserved: false,
            isTaken: true,
            authorizedBy: {
              connect: {
                id: userId,
              },
            },
            tunnelRange: {
              connect: {
                id: district?.usableTunnelRange?.id,
              },
            },
            lanRange: {
              connect: {
                id: district?.usableLANRange?.id,
              },
            },
            remark: "this is initial seed data",
            lanIpAddress: {
              connect: {
                ipAddress: item.LAN_Address,
              },
            },
            tunnelIpAddress: {
              connect: {
                TunnelIP_DC_ER21: Tunnel_IP_DC_ER21,
              },
            },
          },
        },
        createdBy: {
          connect: {
            id: userId,
          },
        },
        district: {
          connect: {
            name: item.District_Name.toLowerCase(),
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (result) {
      await db.allLANIps.update({
        where: {
          ipAddress: item.LAN_Address,
        },
        data: {
          isTaken: true,
        },
      });
      await db.allTunnelIps.update({
        where: {
          TunnelIP_DC_ER21: Tunnel_IP_DC_ER21,
        },
        data: {
          isTaken: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export function seedATM_LeasedATMIps({ userId }: { userId: number }) {
  atm_lanIntersection.map(async (atm) => {
    if (
      atm.District_Name.toLowerCase() == "head office" ||
      atm.District_Name.toLowerCase() == "shira"
    ) {
      return;
    } else if (atm.WAN_Address == null) {
      return;
    } else {
      return await db.aTM.create({
        data: {
          name: "atm.Branch_Name.toLowerCase()",
          remark: "this is initial seed data",
          wanAddress: "atm.WAN_Address.toLowerCase()",
          loopBackAddress: "",
          isOutlet: false,
          LeasedATMIps: {
            create: {
              // atm: {
              //   connect: {
              //     name: "",
              //   },
              // },
              remark: "this is initial seed data",
              authorizedBy: {
                connect: {
                  id: userId,
                },
              },
              lanIpAddress: {
                connect: {
                  ipAddress: "atm.LAN_Address",
                },
              },
              tunnelIpAddress: {
                connect: {
                  id: 1,
                },
              },
            },
          },

          // ipWithTunnel: {
          //   create: {
          //     isReserved: false,
          //     isTaken: true,
          //     authorizedBy: {
          //       connect: {
          //         id: userId,
          //       },
          //     },
          //     remark: "this is initial seed data",
          //     lanIpAddress: {
          //       connect: {
          //         ipAddress: atm.LAN_Address,
          //       },
          //     },
          // tunnelIpAddress: {
          //   connect: {
          //     id:1
          //   }
          // }
          //     // branch: {
          //     //   connect: {
          //     //     name: atm.Branch_Name.toLowerCase(),
          //     //   },
          //     // },
          //   },
          // },
          createdBy: {
            connect: {
              id: userId,
            },
          },
          district: {
            connect: {
              name: atm.District_Name.toLowerCase(),
            },
          },
        },
      });
    }
  });
}

async function seed() {
  // //step1: seed Cluster and district
  const admin = await seedTopAdmin();
  // //step2: seed Cluster and district
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
  // //step3: seed Tunnel range
  // tunnelRange.map(async (item) => {
  //   await seedTunnelRange({ userId: admin.id, item });
  // });
  // //step4: seed Tunnel range
  // lanRange.map(async (item) => {
  //   await seedLanRange({ userId: admin.id, item });
  // });
  // //step5: generateAndSeedLanIps
  // generateAndSeedLanIps();
  // //step6: generateAndSeedTunnelIps
  // generateAndSeedTunnelIps();
  // //step7: seed branch's and seed LeasedBranchIps
  // branch_lanIntersection.map(async (branch) => {
  //   if (
  //     branch.District_Name.toLowerCase() == "head office" ||
  //     branch.District_Name.toLowerCase() == "shira"
  //   ) {
  //     return;
  //   } else if (
  //     branch.LAN_Address == undefined ||
  //     branch.WAN_Address == undefined
  //   ) {
  //     return;
  //   } else {
  //     const tunnel_res = tunnelInfo.find((item) => {
  //       if (item.Branch_Name == null || item.Branch_Name == undefined) {
  //         return null;
  //       } else if (
  //         item.Branch_Name.toLowerCase() == branch.Branch_Name.toLowerCase()
  //       ) {
  //         return item;
  //       } else {
  //         return null;
  //       }
  //     });
  //     if (tunnel_res?.Tunnel_IP_DC_ER21 == undefined) {
  //       return;
  //     } else {
  //       return await seedBranch_LeasedBranchIps({
  //         item: branch,
  //         Tunnel_IP_DC_ER21: tunnel_res.Tunnel_IP_DC_ER21,
  //         userId: admin.id,
  //       });
  //     }
  //   }
  // });
  // //step8: seed LeasedATMIps
  seedATM_LeasedATMIps({ userId: admin.id });
}

void seed();
