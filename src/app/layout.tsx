import "../styles/globals.css";
import AuthProvider from "./providers";

export const metadata = {
  title: "心晴驿站 - 青少年心理健康AI陪伴平台",
  description: "让每一个年轻的心灵都能找到属于自己的晴朗天空。专为青少年打造的心理健康AI陪伴平台，提供专业、温暖、安全的心理支持服务。",
  keywords: "青少年心理健康,AI陪伴,心理咨询,情感支持,心理测评",
  authors: [{ name: "心晴驿站团队" }],
  metadataBase: new URL('https://xinli.vercel.app'),
  openGraph: {
    title: "心晴驿站 - 青少年心理健康AI陪伴平台",
    description: "让每一个年轻的心灵都能找到属于自己的晴朗天空",
    type: "website",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#6FBFF2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <div className="min-h-screen bg-background relative overflow-x-hidden">
            {/* 天空渐变背景 */}
            <div className="fixed inset-0 sky-gradient-dynamic -z-10" />
            
            {/* 主要内容区域 */}
            <main className="relative z-10">
              {children}
            </main>

            {/* 全局装饰元素 */}
            <div className="fixed top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float -z-5" />
            <div className="fixed bottom-20 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float -z-5" style={{ animationDelay: '3s' }} />
            <div className="fixed top-1/2 left-1/4 w-24 h-24 bg-success/5 rounded-full blur-2xl animate-breathe -z-5" />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
