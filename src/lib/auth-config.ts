/**
 * NextAuth配置增强
 * 处理动态URL和环境变量
 */

export function getNextAuthUrl() {
  // 在服务端环境中
  if (typeof window === 'undefined') {
    // 生产环境
    if (process.env.NODE_ENV === 'production') {
      // 优先级：环境变量NEXTAUTH_URL > NEXTAUTH_URL_PROD > Vercel自动 > 默认值
      return process.env.NEXTAUTH_URL ||
             process.env.NEXTAUTH_URL_PROD || 
             (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
             'https://xinli-two.vercel.app';
    }
    // 开发环境
    return process.env.NEXTAUTH_URL || 'http://localhost:3000';
  }
  
  // 在客户端环境中，使用当前域名
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  return 'http://localhost:3000';
}

export function logAuthConfig() {
  // Debug function for auth configuration
  // Logging removed for production
}