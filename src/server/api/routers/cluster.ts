import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const clusterRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const cluster = await ctx.db.cluster.findMany({
      select: {
        id: true,
        name: true,
        districts: {
          select: {
            name: true,
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
    if (!cluster) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Cluster information is not inserted Yet!",
      });
    }
    return cluster;
  }),
});
