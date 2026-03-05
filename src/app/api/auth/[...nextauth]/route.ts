import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db-adapter";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

// 带重试的用户查找：后端冷启动时第一次请求可能超时，重试一次避免误报"密码错误"
async function findUserWithRetry(username: string, retries = 2): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const user = await db.user.findUnique({ username });
      return user;
    } catch (error) {
      if (i < retries - 1) {
        // 等待 1.5 秒后重试（给后端冷启动一点时间）
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        // 所有重试均失败，抛出明确错误
        throw new Error('SERVICE_UNAVAILABLE');
      }
    }
  }
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

        let user;
        try {
          user = await findUserWithRetry(credentials.username);
        } catch (error: any) {
          // 服务不可用时抛出明确错误，让前端显示正确提示
          throw new Error('服务暂时不可用，请稍后重试');
        }

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
          role: user.role,
          isActive: user.isActive || true,
          avatar: user.avatar,
        };
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
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.isActive = token.isActive;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
