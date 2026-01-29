"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, ArrowRight, CheckCircle, Clock, Target, Sparkles, MessageSquare, Send, Brain } from "lucide-react";
import { getQuestions } from "@/lib/assessment-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TestModalProps {
  test: {
    id: string;
    title: string;
    description: string;
    icon: string;
    questions: number;
    duration: string;
  };
  onClose: () => void;
}

// 定义聊天消息类型
type ChatMsg = {
    role: "user" | "assistant" | "system";
    content: string;
};

export default function TestModal({ test, onClose }: TestModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 分析相关
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 对话相关
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [useDeepThought, setUseDeepThought] = useState(false); // 是否使用深度思考
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // 获取对应测试的题目
  const allQuestions = getQuestions(test.id);
  const questions = allQuestions.slice(0, Math.min(test.questions, allQuestions.length));
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (showResult && chatMessages.length > 0) {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, showResult, analysisResult]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsAnalyzing(true);
    
    // 构建初始上下文
    let assessmentContext = `问卷名称：${test.title}\n描述：${test.description}\n\n`;
    let answersContext = "用户的答题情况：\n";
    questions.forEach((q: any, index: number) => {
        const answerValue = answers[index];
        const selectedOption = q.options.find((opt: any) => opt.value === answerValue);
        answersContext += `${index + 1}. 问题：${q.text}\n   用户选择：${selectedOption ? selectedOption.text : answerValue}\n`;
    });
    
    // 初始 System Prompt
    const systemMsg: ChatMsg = {
        role: "system",
        content: `你是一位专业的心理评估师。用户刚刚完成了一份心理测试。
你的任务是根据用户的答题情况，生成一份精简的评估报告。
随后，你需要作为咨询师与用户进行对话，解答他们的疑问，或者根据他们的请求进行更深入的分析（如果用户开启了深度思考）。`
    };

    const userMsg: ChatMsg = {
        role: "user",
        content: assessmentContext + answersContext
    };

    // 初始化聊天记录
    setChatMessages([systemMsg, userMsg]);

    try {
        const res = await fetch("/api/assessment/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                assessment: test,
                answers: answers,
                questions: questions
            }),
        });

        if (!res.ok) {
            throw new Error(`API Error: ${res.statusText}`);
        }

        setShowResult(true);
        setIsSubmitting(false);

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        
        let fullResult = "";

        if (reader) {
            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                
                const lines = buffer.split('\n');
                buffer = lines.pop() || "";
                
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed === "data: [DONE]") continue;
                    if (trimmed.startsWith("data: ")) {
                        try {
                            const json = JSON.parse(trimmed.slice(6));
                            const content = json.choices?.[0]?.delta?.content || "";
                            if (content) {
                                fullResult += content;
                                setAnalysisResult(prev => prev + content);
                            }
                        } catch (e) {}
                    }
                }
            }
        }
        
        // 分析完成后，将 AI 的回复加入到聊天记录中
        setChatMessages(prev => [...prev, { role: "assistant", content: fullResult }]);

    } catch (error) {
        console.error("Analysis failed:", error);
        alert("分析生成失败，请稍后重试。");
        onClose();
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
      if (!chatInput.trim() || isChatLoading) return;
      
      const userInput = chatInput;
      setChatInput("");
      setIsChatLoading(true);

      // 添加用户消息
      const newUserMsg: ChatMsg = { role: "user", content: userInput };
      const newMessages = [...chatMessages, newUserMsg];
      setChatMessages(newMessages);

      try {
        const res = await fetch("/api/chat/deepseek", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: newMessages,
                model: useDeepThought ? "deepseek-reasoner" : "deepseek-chat"
            }),
        });

        if (!res.ok) throw new Error("Chat failed");

        // 创建临时消息用于流式显示
        const assistantMsgId = String(Date.now());
        // 我们可以在这里临时增加一个空消息，或者直接用最后一条消息的状态来渲染
        // 这里简化处理：直接累积到最后一条消息（如果是 assistant）或者新增一条
        
        // 为了简单，我们先不实时流式显示到 UI 的对话框中，而是等有了 chunk 就更新
        // 但是为了体验，我们需要实时更新 chatMessages 末尾的消息
        
        // 先加一个空的占位
        setChatMessages(prev => [...prev, { role: "assistant", content: "" }]);

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        if (reader) {
             let buffer = "";
             while(true) {
                 const { done, value } = await reader.read();
                 if (done) break;
                 
                 const chunk = decoder.decode(value, { stream: true });
                 buffer += chunk;
                 const lines = buffer.split('\n');
                 buffer = lines.pop() || "";
                 
                 for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed === "data: [DONE]") continue;
                    if (trimmed.startsWith("data: ")) {
                        try {
                            const json = JSON.parse(trimmed.slice(6));
                            const content = json.choices?.[0]?.delta?.content || "";
                             // DeepSeek R1 reasoning_content (忽略思考过程的展示，或者直接拼接到最后？这里先只展示 final content)
                             // 如果需要展示思考过程，需根据 API 返回结构调整
                            if (content) {
                                assistantContent += content;
                                setChatMessages(prev => {
                                    const last = prev[prev.length - 1];
                                    if (last.role === "assistant") {
                                         return [...prev.slice(0, -1), { ...last, content: assistantContent }];
                                    }
                                    return prev;
                                });
                            }
                        } catch(e) {}
                    }
                 }
             }
        }

      } catch (error) {
          console.error("Chat error:", error);
          setChatMessages(prev => [...prev, { role: "assistant", content: "抱歉，出错了，请重试。" }]);
      } finally {
          setIsChatLoading(false);
      }
  };

  // 加载状态
  if (isSubmitting) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card/95 backdrop-blur-md rounded-3xl max-w-md w-full p-8 text-center space-y-6 border border-border/20 shadow-xl">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="font-heading text-xl text-foreground mb-2">正在分析你的答案...</h3>
            <p className="text-muted-foreground">AI正在为你生成专属的心理分析报告</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl border border-gray-200">
          
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-100 bg-white/50">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{test.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">评估分析报告</h2>
                <p className="text-sm text-gray-500">{test.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content Scroll Area */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/50">
             
             {/* 初始分析报告 */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                 {analysisResult ? (
                    <div className="prose prose-blue max-w-none">
                         <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {analysisResult}
                         </ReactMarkdown>
                    </div>
                 ) : (
                    <div className="flex items-center justify-center h-40 text-gray-500">
                        <span className="animate-pulse">报告生成中...</span>
                    </div>
                 )}
                 {isAnalyzing && (
                     <div className="mt-4 text-center text-sm text-gray-400 animate-pulse">
                         正在生成分析...
                     </div>
                 )}
             </div>

             {/* 后续对话记录 (跳过前3条: system, user-context, assistant-initial-report) */}
             {chatMessages.slice(3).map((msg, idx) => (
                 <div key={idx} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] p-4 rounded-2xl ${
                         msg.role === 'user' 
                         ? 'bg-blue-600 text-white rounded-br-none' 
                         : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                     }`}>
                         <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                             <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                 {msg.content}
                             </ReactMarkdown>
                         </div>
                     </div>
                 </div>
             ))}
             
             {isChatLoading && (
                 <div className="flex justify-start mb-4">
                     <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex items-center gap-2">
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                     </div>
                 </div>
             )}
             
             <div ref={chatBottomRef} />
          </div>
          
          {/* Chat Input Area */}
          <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-white">
              <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                         onClick={() => setUseDeepThought(!useDeepThought)}>
                        <Brain className={`w-4 h-4 ${useDeepThought ? 'text-purple-600' : 'text-gray-400'}`} />
                        <span className={`text-xs font-medium ${useDeepThought ? 'text-purple-700' : 'text-gray-500'}`}>
                            深度思考 {useDeepThought ? '已开启' : '已关闭'}
                        </span>
                    </div>
                  </div>
              </div>
              
              <div className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isChatLoading && handleSendMessage()}
                    placeholder="对结果有疑问？可以继续向我提问..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    disabled={isChatLoading || isAnalyzing}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isChatLoading || isAnalyzing}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
              </div>
          </div>

        </div>
      </div>
    );
  }




  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-border/20">
        
        {/* 顶部头部 */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 sky-gradient-dynamic"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl animate-float">{test.icon}</div>
                <div>
                  <h2 className="font-heading text-xl text-foreground">{test.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>预计 {test.duration}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>用时 {formatTime(timeElapsed)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/20 transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* 进度条 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>答题进度</span>
                <span>{currentQuestion + 1} / {questions.length}</span>
              </div>
              <div className="relative">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-accent rounded-full h-2 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div 
                  className="absolute top-0 w-3 h-2 bg-white rounded-full shadow-sm transition-all duration-500 ease-out"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 问题内容 */}
        <div className="p-8 space-y-8">
          <div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                第 {currentQuestion + 1} 题
              </span>
              <div className="flex-1 h-px bg-border"></div>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-8 leading-relaxed">
              {questions[currentQuestion]?.text}
            </h3>
          </div>

          <div className="space-y-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-6 text-left rounded-2xl transition-all duration-300 border-2 group ${
                  answers[currentQuestion] === option.value
                    ? "border-primary/50 bg-primary/5 shadow-lg"
                    : "border-border/40 bg-card/50 hover:border-border hover:bg-card/80 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`relative w-5 h-5 rounded-full border-2 transition-all ${
                    answers[currentQuestion] === option.value
                      ? "border-primary bg-primary"
                      : "border-muted group-hover:border-primary/50"
                  }`}>
                    {answers[currentQuestion] === option.value && (
                      <div className="absolute inset-1 bg-white rounded-full scale-110 animate-ping"></div>
                    )}
                    {answers[currentQuestion] === option.value && (
                      <div className="absolute inset-1 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {option.text}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 底部按钮区域 */}
          <div className="flex justify-between items-center pt-6 border-t border-border/20">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              上一题
            </button>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-success/10 text-success rounded-full">
                {answeredCount} / {questions.length} 已回答
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? "完成测试" : "下一题"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}