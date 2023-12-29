import { z } from "zod";
import { TRPCError, type inferAsyncReturnType } from "@trpc/server";
import {
  type createTRPCContext,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

const infiniteIpsSchema = z.object({
  limit: z.number().default(50).optional(),
  cursor: z
    .object({
      id: z.number(),
    })
    .optional(),
});
export const lanIpsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const lanIps = await ctx.db.allLANIps.findMany();
    if (!lanIps) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No LAN-IPs Range Generated Yet!",
      });
    }
    return lanIps;
  }),
  // getInfiniteIps: protectedProcedure
  //   .input(infiniteIpsSchema)
  //   .query(async ({ input: { limit = 50, cursor, }, ctx }) => {
  //     const lanIps = await getInfiniteTunnelIps({
  //       limit,
  //       cursor,
  //       ctx,
  //     });
  //     if (!lanIps || lanIps == undefined) {
  //       throw new TRPCError({ code: "NOT_FOUND", message: "No Tunnel Range Generated Yet!" });
  //     }
  //     return lanIps;
  //   }),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getInfiniteTunnelIps({
  ctx,
  limit = 50,
  cursor,
}: z.infer<typeof infiniteIpsSchema> & {
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
}) {
  const data = await ctx.db.allTunnelIps.findMany({
    take: limit + 1,
    cursor: cursor ? cursor : undefined,
  });

  let nextCursor: typeof cursor | undefined;
  if (data.length > limit) {
    const nextItem = data.pop();
    if (nextItem != null) {
      nextCursor = { id: nextItem?.id };
    }
  }
  return {
    tunnelIps: data,
    nextCursor,
  };
}
