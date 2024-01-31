import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || "Enter your secret here",
  pages: {
    signIn: "/login",
  },
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      authorize: async function (credentials: {
        username: string;
        password: string;
      }) {
        const userAny = await db
          .select()
          .from(users)
          .where(eq(users.name, credentials?.username || ""));
        if (!userAny.length) {
          return null;
        }
        const match = await comparePasswords(
          credentials?.password || "",
          userAny[0].password
        );
        if (match) {
          return userAny[0];
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        return session;
      }
      // @ts-ignore
      session.role = token.role;
      return session;
    },
  },
});
