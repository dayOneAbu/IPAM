import ip from "ip";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getLastIp } from "~/lib/utils";

export const tunnelIpsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const tunnelIps = await ctx.db.allTunnelIps.findMany({
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
        TunnelIP_DC_ER21: true,
        TunnelIP_DC_ER22: true,
        TunnelIP_DR_ER11: true,
        TunnelIP_DR_ER12: true,
        updatedAt: true,
      },
      orderBy: {
        cluster: {
          name: "asc",
        },
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
  getNextTenByRange: protectedProcedure
    .input(
      z.object({
        district: z.string(),
        intent: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const district = await ctx.db.district.findUnique({
        where: {
          name: input.district,
        },
        select: {
          id: true,
          usableTunnelRange: {
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

      if (district?.usableTunnelRange?.upperLimit == undefined) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "we couldn't get the most last ip in this range!",
        });
      }
      let leased;
      if (input.intent == "branch") {
        leased = await ctx.db.leasedBranchIps.findMany({
          where: {
            tunnelRange: {
              id: district.usableTunnelRange?.id,
            },
          },
          select: {
            tunnelIpAddress: {
              select: {
                id: true,
                TunnelIP_DR_ER11: true,
                isReserved: true,
                isFlagged: true,
                isTaken: true,
              },
            },
          },
        });
      } else {
        leased = await ctx.db.leasedATMIps.findMany({
          where: {
            tunnelRange: {
              id: district.usableTunnelRange?.id,
            },
          },
          select: {
            tunnelIpAddress: {
              select: {
                id: true,
                TunnelIP_DR_ER11: true,
                isReserved: true,
                isFlagged: true,
                isTaken: true,
              },
            },
          },
        });
      }

      const sorted = leased
        .map(({ tunnelIpAddress }) =>
          ip.toLong(tunnelIpAddress.TunnelIP_DR_ER11),
        )
        .sort();

      const lastIp = getLastIp({
        arr: sorted,
        upperRange: ip.toLong(district.usableTunnelRange?.upperLimit),
      });
      if (!lastIp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `the district you picked has no ${input.intent}; please insert one manually!`,
        });
      }
      const LastTunnelIp = ip.fromLong(lastIp);
      const cursor = leased.find(
        (item) => item.tunnelIpAddress.TunnelIP_DR_ER11 == LastTunnelIp,
      );
      const tunnelIps = await ctx.db.allTunnelIps.findMany({
        where: {
          tunnelRange: {
            upperLimit: district.usableTunnelRange.upperLimit,
          },
          isFlagged: false,
          isReserved: false,
          isTaken: false,
        },
        cursor: {
          id: cursor?.tunnelIpAddress.id,
        },
        take: 10,
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
          TunnelIP_DC_ER21: true,
          TunnelIP_DC_ER22: true,
          TunnelIP_DR_ER11: true,
          TunnelIP_DR_ER12: true,
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
  getNextByRange: protectedProcedure
    .input(
      z.object({
        district: z.string(),
        intent: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const district = await ctx.db.district.findUnique({
        where: {
          name: input.district,
        },
        select: {
          id: true,
          usableTunnelRange: {
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
      if (district?.usableTunnelRange?.upperLimit == undefined) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "we couldn't get the most last ip in this range!",
        });
      }
      let leased;
      if (input.intent == "branch") {
        leased = await ctx.db.leasedBranchIps.findMany({
          where: {
            tunnelRange: {
              id: district.usableTunnelRange?.id,
            },
          },
          select: {
            tunnelIpAddress: {
              select: {
                id: true,
                TunnelIP_DR_ER11: true,
                isReserved: true,
                isFlagged: true,
                isTaken: true,
              },
            },
          },
        });
      } else {
        leased = await ctx.db.leasedBranchIps.findMany({
          where: {
            tunnelRange: {
              id: district.usableTunnelRange?.id,
            },
          },
          select: {
            tunnelIpAddress: {
              select: {
                id: true,
                TunnelIP_DR_ER11: true,
                isReserved: true,
                isFlagged: true,
                isTaken: true,
              },
            },
          },
        });
      }
      const sorted = leased
        .map(({ tunnelIpAddress }) =>
          ip.toLong(tunnelIpAddress.TunnelIP_DR_ER11),
        )
        .sort();

      const lastIp = getLastIp({
        arr: sorted,
        upperRange: ip.toLong(district.usableTunnelRange?.upperLimit),
      });
      if (!lastIp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `the district you picked has no ${input.intent}; please insert one manually!`,
        });
      }
      const LastTunnelIp = ip.fromLong(lastIp);
      const cursor = leased.find(
        (item) => item.tunnelIpAddress.TunnelIP_DR_ER11 == LastTunnelIp,
      );
      const tunnelIps = await ctx.db.allTunnelIps.findMany({
        where: {
          tunnelRange: {
            upperLimit: district.usableTunnelRange.upperLimit,
          },
          isFlagged: false,
          isReserved: false,
          isTaken: false,
        },
        cursor: {
          id: cursor?.tunnelIpAddress.id,
        },
        take: 1,
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
          TunnelIP_DC_ER21: true,
          TunnelIP_DC_ER22: true,
          TunnelIP_DR_ER11: true,
          TunnelIP_DR_ER12: true,
        },
      });
      if (!tunnelIps) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No Tunnel Range Generated Yet!",
        });
      }
      return tunnelIps[0];
    }),
  getOne: protectedProcedure
    .input(z.object({ ipAddress: z.string() }))
    .query(async ({ ctx, input }) => {
      const { ipAddress } = input;
      const LAN = await ctx.db.allTunnelIps.findUnique({
        where: {
          TunnelIP_DC_ER21: ipAddress,
        },
        select: {
          id: true,
          isFlagged: true,
          isTaken: true,
          isReserved: true,
          TunnelIP_DC_ER21: true,
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
          usableTunnelRange: {
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
      if (district?.usableTunnelRange?.upperLimit == undefined) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "we couldn't get the most last ip in this range!",
        });
      }
      const tunnelIps = await ctx.db.allTunnelIps.findMany({
        where: {
          tunnelRange: {
            upperLimit: district.usableTunnelRange.upperLimit,
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
          TunnelIP_DC_ER21: true,
        },
      });

      if (!tunnelIps) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No Tunnel Range Generated Yet!",
        });
      }
      const sorted = tunnelIps
        .map(({ TunnelIP_DC_ER21 }) => ip.toLong(TunnelIP_DC_ER21))
        .sort()
        .map((item) => ip.fromLong(item));
      return sorted;
    }),
});
