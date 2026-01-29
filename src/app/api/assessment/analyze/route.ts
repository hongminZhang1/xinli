
import { NextResponse } from 'next/server';

// 强制动态模式，防止缓存
export const dynamic = 'force-dynamic';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

export async function POST(req: Request) {
  if (!DEEPSEEK_API_KEY) {
    console.error("DeepSeek API Key is missing.");
    return NextResponse.json({ error: 'DeepSeek API Key not configured' }, { status: 500 });
  }

  try {
    const jsonBody = await req.json();
    const { assessment, answers, questions } = jsonBody;

    // 构建通过 Prompt 传入的问卷详情
    let assessmentContext = `问卷名称：${assessment.title}\n描述：${assessment.description}\n\n`;
    
    // 构建答题详情
    let answersContext = "用户的答题情况：\n";
    questions.forEach((q: any, index: number) => {
        const answerValue = answers[index]; // 假设 answers 是 key-value: {0: "A", 1: "B"}
        const selectedOption = q.options.find((opt: any) => opt.value === answerValue);
        answersContext += `${index + 1}. 问题：${q.text}\n   用户选择：${selectedOption ? selectedOption.text : answerValue}\n`;
    });

    const systemPrompt = {
      role: "system",
      content: `你是一位专业的心理评估师。用户刚刚完成了一份心理测试。
你的任务是根据用户的答题情况，生成一份精简的评估报告（300字以内）。
重点直接给出：
1. 核心结论（一句话）
2. 关键特征分析（3点）
3. 一个最重要的建议
不要使用复杂的格式，保持简洁明了。`
    };

    const userMessage = {
        role: "user",
        content: assessmentContext + answersContext
    };

    const requestBody = {
      model: 'deepseek-chat', // 默认不使用深度思考
      messages: [systemPrompt, userMessage],
      stream: true,
      temperature: 1.0,
      max_tokens: 4000
    };

    console.log(`Sending assessment analysis to DeepSeek API...`);

    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('DeepSeek API Error:', response.status, errorText);
        return NextResponse.json({ error: `DeepSeek API Error: ${response.statusText}`, details: errorText }, { status: response.status });
    }

    // 创建流透传
    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) return;
        const reader = response.body.getReader();
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } catch (err) {
            console.error('Stream reading error:', err);
            controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
