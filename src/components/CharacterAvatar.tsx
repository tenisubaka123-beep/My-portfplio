import React from 'react';
import Image from 'next/image';
import { EmotionType, CharacterStyle } from '@/types/assistant';

interface CharacterAvatarProps {
  emotion: EmotionType;
  characterStyle?: CharacterStyle;
  isSpeaking: boolean;
  speechVolume?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  emotion = 'passionate',
  isSpeaking = false,
  speechVolume = 0,
  size = 'md',
  className = '',
}) => {
  // Dimension config
  const dimensionClass = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32 md:w-36 md:h-36',
    lg: 'w-48 h-48 md:w-56 md:h-56',
  }[size];

  // Emotion onomatopoeia float badge
  const emotionBadge = {
    passionate: { text: 'メラメラ！', bg: 'bg-[#FED54A] text-black border-black' },
    happy: { text: 'ニコニコ！', bg: 'bg-[#FED54A] text-black border-black' },
    serious: { text: 'ゴゴゴ…', bg: 'bg-black text-[#FED54A] border-black' },
    sparkling: { text: 'キラーン✦', bg: 'bg-[#3B82F6] text-white border-black' },
    shy: { text: '照れ…///', bg: 'bg-pink-400 text-white border-black' },
  }[emotion] || { text: 'メラメラ！', bg: 'bg-[#FED54A] text-black border-black' };

  // Dynamic speaking scale / volume multiplier
  const volumeScale = isSpeaking && speechVolume > 0 ? 1 + Math.min(speechVolume / 350, 0.12) : 1;

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speaking Soundwaves Aura Ring */}
      {isSpeaking && (
        <>
          <div
            className="absolute -inset-4 rounded-full border-4 border-dashed border-[#FED54A] animate-spin opacity-85 pointer-events-none"
            style={{ animationDuration: '6s' }}
          />
          <div
            className="absolute -inset-2 rounded-full border-3 border-[#3B82F6] animate-ping opacity-60 pointer-events-none"
            style={{ animationDuration: '1.6s' }}
          />
          <div
            className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#FED54A]/30 via-[#3B82F6]/20 to-pink-500/30 blur-xl pointer-events-none animate-pulse"
          />
        </>
      )}

      {/* Manga Avatar Container */}
      <div
        className={`${dimensionClass} relative rounded-full border-4 border-black bg-white overflow-hidden shadow-[6px_6px_0px_0px_#000] flex items-center justify-center transition-transform duration-200`}
        style={{
          transform: isSpeaking ? `scale(${volumeScale}) translateY(-2px)` : 'scale(1)',
        }}
      >
        {/* Halftone Texture Overlay */}
        <div className="absolute inset-0 bg-pop-dots-black-soft opacity-20 pointer-events-none z-10" />

        {/* Character Illustration Asset */}
        <div className="relative w-full h-full">
          <Image
            src="/assets/aistudio/image_09a0ca3e.png"
            alt="アオイ - 講談社専属面接AIパートナー"
            fill
            className="object-cover object-[center_18%] select-none transition-transform duration-300"
            style={{
              transform: isSpeaking ? 'scale(1.08)' : 'scale(1.03)',
            }}
            priority
            unoptimized
          />
        </div>

        {/* Dynamic Speaking Lip-Sync / Voice Energy Glow */}
        {isSpeaking && (
          <div
            className="absolute inset-0 bg-[#FED54A]/20 pointer-events-none z-10 transition-opacity duration-100"
            style={{ opacity: Math.min(0.4, (speechVolume / 100) * 0.4) }}
          />
        )}

        {/* Comic Sweat Drop for Shy/Humorous */}
        {emotion === 'shy' && (
          <div className="absolute top-2 right-4 text-blue-500 text-lg sm:text-xl font-bold animate-bounce z-20 drop-shadow">
            💧
          </div>
        )}

        {/* Sparkles overlay for sparkling emotion */}
        {emotion === 'sparkling' && (
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-between p-2">
            <span className="text-yellow-400 text-base animate-ping">✦</span>
            <span className="text-[#3B82F6] text-base animate-pulse">✨</span>
          </div>
        )}
      </div>

      {/* Floating Emotion Onomatopoeia Badge */}
      <div
        className={`absolute -bottom-2 font-mono text-[10px] sm:text-xs font-black px-3 py-0.5 rounded-full border-2 shadow-[2px_2px_0px_0px_#000] z-30 ${emotionBadge.bg}`}
      >
        {emotionBadge.text}
      </div>

      {/* Speaking Indicator Badge */}
      {isSpeaking && (
        <div className="absolute -top-3.5 bg-black text-[#FED54A] text-[10px] font-black px-3 py-0.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] animate-pulse flex items-center gap-1.5 z-30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>熱弁中！</span>
        </div>
      )}
    </div>
  );
};
