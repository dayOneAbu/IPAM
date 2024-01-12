import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { NewDistrictSchema, updateDistrictSchema } from "~/data/schema";

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
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const district = await ctx.db.district.findUnique({
        where: {
          id,
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
              clusterName: true,
              id: true,
              upperLimit: true,
              lowerLimit: true,
            },
          },
          usableLANRange: {
            select: {
              clusterName: true,
              id: true,
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
          name: clusterName.trim().toLowerCase(),
        },
      });
      const district = await ctx.db.district.create({
        data: {
          name: name.trim().toLowerCase(),
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
          code: "UNPROCESSABLE_CONTENT",
          message: "there was a problem while creating District information!",
        });
      }
      return district;
    }),
  update: protectedProcedure
    .input(updateDistrictSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        clusterName,
        currentName,
        usableLANRange,
        usableTunnelRange,
      } = input;
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
          name: clusterName.trim().toLowerCase(),
        },
      });
      const district = await ctx.db.district.findUnique({
        where: {
          name: currentName.trim().toLowerCase(),
        },
        select: {
          name: true,
          id: true,
          _count: {
            select: {
              branches: true,
              ATM: true,
            },
          },
        },
      });
      if (!district) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "District NotFound!",
        });
      }
      if (district?._count.ATM > 0 || district?._count.branches > 0) {
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "you can't update district which have ATM and Branch!",
        });
      } else {
        const dis = await ctx.db.district.update({
          where: {
            name: currentName.trim().toLowerCase(),
          },
          data: {
            name: name.trim().toLowerCase(),
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
        if (!dis) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "oops! something goes wrong while inserting District!",
          });
        }
        return dis;
      }
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const district = await ctx.db.district.findUnique({
        where: {
          id: input.id,
        },
        select: {
          name: true,
          id: true,
          _count: {
            select: {
              branches: true,
              ATM: true,
            },
          },
        },
      });
      if (!district) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "couldn't find what you are looking for!",
        });
      } else if (district?._count.ATM > 0 || district?._count.branches > 0) {
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "you can't delete district which have ATM and Branch!",
        });
      } else {
        return await ctx.db.district.delete({
          where: {
            id: district.id,
          },
        });
      }
    }),
});
