import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function debugLogin() {
  try {
    console.log('🔍 开始调试登录问题...\n');
    
    // 1. 检查数据库连接
    console.log('1️⃣ 检查数据库连接...');
    const userCount = await prisma.user.count();
    console.log(`   ✅ 数据库连接成功，共有 ${userCount} 个用户\n`);
    
    // 2. 列出所有用户
    console.log('2️⃣ 数据库中的用户列表：');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
        password: true,
      }
    });
    
    users.forEach(user => {
      console.log(`   - 用户名: ${user.username}`);
      console.log(`     角色: ${user.role}`);
      console.log(`     状态: ${user.isActive ? '激活' : '禁用'}`);
      console.log(`     密码哈希: ${user.password?.substring(0, 20)}...`);
      console.log(`     密码格式: ${user.password?.startsWith('$2b$') || user.password?.startsWith('$2a$') ? 'bcrypt' : '未知/明文'}`);
      console.log('');
    });
    
    // 3. 测试密码验证
    console.log('3️⃣ 测试密码验证...');
    const testUser = users[0];
    if (testUser) {
      console.log(`   测试用户: ${testUser.username}`);
      
      // 测试常见密码
      const testPasswords = ['admin123', '123456', 'password'];
      
      for (const pwd of testPasswords) {
        try {
          const isValid = await bcrypt.compare(pwd, testUser.password || '');
          console.log(`   密码 "${pwd}": ${isValid ? '✅ 匹配' : '❌ 不匹配'}`);
        } catch (error) {
          console.log(`   密码 "${pwd}": ❌ 验证失败 (${error})`);
        }
      }
    }
    
    // 4. 检查环境变量
    console.log('\n4️⃣ 环境变量检查：');
    console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✅ 已设置' : '❌ 未设置'}`);
    console.log(`   NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? '✅ 已设置' : '❌ 未设置'}`);
    console.log(`   NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || '❌ 未设置'}`);
    console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    
  } catch (error) {
    console.error('❌ 调试过程出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugLogin();
