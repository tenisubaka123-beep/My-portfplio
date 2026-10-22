export type EmotionType = 'passionate' | 'happy' | 'serious' | 'sparkling' | 'shy';

export type CharacterStyle = 'hero' | 'editor' | 'cool';

export interface ConversationTurn {
  id: string;
  role: 'interviewer' | 'partner';
  text: string;
  emotion?: EmotionType;
  timestamp: number;
}

export interface AnimeVoiceConfig {
  pitch: number;
  rate: number;
  voiceName?: string;
  playAnimeSting?: boolean;
}

export const DEFAULT_ANIME_VOICE_CONFIG: AnimeVoiceConfig = {
  pitch: 1.0, // Natural prosody (allows neural AI voice models to express authentic anime inflection smoothly without robotic distortion)
  rate: 1.05,  // Smooth, lively feminine delivery pace
  playAnimeSting: false,
};

export interface CandidateProfile {
  candidateName?: string;
  characterStyle?: CharacterStyle;
}
