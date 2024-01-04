import { z } from "zod";
import { TRPCError, type inferAsyncReturnType } from "@trpc/server";
import {
  type createTRPCContext,
  createTRPCRouter,
  publicProcedure,
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
      orderBy: {
        updatedAt: "desc",
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
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const branch = await ctx.db.branch.findUnique({
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
          // branch: {
          // select: {
          //   name: true,
          //   id: true,
          // },
          // },
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
      if (!branch) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Branch information is not inserted Yet!",
        });
      }
      return branch;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const branch = await ctx.db.branch.findUnique({
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

      if (!branch || !admin) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "couldn't find what you are looking for!",
        });
      } else if (admin.email == ctx.session.user.email) {
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "you can't delete branch which you haven't created!",
        });
      } else {
        return await ctx.db.branch.delete({
          where: {
            id: branch.id,
          },
        });
      }
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
