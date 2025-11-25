// backup-with-prisma.js
// 使用Prisma备份数据的脚本

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function backupData() {
  console.log('Starting data backup with Prisma...');
  
  try {
    // 获取所有数据
    console.log('Fetching users...');
    const users = await prisma.user.findMany();
    
    console.log('Fetching system settings...');
    const systemSettings = await prisma.systemSettings.findMany();
    
    console.log('Fetching emotion records...');
    const emotionRecords = await prisma.emotionRecord.findMany();
    
    console.log('Fetching chat sessions...');
    const chatSessions = await prisma.chatSession.findMany();
    
    console.log('Fetching appointments...');
    const appointments = await prisma.appointment.findMany();
    
    console.log('Fetching counselors...');
    const counselors = await prisma.counselor.findMany();
    
    console.log('Fetching journal entries...');
    const journalEntries = await prisma.journalEntry.findMany();
    
    console.log('Fetching comments...');
    const comments = await prisma.comment.findMany();
    
    // 创建备份数据对象
    const backupData = {
      timestamp: new Date().toISOString(),
      data: {
        users,
        systemSettings,
        emotionRecords,
        chatSessions,
        appointments,
        counselors,
        journalEntries,
        comments
      },
      counts: {
        users: users.length,
        systemSettings: systemSettings.length,
        emotionRecords: emotionRecords.length,
        chatSessions: chatSessions.length,
        appointments: appointments.length,
        counselors: counselors.length,
        journalEntries: journalEntries.length,
        comments: comments.length
      }
    };
    
    // 保存到文件
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `xinli_backup_${timestamp}.json`;
    
    fs.writeFileSync(filename, JSON.stringify(backupData, null, 2), 'utf8');
    
    console.log('\n✅ Backup completed successfully!');
    console.log(`📁 File: ${filename}`);
    console.log(`📊 Data counts:`);
    Object.entries(backupData.counts).forEach(([table, count]) => {
      console.log(`   ${table}: ${count}`);
    });
    
    const stats = fs.statSync(filename);
    console.log(`💾 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Backup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

backupData();