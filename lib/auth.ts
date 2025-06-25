import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import { prisma } from "./prisma";

export const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
            password: credentials?.password
          }
        });
        if (!user) throw new Error("No user found");
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { id: user.id };
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user = { id: token.id };
      return session;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/signin" }
};

export default NextAuth(authOption);
