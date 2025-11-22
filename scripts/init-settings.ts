import { prisma } from "../src/lib/db";

async function initializeSettings() {
  try {
    console.log('正在检查系统设置...');
    
    // 确保 registration_enabled 设置存在
    await prisma.systemSettings.upsert({
      where: { key: 'registration_enabled' },
      update: {},
      create: {
        key: 'registration_enabled',
        value: 'true',
        description: '是否允许新用户注册'
      }
    });

    console.log('系统设置检查完成');
    
    // 检查现有设置
    const settings = await prisma.systemSettings.findMany();
    console.log('当前系统设置:', settings);
    
  } catch (error) {
    console.error('初始化系统设置失败:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

initializeSettings();