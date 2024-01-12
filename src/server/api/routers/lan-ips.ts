import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import ip from "ip";
import { getLastIp } from "~/lib/utils";

export const lanIpsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const lanIps = await ctx.db.allLANIps.findMany({
      select: {
        id: true,
        isTaken: true,
        isReserved: true,
        isFlagged: true,
        ipAddress: true,
        updatedAt: true,
        cluster: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        cluster: {
          name: "asc",
        },
      },
    });
    if (!lanIps) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No LAN-IPs Range Generated Yet!",
      });
    }
    return lanIps;
  }),
  getNextTenByRange: protectedProcedure
    .input(
      z.object({
        district: z.string(),
        intent: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let leasedIp;
      const district = await ctx.db.district.findUnique({
        where: {
          name: input.district,
        },
        select: {
          id: true,
          usableLANRange: {
            select: {
              id: true,
              upperLimit: true,
              lowerLimit: true,
            },
          },
          cluster: {
            select: {
              id: true,
            },
          },
        },
      });
      if (district?.usableLANRange?.upperLimit == undefined) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "we couldn't get the most last ip in this range!",
        });
      }

      if (input.intent == "branch") {
        leasedIp = await ctx.db.leasedBranchIps.findMany({
          where: {
            lanRange: {
              id: district.usableLANRange?.id,
            },
          },
          select: {
            lanIpAddress: {
              select: {
                id: true,
                ipAddress: true,
                isReserved: true,
                isFlagged: true,
                isTaken: true,
              },
            },
          },
        });
      } else {
        leasedIp = await ctx.db.leasedATMIps.findMany({
          where: {
            lanRange: {
              id: district.usableLANRange?.id,
            },
          },
          select: {
            lanIpAddress: {
              select: {
                id: true,
                ipAddress: true,
                isReserved: true,
                isFlagged: true,
                isTaken: true,
              },
            },
          },
        });
      }
      const sorted = leasedIp
        .map(({ lanIpAddress }) => ip.toLong(lanIpAddress.ipAddress))
        .sort();

      const lastIp = getLastIp({
        arr: sorted,
        upperRange: ip.toLong(district.usableLANRange?.upperLimit),
      });
      if (!lastIp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `the district you picked has no ${input.intent}; please insert one manually by the administrator!`,
        });
      }
      const LastLanIp = ip.fromLong(lastIp);
      const cursor = leasedIp?.find(
        (item) => item.lanIpAddress.ipAddress == LastLanIp,
      );
      const lanIps = await ctx.db.allLANIps.findMany({
        where: {
          cluster: {
            id: district.cluster?.id,
          },
          isFlagged: false,
          isReserved: false,
          isTaken: false,
        },
        cursor: {
          id: cursor?.lanIpAddress.id,
        },
        take: 10,
        select: {
          id: true,
          ipAddress: true,
          isTaken: true,
          isReserved: true,
          isFlagged: true,
          cluster: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!lanIps) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No Tunnel Range Generated Yet!",
        });
      }
      return lanIps;
    }),
  getNextByRange: protectedProcedure
    .input(
      z.object({
        district: z.string(),
        intent: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let leasedIp;
      const district = await ctx.db.district.findUnique({
        where: {
          name: input.district,
        },
        select: {
          id: true,
          usableLANRange: {
            select: {
              id: true,
              upperLimit: true,
              lowerLimit: true,
            },
          },
          cluster: {
            select: {
              id: true,
            },
          },
        },
      });
      if (district?.usableLANRange?.upperLimit == undefined) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "we couldn't get the most last ip in this range!",
        });
      }
      if (input.intent == "branch") {
        leasedIp = await ctx.db.leasedBranchIps.findMany({
          where: {
            lanRange: {
              id: district.usableLANRange?.id,
            },
          },
          select: {
            lanIpAddress: {
              select: {
                id: true,
                ipAddress: true,
                isReserved: true,
                isFlagged: true,
                isTaken: true,
              },
            },
          },
        });
      } else {
        leasedIp = await ctx.db.leasedATMIps.findMany({
          where: {
            lanRange: {
              id: district.usableLANRange?.id,
            },
          },
          select: {
            lanIpAddress: {
              select: {
                id: true,
                ipAddress: true,
                isReserved: true,
                isFlagged: true,
                isTaken: true,
              },
            },
          },
        });
      }

      const sorted = leasedIp
        .map(({ lanIpAddress }) => ip.toLong(lanIpAddress.ipAddress))
        .sort();

      const lastIp = getLastIp({
        arr: sorted,
        upperRange: ip.toLong(district.usableLANRange?.upperLimit),
      });
      if (!lastIp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `the district you picked has no ${input.intent}; please insert one manually by the administrator!`,
        });
      }
      const LastLanIp = ip.fromLong(lastIp);
      const cursor = leasedIp.find(
        (item) => item.lanIpAddress.ipAddress == LastLanIp,
      );
      const lanIps = await ctx.db.allLANIps.findMany({
        where: {
          cluster: {
            id: district.cluster?.id,
          },
          isFlagged: false,
          isReserved: false,
          isTaken: false,
        },
        cursor: {
          id: cursor?.lanIpAddress.id,
        },
        take: 1,
        select: {
          id: true,
          ipAddress: true,
          isTaken: true,
          isReserved: true,
          isFlagged: true,
          cluster: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!lanIps) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No Tunnel Range Generated Yet!",
        });
      }
      return lanIps[0];
    }),
  getOne: protectedProcedure
    .input(z.object({ ipAddress: z.string() }))
    .query(async ({ ctx, input }) => {
      const { ipAddress } = input;
      const LAN = await ctx.db.allLANIps.findUnique({
        where: {
          ipAddress,
        },
        select: {
          id: true,
          isFlagged: true,
          isTaken: true,
          isReserved: true,
        },
      });
      if (!LAN) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "LAN information is not inserted Yet!",
        });
      }
      return LAN;
    }),
  getByDistrict: protectedProcedure
    .input(
      z.object({
        district: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const district = await ctx.db.district.findUnique({
        where: {
          name: input.district,
        },
        select: {
          id: true,
          usableLANRange: {
            select: {
              id: true,
              upperLimit: true,
              lowerLimit: true,
            },
          },
          cluster: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (district?.usableLANRange?.upperLimit == undefined) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "we couldn't get the most last ip in this range!",
        });
      }
      const tunnelIps = await ctx.db.allLANIps.findMany({
        where: {
          lanRange: {
            upperLimit: district.usableLANRange.upperLimit,
          },
          isFlagged: false,
          isReserved: false,
          isTaken: false,
        },
        select: {
          id: true,
          isFlagged: true,
          cluster: {
            select: {
              name: true,
            },
          },
          isReserved: true,
          isTaken: true,
          ipAddress: true,
        },
        orderBy: {
          ipAddress: "asc",
        },
      });
      if (!tunnelIps) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No Tunnel Range Generated Yet!",
        });
      }
      return tunnelIps;
    }),
});
