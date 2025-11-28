import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db, isApiMode } from "@/lib/db-adapter";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { getNextAuthUrl, logAuthConfig } from "@/lib/auth-config";

// 在开发环境中记录配置
logAuthConfig();

// 设置运行时的NEXTAUTH_URL
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = getNextAuthUrl();
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const user = await db.user.findUnique({
            username: credentials.username
          });

          if (!user || !user.password) {
            return null;
          }

          // 检查用户是否被禁用
          // if (!user.isActive) {
          //   throw new Error('您的账户已被禁用，请联系管理员');
          // }

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (isValid) {
            // Return user data including role
            return { 
              id: user.id, 
              username: user.username,
              role: user.role,
              isActive: true, // 暂时默认为true
              avatar: user.avatar,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.isActive = user.isActive;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        // 从数据库获取最新的用户信息
        try {
          const user = await db.user.findUnique({
            id: token.id as string
          });
          
          if (user) {
            session.user.id = user.id;
            session.user.username = user.username;
            session.user.role = user.role;
            session.user.isActive = user.isActive;
            session.user.avatar = user.avatar;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // 如果数据库查询失败，使用token中的数据
          session.user.id = token.id;
          session.user.username = token.username;
          session.user.role = token.role;
          session.user.isActive = token.isActive;
          session.user.avatar = token.avatar;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
