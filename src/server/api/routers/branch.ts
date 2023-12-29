import { z } from "zod";
import { TRPCError, type inferAsyncReturnType } from "@trpc/server";
import {
  type createTRPCContext,
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const infiniteIpsSchema = z.object({
  limit: z.number().default(50).optional(),
  cursor: z
    .object({
      id: z.number(),
    })
    .optional(),
});
export const branchRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const branch = await ctx.db.branch.findMany({
      select: {
        id: true,
        name: true,
        district: {
          select: {
            name: true,
          },
        },
        wanAddress: true,
        remark: true,
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
    });
    if (!branch) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Branch information is inserted Yet!",
      });
    }
    return branch;
  }),
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
