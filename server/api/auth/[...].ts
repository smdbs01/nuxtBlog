import { NuxtAuthHandler } from "#auth";
import type { AuthConfig } from "@auth/core/types";
import CredentialsProvider from "@auth/core/providers/credentials";

import { verify } from "~/server/utils/loginUtil";
const runtimeConfig = useRuntimeConfig();

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // @ts-expect-error Custom return type
      async authorize(credentials) {
        try {
          const user = await verify(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      // @ts-expect-error No role property
      session.role = token.role;
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        // @ts-expect-error No role property
        token.role = user.role;
      }
      return token;
    },
  },
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
