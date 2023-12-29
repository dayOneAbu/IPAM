import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const TunnelRangeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const tunnelRanges = await ctx.db.tunnelRange.findMany({
      orderBy: {
        clusterName: "asc",
      },
      select: {
        id: true,
        clusterName: true,
        lowerLimit: true,
        upperLimit: true,
        createdBy: {
          select: {
            email: true,
          },
        },
        updatedAt: true,
        District: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!tunnelRanges) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Tunnel Range Generated Yet!",
      });
    }
    return tunnelRanges;
  }),
});
