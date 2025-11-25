// restore-with-prisma-mysql.js
// MySQL版本的数据恢复脚本

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

if (process.argv.length < 3) {
  console.error('Usage: node restore-with-prisma-mysql.js <backup-file>');
  process.exit(1);
}

const backupFile = process.argv[2];

// 数据转换函数
function convertArrayToJson(data) {
  if (Array.isArray(data)) {
    return JSON.stringify(data);
  }
  return data;
}

function convertPostgresToMySQL(data) {
  // 移除不存在的字段并转换数组到JSON
  const converted = {
    ...data,
    tags: convertArrayToJson(data.tags),
    // 处理其他可能的数组字段
    ...(data.messages && { messages: convertArrayToJson(data.messages) }),
    ...(data.specialties && { specialties: convertArrayToJson(data.specialties) }),
  };
  
  // 移除undefined的字段
  Object.keys(converted).forEach(key => {
    if (converted[key] === undefined) {
      delete converted[key];
    }
  });
  
  return converted;
}

async function restoreData() {
  console.log('🔄 Starting MySQL data restore...');
  console.log(`📁 Backup file: ${backupFile}`);
  
  if (!fs.existsSync(backupFile)) {
    console.error('❌ Backup file does not exist!');
    process.exit(1);
  }
  
  const prisma = new PrismaClient();
  
  try {
    // 读取备份文件
    console.log('📖 Reading backup file...');
    const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
    
    console.log(`📅 Backup timestamp: ${backupData.timestamp}`);
    console.log('📊 Data to restore:');
    Object.entries(backupData.counts).forEach(([table, count]) => {
      console.log(`   ${table}: ${count}`);
    });
    
    // 清空现有数据（按依赖顺序）
    console.log('\n🗑️  Clearing existing data...');
    await prisma.comment.deleteMany();
    await prisma.journalEntry.deleteMany();
    await prisma.emotionRecord.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.chatSession.deleteMany();
    await prisma.counselor.deleteMany();
    await prisma.systemSettings.deleteMany();
    await prisma.user.deleteMany();
    
    // 恢复数据（按依赖顺序，转换数组为JSON）
    console.log('📥 Restoring data with MySQL format...');
    
    if (backupData.data.users.length > 0) {
      const users = backupData.data.users.map(convertPostgresToMySQL);
      await prisma.user.createMany({ data: users });
      console.log(`✅ Restored ${users.length} users`);
    }
    
    if (backupData.data.systemSettings.length > 0) {
      const settings = backupData.data.systemSettings.map(convertPostgresToMySQL);
      await prisma.systemSettings.createMany({ data: settings });
      console.log(`✅ Restored ${settings.length} system settings`);
    }
    
    if (backupData.data.counselors.length > 0) {
      const counselors = backupData.data.counselors.map(convertPostgresToMySQL);
      await prisma.counselor.createMany({ data: counselors });
      console.log(`✅ Restored ${counselors.length} counselors`);
    }
    
    if (backupData.data.emotionRecords.length > 0) {
      const emotions = backupData.data.emotionRecords.map(convertPostgresToMySQL);
      await prisma.emotionRecord.createMany({ data: emotions });
      console.log(`✅ Restored ${emotions.length} emotion records`);
    }
    
    if (backupData.data.chatSessions.length > 0) {
      const chats = backupData.data.chatSessions.map(convertPostgresToMySQL);
      await prisma.chatSession.createMany({ data: chats });
      console.log(`✅ Restored ${chats.length} chat sessions`);
    }
    
    if (backupData.data.appointments.length > 0) {
      const appointments = backupData.data.appointments.map(convertPostgresToMySQL);
      await prisma.appointment.createMany({ data: appointments });
      console.log(`✅ Restored ${appointments.length} appointments`);
    }
    
    if (backupData.data.journalEntries.length > 0) {
      const journals = backupData.data.journalEntries.map(convertPostgresToMySQL);
      await prisma.journalEntry.createMany({ data: journals });
      console.log(`✅ Restored ${journals.length} journal entries`);
    }
    
    if (backupData.data.comments.length > 0) {
      const comments = backupData.data.comments.map(convertPostgresToMySQL);
      await prisma.comment.createMany({ data: comments });
      console.log(`✅ Restored ${comments.length} comments`);
    }
    
    console.log('\n🎉 MySQL data restore completed successfully!');
    console.log('📝 Note: Array data has been converted to JSON format for MySQL compatibility');
    
  } catch (error) {
    console.error('❌ MySQL restore failed:', error);
    console.error('Details:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

restoreData();