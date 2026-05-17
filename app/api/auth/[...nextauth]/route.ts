import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;

        if (!adminUser || !adminPass) {
          console.error('[NextAuth] ADMIN_USERNAME or ADMIN_PASSWORD env var is not set!');
          return null;
        }

        if (
          credentials?.username === adminUser &&
          credentials?.password === adminPass
        ) {
          return { id: '1', name: 'Admin', email: 'admin@fallonava.com' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login', // We will create a custom login page with Apple 2026 style
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
