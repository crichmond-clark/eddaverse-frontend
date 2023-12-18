import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { env } from "@/app/env";
import { db } from "@/app/schema";

const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token) {
          session.user.id = token.id as string;
        }
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
