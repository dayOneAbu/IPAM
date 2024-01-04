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
    const lanIps = await ctx.db.allLANIps.findMany({
      select: {
        id: true,
        isTaken: true,
        isReserved: true,
        isFlagged: true,
        ipAddress: true,
        updatedAt: true,
        cluster: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        cluster: {
          name: "asc",
        },
      },
    });
    if (!lanIps) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No LAN-IPs Range Generated Yet!",
      });
    }
    return lanIps;
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
      const tunnelIps = await ctx.db.allLANIps.findMany({
        where: {
          cluster: {
            id: districtId.id,
          },
        },
        select: {
          id: true,
          ipAddress: true,
          isTaken: true,
          isReserved: true,
          isFlagged: true,
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
      const LAN = await ctx.db.allLANIps.findUnique({
        where: {
          ipAddress,
        },
        select: {
          id: true,
          isFlagged: true,
          isTaken: true,
          isReserved: true,
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
