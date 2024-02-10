import { NuxtAuthHandler } from "#auth";
import type { AuthConfig, User } from "@auth/core/types";
import CredentialsProvider from "@auth/core/providers/credentials";

import { verify } from "~/server/utils/loginUtil";
import { error } from "~/utils/logger";
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
      name: "Credentials",
      async authorize(credentials) {
        try {
          const user = await verify(credentials);
          if (user) {
            return {
              name: user.name,
              role: user.role,
            } as User;
          } else {
            return null;
          }
        } catch (err) {
          error("Error authenticating");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        // @ts-expect-error
        session.user.role = token.role || "user";
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
