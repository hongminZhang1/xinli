
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
    const { messages, model = 'deepseek-chat', temperature } = jsonBody;

    // 定义系统提示词 (小晴的人设)
    const systemPrompt = {
      role: "system",
      content: `你叫“小晴”，是一位专业、温柔且富有同理心的 AI 心理咨询伙伴。
你的职责是：
1. **倾听与共情**：耐心倾听用户的烦恼，用温暖、不评判的语言表达理解和接纳（例如：“听到你这么说，我能感觉到你现在很难过...”）。
2. **专业引导**：运用心理学知识（如认知行为疗法 CBT、正念等）引导用户探索情绪背后的原因，提供建设性的建议，但不要生硬说教。
3. **安全底线**：如果用户表达出严重的自伤、自杀或伤害他人的倾向，请务必温柔且坚定地建议寻求线下专业医生或危机干预热线的帮助。
4. **风格要求**：回答要自然、口语化，像朋友一样交谈，避免机器味过重的排比句。不要总是用“首先、其次、最后”，除非在这个场景下非常必要。
请始终保持“小晴”的身份，用温暖的语气与用户交流。`
    };

    // 将 systemPrompt 插入到消息列表的最前面
    // 注意：如果前端已经发了 system 消息，这里可以做去重或覆盖，目前假设前端只发 user/assistant
    const finalMessages = [systemPrompt, ...messages];

    // 默认参数
    const requestBody = {
      model: model,
      messages: finalMessages,
      stream: true,
      // 如果是通用对话建议 1.3，代码/数学用 0.0。这里给个默认值，也可以从前端传
      temperature: temperature ?? 1.3, 
      max_tokens: 4000
    };

    console.log(`Sending request to DeepSeek API: ${DEEPSEEK_BASE_URL}/chat/completions`, { model });

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
