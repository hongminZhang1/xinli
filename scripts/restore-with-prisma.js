// restore-with-prisma.js
// 使用Prisma恢复数据的脚本

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

if (process.argv.length < 3) {
  console.error('Usage: node restore-with-prisma.js <backup-file>');
  process.exit(1);
}

const backupFile = process.argv[2];

async function restoreData() {
  console.log('Starting data restore with Prisma...');
  console.log(`📁 Backup file: ${backupFile}`);
  
  if (!fs.existsSync(backupFile)) {
    console.error('❌ Backup file does not exist!');
    process.exit(1);
  }
  
  const prisma = new PrismaClient();
  
  try {
    // 读取备份文件
    console.log('Reading backup file...');
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
    
    // 恢复数据（按依赖顺序）
    console.log('📥 Restoring data...');
    
    if (backupData.data.users.length > 0) {
      await prisma.user.createMany({ data: backupData.data.users });
      console.log(`✅ Restored ${backupData.data.users.length} users`);
    }
    
    if (backupData.data.systemSettings.length > 0) {
      await prisma.systemSettings.createMany({ data: backupData.data.systemSettings });
      console.log(`✅ Restored ${backupData.data.systemSettings.length} system settings`);
    }
    
    if (backupData.data.counselors.length > 0) {
      await prisma.counselor.createMany({ data: backupData.data.counselors });
      console.log(`✅ Restored ${backupData.data.counselors.length} counselors`);
    }
    
    if (backupData.data.emotionRecords.length > 0) {
      await prisma.emotionRecord.createMany({ data: backupData.data.emotionRecords });
      console.log(`✅ Restored ${backupData.data.emotionRecords.length} emotion records`);
    }
    
    if (backupData.data.chatSessions.length > 0) {
      await prisma.chatSession.createMany({ data: backupData.data.chatSessions });
      console.log(`✅ Restored ${backupData.data.chatSessions.length} chat sessions`);
    }
    
    if (backupData.data.appointments.length > 0) {
      await prisma.appointment.createMany({ data: backupData.data.appointments });
      console.log(`✅ Restored ${backupData.data.appointments.length} appointments`);
    }
    
    if (backupData.data.journalEntries.length > 0) {
      await prisma.journalEntry.createMany({ data: backupData.data.journalEntries });
      console.log(`✅ Restored ${backupData.data.journalEntries.length} journal entries`);
    }
    
    if (backupData.data.comments.length > 0) {
      await prisma.comment.createMany({ data: backupData.data.comments });
      console.log(`✅ Restored ${backupData.data.comments.length} comments`);
    }
    
    console.log('\n🎉 Data restore completed successfully!');
    
  } catch (error) {
    console.error('❌ Restore failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

restoreData();