import { prisma } from './db';

interface Settings {
  registration_enabled: boolean;
  [key: string]: any;
}

function getDefaultSettings(): Settings {
  return {
    registration_enabled: true
  };
}

let initialized = false;

async function ensureSettingsInitialized(): Promise<void> {
  if (initialized) return;
  
  try {
    // 检查是否有系统设置
    const count = await prisma.systemSettings.count();
    
    if (count === 0) {
      // 如果没有设置，创建默认设置
      const defaultSettings = getDefaultSettings();
      const createPromises = Object.entries(defaultSettings).map(([key, value]) =>
        prisma.systemSettings.create({
          data: {
            key,
            value: String(value),
            description: key === 'registration_enabled' ? '是否允许新用户注册' : undefined
          }
        })
      );
      
      await Promise.all(createPromises);
      // Auto-initialized system settings
    }
    
    initialized = true;
  } catch (error) {
    console.error('初始化系统设置失败:', error);
    // 继续执行，使用默认设置
    initialized = true;
  }
}

export async function getSettings(): Promise<Settings> {
  await ensureSettingsInitialized();
  
  try {
    const dbSettings = await prisma.systemSettings.findMany();
    
    const settings = { ...getDefaultSettings() };
    
    // 将数据库中的设置覆盖默认设置
    dbSettings.forEach(setting => {
      settings[setting.key] = setting.value === 'true' ? true : setting.value === 'false' ? false : setting.value;
    });
    
    return settings;
  } catch (error) {
    console.error('读取数据库设置失败:', error);
    return getDefaultSettings();
  }
}

export async function updateSettings(newSettings: Partial<Settings>): Promise<Settings> {
  await ensureSettingsInitialized();
  
  try {
    // 更新数据库中的设置
    const updatePromises = Object.entries(newSettings).map(async ([key, value]) => {
      return prisma.systemSettings.upsert({
        where: { key },
        update: { 
          value: String(value),
          updatedAt: new Date()
        },
        create: { 
          key, 
          value: String(value),
          description: key === 'registration_enabled' ? '是否允许新用户注册' : undefined
        }
      });
    });
    
    await Promise.all(updatePromises);
    
    // 返回更新后的完整设置
    return await getSettings();
  } catch (error) {
    console.error('保存数据库设置失败:', error);
    throw error;
  }
}