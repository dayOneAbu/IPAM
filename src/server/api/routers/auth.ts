import { z } from "zod";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
        return null;
      }
      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        isAdmin: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, isAdmin } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
      return ctx.db.user.create({
        data: {
          email,
          password: hashedPassword,
          isAdmin,
        },
      });
    }),
});
