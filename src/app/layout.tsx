import "../styles/globals.css";
import AuthProvider from "./providers";

export const metadata = {
  title: "心晴驿站",
  description: "青少年心理健康 AI 陪伴平台 - Demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
