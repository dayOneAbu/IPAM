import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const atmRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const atm = await ctx.db.aTM.findMany({
      select: {
        id: true,
        name: true,
        district: {
          select: {
            name: true,
          },
        },
        wanAddress: true,
        isOutlet: true,
        loopBackAddress: true,
        ipWithTunnel: {
          select: {
            lanIpAddress: {
              select: {
                ipAddress: true,
              },
            },
            tunnelIpAddress: {
              select: {
                TunnelIP_DR_ER12: true,
                TunnelIP_DC_ER21: true,
                TunnelIP_DR_ER11: true,
                TunnelIP_DC_ER22: true,
              },
            },
          },
        },
        createdBy: {
          select: {
            email: true,
          },
        },
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (!atm) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No atm information is inserted Yet!",
      });
    }
    return atm;
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const atm = await ctx.db.aTM.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          district: {
            select: {
              name: true,
              id: true,
            },
          },
          remark: true,
          ipWithTunnel: {
            select: {
              id: true,
              lanIpAddress: {
                select: {
                  id: true,
                  ipAddress: true,
                },
              },
              tunnelIpAddress: {
                select: {
                  id: true,
                  TunnelIP_DC_ER21: true,
                  TunnelIP_DC_ER22: true,
                  TunnelIP_DR_ER11: true,
                  TunnelIP_DR_ER12: true,
                },
              },
            },
          },
          wanAddress: true,
          createdBy: {
            select: {
              email: true,
            },
          },
          updatedAt: true,
        },
      });
      if (!atm) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "atm information is not inserted Yet!",
        });
      }
      return atm;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const atm = await ctx.db.aTM.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          createdBy: {
            select: {
              email: true,
            },
          },
        },
      });
      const admin = await ctx.db.user.findUnique({
        where: {
          email: ctx.session.user.email ? ctx.session.user.email : undefined,
        },
        select: {
          email: true,
          id: true,
        },
      });

      if (!atm || !admin) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "couldn't find what you are looking for!",
        });
      } else if (admin.email == ctx.session.user.email) {
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "you can't delete atm which you haven't created!",
        });
      } else {
        return await ctx.db.aTM.delete({
          where: {
            id: atm.id,
          },
        });
      }
    }),
  leasedAtmIps: protectedProcedure.query(async ({ ctx }) => {
    const leasedAtmIps = await ctx.db.leasedATMIps.findMany({
      select: {
        id: true,
        authorizedBy: {
          select: {
            email: true,
          },
        },
        remark: true,
        lanIpAddress: {
          select: {
            ipAddress: true,
          },
        },
        tunnelIpAddress: {
          select: {
            TunnelIP_DC_ER21: true,
            TunnelIP_DC_ER22: true,
            TunnelIP_DR_ER11: true,
            TunnelIP_DR_ER12: true,
          },
        },
        updatedAt: true,
      },
    });
    if (!leasedAtmIps) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "couldn't find what you are looking for!",
      });
    }
    return leasedAtmIps;
  }),
});
