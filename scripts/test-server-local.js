/**
 * 本地测试脚本 - 测试从轻量应用云服务器API获取数据
 */

async function testServerAPI() {
  const SERVER_URL = 'http://193.112.165.180:3001';
  
  console.log('🔍 测试从服务器API获取数据...');
  console.log(`📡 服务器地址: ${SERVER_URL}`);
  console.log('');

  const tests = [
    {
      name: '健康检查',
      url: `${SERVER_URL}/health`,
      description: '测试API服务是否在线'
    },
    {
      name: '获取用户列表',
      url: `${SERVER_URL}/api/users`,
      description: '测试能否获取用户数据'
    }
  ];

  for (const test of tests) {
    try {
      console.log(`⏳ 测试: ${test.name}`);
      console.log(`   描述: ${test.description}`);
      console.log(`   URL: ${test.url}`);
      
      const startTime = Date.now();
      
      // 创建带超时的fetch请求
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
      
      const response = await fetch(test.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log(`   ✅ 成功! (${duration}ms)`);
      console.log(`   📊 状态码: ${response.status}`);
      console.log(`   📄 响应数据:`);
      
      // 格式化输出数据
      if (Array.isArray(data)) {
        console.log(`   📋 数组长度: ${data.length}`);
        if (data.length > 0) {
          console.log(`   📝 第一项: ${JSON.stringify(data[0], null, 6)}`);
          if (data.length > 1) {
            console.log(`   ... 还有 ${data.length - 1} 项`);
          }
        }
      } else {
        console.log(`   📝 数据: ${JSON.stringify(data, null, 6)}`);
      }
      console.log('');
      
    } catch (error) {
      console.log(`   ❌ 失败!`);
      
      if (error.name === 'AbortError') {
        console.log(`   ⏰ 请求超时 (>10秒)`);
        console.log(`   💡 建议: 检查网络连接或服务器响应时间`);
      } else if (error.message.includes('Failed to fetch')) {
        console.log(`   🚫 网络连接失败`);
        console.log(`   💡 可能原因:`);
        console.log(`      - 服务器未启动或崩溃`);
        console.log(`      - 防火墙/安全组未开放3001端口`);
        console.log(`      - 网络连接问题`);
      } else if (error.message.includes('502')) {
        console.log(`   🚪 错误的网关 (502)`);
        console.log(`   💡 可能原因:`);
        console.log(`      - API服务内部错误`);
        console.log(`      - 数据库连接问题`);
      } else {
        console.log(`   🔍 错误详情: ${error.message}`);
      }
      console.log('');
    }
  }
  
  // 额外的网络连通性测试
  console.log('🌐 额外网络测试...');
  try {
    console.log('⏳ 测试基础连通性...');
    const pingResponse = await fetch(`http://193.112.165.180:3001`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    });
    console.log('✅ 服务器基础连通性正常');
  } catch (error) {
    console.log('❌ 服务器基础连通性失败');
    console.log(`   原因: ${error.message}`);
  }
  
  console.log('');
  console.log('📋 测试总结:');
  console.log('   如果所有测试都成功，说明API服务正常工作');
  console.log('   如果测试失败，请检查:');
  console.log('   1. 腾讯云安全组是否开放3001端口');
  console.log('   2. 服务器上的PM2服务是否正常运行');
  console.log('   3. 服务器防火墙配置');
  console.log('   4. 网络连接是否稳定');
}

// 运行测试
testServerAPI().catch(console.error);