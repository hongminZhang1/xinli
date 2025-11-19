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