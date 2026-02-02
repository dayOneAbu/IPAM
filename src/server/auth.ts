import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isAdmin: boolean;
      // id: string | undefined | null;
      // // ...other properties
      // email: string | undefined | null;
      // isAdmin: boolean | undefined | null;
    };
  }
  interface User {
    id: string;
    email: string;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    idToken?: string;
    id: string;
    //other properties
    isAdmin: boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const newToken = {
          ...token,
          id: user.id.toString(),
          email: user.email,
          isAdmin: user.isAdmin,
        };
        return newToken;
      }
      return token;
    },
    session({ session, token }) {
      if (token?.id && token?.email) {
        session.user = {
          id: token.id,
          isAdmin: token.isAdmin,
          email: token.email,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1,
  },

  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/sign-in",
  },
  theme: {
    colorScheme: "auto",
    brandColor: "#95288E",
  },
  providers: [
    CredentialsProvider({
      name: "your Credential",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials === undefined) {
          return null;
        }
        const user = await api.auth.signIn.query({
          email: credentials.email,
          password: credentials.password,
        });
        // If no error and we have user data, return it
        if (user) {
          return {
            ...user,
            id: String(user.id), // Convert id to string for NextAuth
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
