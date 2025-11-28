/**
 * 测试API连接
 * 验证前端能否正确连接到云服务器API
 */

const API_BASE_URL = 'http://193.112.165.180:3001/api';

async function testApiConnection() {
  console.log('🧪 开始测试API连接...');
  console.log('📡 API服务器地址:', API_BASE_URL);
  console.log('');

  const tests = [
    {
      name: '健康检查',
      url: 'http://193.112.165.180:3001/health',
    },
    {
      name: '获取用户列表',
      url: `${API_BASE_URL}/users`,
    },
    {
      name: '根据用户名查找用户',
      url: `${API_BASE_URL}/users/username/admin`,
    },
    {
      name: '获取情绪记录',
      url: `${API_BASE_URL}/emotions`,
    },
    {
      name: '获取日记列表',
      url: `${API_BASE_URL}/journals`,
    },
    {
      name: '获取系统设置',
      url: `${API_BASE_URL}/settings`,
    },
  ];

  for (const test of tests) {
    try {
      console.log(`📊 测试: ${test.name}`);
      const startTime = Date.now();
      
      const response = await fetch(test.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;

      if (response.ok) {
        const data = await response.json();
        console.log(`   ✅ 成功 (${duration}ms)`);
        
        if (Array.isArray(data)) {
          console.log(`   📝 返回 ${data.length} 条记录`);
        } else if (data.status) {
          console.log(`   📝 状态: ${data.status}`);
        }
      } else {
        console.log(`   ❌ 失败: HTTP ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.log(`   📝 错误信息: ${errorText.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`   ❌ 网络错误: ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log('🎉 测试完成！');
}

// 运行测试
testApiConnection().catch(console.error);