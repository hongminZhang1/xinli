const fs = require("fs");
let content = fs.readFileSync("src/lib/assessment-data.ts", "utf8");

const newMbti = `const mbtiQuestionsList = [
  { id: 1, text: "在聚会中，你更倾向于：", options: [ { value: "E", text: "与很多人交谈，享受社交的乐趣" }, { value: "I", text: "与少数几个人深入交谈" } ] },
  { id: 2, text: "当解决问题时，你更依靠：", options: [ { value: "S", text: "已知的事实和经验" }, { value: "N", text: "直觉和可能性" } ] },
  { id: 3, text: "做决定时，你更看重：", options: [ { value: "T", text: "逻辑分析和客观标准" }, { value: "F", text: "个人价值观和他人感受" } ] },
  { id: 4, text: "你更喜欢：", options: [ { value: "J", text: "有计划、有条理的生活" }, { value: "P", text: "灵活、自发的生活方式" } ] },
  { id: 5, text: "在团队项目中，你通常：", options: [ { value: "E", text: "主动分享想法，推动讨论" }, { value: "I", text: "先思考再发言，提供深思熟虑的观点" } ] },
  { id: 6, text: "面对突发情况，你通常会：", options: [ { value: "J", text: "感到焦虑，希望尽快恢复计划" }, { value: "P", text: "觉得刺激，灵活应对新变化" } ] },
  { id: 7, text: "你在空闲时间的理想状态是：", options: [ { value: "E", text: "和朋友们一起出去玩乐" }, { value: "I", text: "独自在家看书或做自己喜欢的事" } ] },
  { id: 8, text: "你如何看待规则和制度：", options: [ { value: "J", text: "它们是必要的，应该被严格遵守" }, { value: "P", text: "它们只是指南，可以根据情况灵活变通" } ] },
  { id: 9, text: "在工作中，你更看重：", options: [ { value: "T", text: "效率和最终的成果" }, { value: "F", text: "团队的和谐及成员的感受" } ] },
  { id: 10, text: "你更喜欢怎样的学习方式：", options: [ { value: "S", text: "通过实践操作和具体例子来学习" }, { value: "N", text: "通过理解理论和探究概念来学习" } ] }
];`;

const newSds = `const sdsQuestionsList = [
  { id: 1, text: "我觉得闷闷不乐，情绪低沉", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 2, text: "我觉得一天之中早晨最好", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 3, text: "我一阵阵哭出来或觉得想哭", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 4, text: "我晚上睡眠不好", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 5, text: "我吃得跟平常一样多", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 6, text: "我与异性接触时和以往一样感到愉快", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 7, text: "我发觉我的体重在下降", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 8, text: "我有便秘的苦恼", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 9, text: "我心跳比平时快", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 10, text: "我无缘无故地感到疲乏", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] }
];`;

const newSas = `const sasQuestionsList = [
  { id: 1, text: "我觉得比平常容易紧张和着急", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 2, text: "我无缘无故地感到害怕", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 3, text: "我容易心里烦乱或觉得惊恐", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 4, text: "我觉得我可能将要发疯", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 5, text: "我觉得一切都很好，也不会发生什么不幸", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 6, text: "我手脚发抖打颤", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 7, text: "我因为头痛、颈痛和背痛而苦恼", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 8, text: "我感觉容易衰弱和疲乏", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 9, text: "我感到平静，并且容易安静坐着", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 10, text: "我觉得心跳得很快", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] }
];`;

content = content.replace(/const mbtiQuestionsList = \[[\s\S]*?\];/m, newMbti);
content = content.replace(/const sdsQuestionsList = \[[\s\S]*?\];/m, newSds);
content = content.replace(/const sasQuestionsList = \[[\s\S]*?\];/m, newSas);

fs.writeFileSync("src/lib/assessment-data.ts", content, "utf8");
console.log("Done");

