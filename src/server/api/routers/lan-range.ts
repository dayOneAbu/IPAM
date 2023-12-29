import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const lanRangeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const lanRange = await ctx.db.lANRange.findMany({
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
            // _count: {
            //   select: {
            //     branches: true,
            //     ATM: true,
            //   },
            // },
          },
        },
      },
    });
    if (!lanRange) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Necessary data is not inserted Yet!",
      });
    }
    return lanRange;
  }),
});
