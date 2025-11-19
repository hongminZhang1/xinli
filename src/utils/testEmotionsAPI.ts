// 情绪记录API测试脚本
// 可在浏览器控制台中运行（需要先登录）

const testEmotionsAPI = async () => {
  try {
    console.log("🧪 开始测试情绪记录API...");
    
    // 1. 测试获取记录
    console.log("\n📖 测试获取记录...");
    const getResponse = await fetch("/api/emotions");
    const records = await getResponse.json();
    console.log("获取记录成功:", records);
    
    // 2. 测试添加记录
    console.log("\n➕ 测试添加记录...");
    const addResponse = await fetch("/api/emotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emoji: "😊",
        note: "测试记录 - " + new Date().toLocaleString()
      }),
    });
    const newRecord = await addResponse.json();
    console.log("添加记录成功:", newRecord);
    
    // 3. 测试更新记录
    if (newRecord.id) {
      console.log("\n✏️ 测试更新记录...");
      const updateResponse = await fetch(`/api/emotions/${newRecord.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emoji: "😔",
          note: "更新后的测试记录 - " + new Date().toLocaleString()
        }),
      });
      const updatedRecord = await updateResponse.json();
      console.log("更新记录成功:", updatedRecord);
      
      // 4. 测试删除记录
      console.log("\n🗑️ 测试删除记录...");
      const deleteResponse = await fetch(`/api/emotions/${newRecord.id}`, {
        method: "DELETE",
      });
      const deleteResult = await deleteResponse.json();
      console.log("删除记录成功:", deleteResult);
    }
    
    console.log("\n✅ 所有API测试完成！");
    
  } catch (error) {
    console.error("❌ API测试失败:", error);
  }
};

// 在浏览器控制台中运行
// testEmotionsAPI();

export { testEmotionsAPI };