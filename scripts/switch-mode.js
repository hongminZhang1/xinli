/**
 * 数据访问模式切换脚本
 */

const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '..', '.env');

function getCurrentMode() {
  try {
    const content = fs.readFileSync(envFile, 'utf8');
    const match = content.match(/NEXT_PUBLIC_DATA_ACCESS_MODE="([^"]+)"/);
    return match ? match[1] : 'direct';
  } catch (error) {
    console.error('读取环境变量文件失败:', error);
    return 'direct';
  }
}

function switchMode(targetMode, apiBaseUrl = null) {
  try {
    let content = fs.readFileSync(envFile, 'utf8');
    
    // 更新数据访问模式
    if (content.includes('NEXT_PUBLIC_DATA_ACCESS_MODE=')) {
      content = content.replace(
        /NEXT_PUBLIC_DATA_ACCESS_MODE="[^"]+"/,
        `NEXT_PUBLIC_DATA_ACCESS_MODE="${targetMode}"`
      );
    } else {
      content += `\nNEXT_PUBLIC_DATA_ACCESS_MODE="${targetMode}"`;
    }
    
    // 如果切换到API模式且提供了API地址，更新API地址
    if (targetMode === 'api' && apiBaseUrl) {
      if (content.includes('NEXT_PUBLIC_API_BASE_URL=')) {
        content = content.replace(
          /NEXT_PUBLIC_API_BASE_URL="[^"]+"/,
          `NEXT_PUBLIC_API_BASE_URL="${apiBaseUrl}"`
        );
      } else {
        content += `\nNEXT_PUBLIC_API_BASE_URL="${apiBaseUrl}"`;
      }
    }
    
    fs.writeFileSync(envFile, content, 'utf8');
    console.log(`✓ 数据访问模式已切换为: ${targetMode}`);
    
    if (targetMode === 'api' && apiBaseUrl) {
      console.log(`✓ API地址已设置为: ${apiBaseUrl}`);
    }
    
  } catch (error) {
    console.error('切换模式失败:', error);
  }
}

function showStatus() {
  const currentMode = getCurrentMode();
  
  try {
    const content = fs.readFileSync(envFile, 'utf8');
    const apiUrlMatch = content.match(/NEXT_PUBLIC_API_BASE_URL="([^"]+)"/);
    const apiUrl = apiUrlMatch ? apiUrlMatch[1] : '未设置';
    
    console.log('=== 当前数据访问配置 ===');
    console.log(`数据访问模式: ${currentMode}`);
    console.log(`API服务地址: ${apiUrl}`);
    
    if (currentMode === 'direct') {
      console.log('\n当前使用直接数据库访问模式');
      console.log('数据流: 前端应用 -> 直接连接 -> 远程数据库');
    } else {
      console.log('\n当前使用API代理访问模式');
      console.log('数据流: 前端应用 -> API服务器 -> 远程数据库');
    }
    
  } catch (error) {
    console.error('读取配置失败:', error);
  }
}

// 解析命令行参数
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'status':
    showStatus();
    break;
    
  case 'direct':
    switchMode('direct');
    console.log('\n请重新构建并重启应用以使更改生效:');
    console.log('npm run build && npm start');
    break;
    
  case 'api':
    const apiUrl = args[1] || 'http://193.112.165.180:3001/api';
    switchMode('api', apiUrl);
    console.log('\n请重新构建并重启应用以使更改生效:');
    console.log('npm run build && npm start');
    break;
    
  default:
    console.log('数据访问模式切换工具');
    console.log('');
    console.log('使用方法:');
    console.log('  node switch-mode.js status                    # 查看当前状态');
    console.log('  node switch-mode.js direct                   # 切换到直接数据库访问');
    console.log('  node switch-mode.js api [api-url]            # 切换到API代理访问');
    console.log('');
    console.log('示例:');
    console.log('  node switch-mode.js api http://193.112.165.180:3001/api');
    console.log('');
    showStatus();
    break;
}