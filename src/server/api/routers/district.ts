import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { NewDistrictSchema } from "~/data/schema";

export const districtRouter = createTRPCRouter({
  preloadData: protectedProcedure.query(async ({ ctx }) => {
    const lanRange = await ctx.db.lANRange.findMany({
      select: {
        id: true,
        clusterName: true,
        lowerLimit: true,
        upperLimit: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    const tunnelRange = await ctx.db.tunnelRange.findMany({
      select: {
        clusterName: true,
        id: true,
        lowerLimit: true,
        upperLimit: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return {
      lanRange,
      tunnelRange,
    };
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const district = await ctx.db.district.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            branches: true,
            ATM: true,
          },
        },
        usableTunnelRange: {
          select: {
            upperLimit: true,
            lowerLimit: true,
          },
        },
        usableLANRange: {
          select: {
            upperLimit: true,
            lowerLimit: true,
          },
        },
        createdBy: {
          select: {
            email: true,
          },
        },
        updatedAt: true,
      },
    });
    if (!district) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "District information is not inserted Yet!",
      });
    }
    return district;
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        name: z.string().email(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { name } = input;
      const district = await ctx.db.district.findUnique({
        where: {
          name,
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              branches: true,
              ATM: true,
            },
          },
          usableTunnelRange: {
            select: {
              upperLimit: true,
              lowerLimit: true,
            },
          },
          usableLANRange: {
            select: {
              upperLimit: true,
              lowerLimit: true,
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
          name: "asc",
        },
      });
      if (!district) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "District information is not inserted Yet!",
        });
      }
      return district;
    }),
  create: protectedProcedure
    .input(NewDistrictSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, clusterName, usableLANRange, usableTunnelRange } = input;
      if (ctx.session.user.id == null || ctx.session.user.id == undefined) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you are an authorized!",
        });
      }
      if (clusterName == undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cluster Name is required!",
        });
      }
      const cluster = await ctx.db.cluster.findFirst({
        where: {
          name: clusterName,
        },
      });
      const district = await ctx.db.district.create({
        data: {
          name,
          createdBy: {
            connect: {
              id: parseInt(ctx.session.user.id),
            },
          },
          cluster: {
            connect: {
              id: cluster?.id,
            },
          },
          usableLANRange: {
            connect: {
              id: parseInt(usableLANRange),
            },
          },
          usableTunnelRange: {
            connect: {
              id: parseInt(usableTunnelRange),
            },
          },
        },
      });
      if (!district) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "District information is not inserted Yet!",
        });
      }
      return district;
    }),
});
