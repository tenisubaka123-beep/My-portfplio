"use client";

import React, { useState } from "react";
import { X, Check, Copy, Film, Sparkles, Folder } from "lucide-react";

interface VideoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "ja" | "en";
}

export const VideoGuideModal: React.FC<VideoGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#FAF7F2] border-2 border-[#242D35] rounded-3xl max-w-lg w-full p-6 manga-card-shadow relative overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#242D35]/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FED54A] border-2 border-[#242D35] flex items-center justify-center">
              <Film className="w-4 h-4 text-[#242D35]" />
            </div>
            <h3 className="font-extrabold text-base text-[#242D35]">
              {lang === "ja" ? "自己紹介動画の挿入ガイド" : "How to Add Your Video"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#242D35]/20 flex items-center justify-center text-[#52606D] hover:bg-black/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="py-4 space-y-4 text-xs sm:text-sm text-[#242D35]">
          <p className="text-xs text-[#52606D]">
            {lang === "ja"
              ? "撮影した自己紹介ショート動画は、以下の2つの方法で簡単に本ウェブサイトに反映できます。"
              : "You can easily insert your short introduction video using either of these methods:"}
          </p>

          {/* Method 1: Local file */}
          <div className="bg-white p-4 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-[#3B82F6] flex items-center gap-1.5">
                <Folder className="w-4 h-4" />
                {lang === "ja" ? "方法1：動画ファイルを直接置く（おすすめ）" : "Method 1: Local File (Recommended)"}
              </span>
              <span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded-full font-black text-[#3B82F6] border border-black">
                mp4 / webm
              </span>
            </div>
            <p className="text-xs text-[#52606D]">
              {lang === "ja"
                ? "撮影した動画ファイルを「public」フォルダ内に保存します（例: public/intro.mp4）。"
                : "Save your video inside the 'public' folder (e.g., public/intro.mp4)."}
            </p>
            <div className="bg-[#FAF7F2] p-2.5 rounded-xl font-mono text-[11px] border border-[#242D35]/15 flex items-center justify-between">
              <code>src/data/portfolioData.ts → videoUrl: &quot;/intro.mp4&quot;</code>
              <button
                onClick={() => handleCopy('videoUrl: "/intro.mp4",', 1)}
                className="p-1 hover:bg-black/5 rounded text-[#52606D] cursor-pointer"
                title="Copy snippet"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-[#3B82F6]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Method 2: YouTube / Online Link */}
          <div className="bg-white p-4 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-black flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FED54A]" />
                {lang === "ja" ? "方法2：YouTube（限定公開）URLを指定する" : "Method 2: Unlisted YouTube Link"}
              </span>
              <span className="text-[10px] bg-[#FED54A] px-2 py-0.5 rounded-full font-black text-black border border-black">
                YouTube
              </span>
            </div>
            <p className="text-xs text-[#52606D]">
              {lang === "ja"
                ? "YouTubeに「限定公開」でアップロードし、そのURLを直接貼り付けるだけで再生されます。"
                : "Upload as Unlisted on YouTube and provide the URL directly."}
            </p>
            <div className="bg-[#FAF7F2] p-2.5 rounded-xl font-mono text-[11px] border border-[#242D35]/15 flex items-center justify-between">
              <code>videoUrl: &quot;https://www.youtube.com/watch?v=...&quot;</code>
              <button
                onClick={() => handleCopy('videoUrl: "https://www.youtube.com/watch?v=your-video-id",', 2)}
                className="p-1 hover:bg-black/5 rounded text-[#52606D] cursor-pointer"
                title="Copy snippet"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-[#3B82F6]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#FED54A] border-2 border-black text-black text-xs font-black hover:bg-[#3B82F6] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
          >
            {lang === "ja" ? "閉じる" : "Got it!"}
          </button>
        </div>
      </div>
    </div>
  );
};
