import { prisma } from "../src/lib/db";
import bcrypt from "bcrypt";

async function initializeAdmin() {
  try {
    // 检查是否已有管理员用户
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (adminUser) {
      console.log('管理员用户已存在:', adminUser.username);
      return;
    }

    // 创建管理员用户
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
        email: 'admin@xinli.com',
        name: '系统管理员'
      }
    });

    console.log('管理员用户创建成功:', admin.username);

    // 创建系统设置
    await prisma.systemSettings.upsert({
      where: { key: 'registration_enabled' },
      update: {},
      create: {
        key: 'registration_enabled',
        value: 'true',
        description: '是否允许新用户注册',
        updatedBy: admin.id
      }
    });

    console.log('系统设置初始化完成');

  } catch (error) {
    console.error('初始化失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeAdmin();