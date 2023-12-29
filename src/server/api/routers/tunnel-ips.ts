import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tunnelIpsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const tunnelIps = await ctx.db.allTunnelIps.findMany();
    if (!tunnelIps) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Tunnel Range Generated Yet!",
      });
    }
    return tunnelIps;
  }),
});
