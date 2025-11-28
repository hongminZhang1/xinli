export type EmotionEntry = {
  id: string;
  emoji: string;
  note?: string;
  createdAt: string;
};

export type CreateEmotionRequest = {
  emoji: string;
  note?: string;
};

export type UpdateEmotionRequest = {
  emoji?: string;
  note?: string;
};

export const EMOJI_OPTIONS = [
  { value: "😊", label: "开心" },
  { value: "😔", label: "难过" },
  { value: "😡", label: "愤怒" },
  { value: "😴", label: "疲倦" },
  { value: "😰", label: "焦虑" },
] as const;

// 情绪文字到表情符号的映射
export const EMOTION_TEXT_TO_EMOJI: Record<string, string> = {
  'HAPPY': '😊',
  'SAD': '😔', 
  'ANGRY': '😡',
  'TIRED': '😴',
  'ANXIOUS': '😰',
  'NEUTRAL': '😐',
  'EXCITED': '🤩',
  'CALM': '😌',
  'STRESSED': '😫',
  'CONFUSED': '😕',
  // 中文映射
  '开心': '😊',
  '难过': '😔',
  '愤怒': '😡', 
  '疲倦': '😴',
  '焦虑': '😰',
  '平静': '😌',
  '兴奋': '🤩',
  '压力': '😫',
  '困惑': '😕'
};

// 将情绪文字转换为表情符号
export function getEmotionEmoji(emotion: string): string {
  // 如果已经是表情符号，直接返回
  if (/^\p{Emoji}$/u.test(emotion)) {
    return emotion;
  }
  // 查找映射
  return EMOTION_TEXT_TO_EMOJI[emotion.toUpperCase()] || EMOTION_TEXT_TO_EMOJI[emotion] || '😐';
}