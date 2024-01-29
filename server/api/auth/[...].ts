import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || "Enter your secret here",
  providers: [
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          console.log(credentials);
          const user = await db
            .select()
            .from(users)
            .where(eq(users.name, credentials?.username));
          const match = await comparePasswords(
            credentials?.password,
            user[0].password
          );
          if (match) {
            return user[0];
          }
          return null;
        } catch (error) {
          throw createError({
            statusCode: 401,
            message: "Invalid credentials: No user found",
          });
        }
      },
    }),
  ],
});
