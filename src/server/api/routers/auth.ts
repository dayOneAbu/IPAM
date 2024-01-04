import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User information is not inserted Yet!",
        });
      }
      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "wrong Email or Password!",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    }),
  createUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        isAdmin: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, isAdmin } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await ctx.db.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          isAdmin: isAdmin == "admin" ? true : false,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User information is not inserted Yet!",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        isAdmin: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, isAdmin } = input;

      const user = await ctx.db.user.update({
        where: {
          email: email,
        },
        data: {
          email,
          isAdmin: isAdmin == "admin" ? true : false,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User information is not inserted Yet!",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }),
  getAllUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findMany({
      select: {
        id: true,
        email: true,
        isAdmin: true,
        updatedAt: true,
        _count: {
          select: {
            branchCreated: true,
            atmCreated: true,
            districtCreated: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User information is not inserted Yet!",
      });
    }
    return user;
  }),
  getUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          email: true,
          isAdmin: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User information is not Found!",
        });
      }
      return user;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          email: true,
          id: true,
          _count: {
            select: {
              branchCreated: true,
              atmCreated: true,
              clusterCreated: true,
              districtCreated: true,
              LANRange: true,
              LeasedATMIps: true,
              tunnelRange: true,
              LeasedBranchIps: true,
            },
          },
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "couldn't find what you are looking for!",
        });
      } else if (
        user?._count.branchCreated > 0 ||
        user?._count.atmCreated > 0 ||
        user?._count.districtCreated > 0 ||
        user?._count.LeasedATMIps > 0 ||
        user?._count.LeasedBranchIps > 0
      ) {
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "you can't delete user which have performed some operation!",
        });
      } else {
        return await ctx.db.user.delete({
          where: {
            id: user.id,
          },
          select: {
            email: true,
            id: true,
          },
        });
      }
    }),
});
