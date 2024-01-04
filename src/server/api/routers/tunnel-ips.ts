import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
  getByCluster: protectedProcedure
    .input(
      z.object({
        district: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const districtId = await ctx.db.district.findUnique({
        where: {
          name: input.district,
        },
        select: {
          id: true,
        },
      });
      if (!districtId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "the district you picked is not in the DB !",
        });
      }
      const tunnelIps = await ctx.db.allTunnelIps.findMany({
        where: {
          cluster: {
            id: districtId.id,
          },
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
});
