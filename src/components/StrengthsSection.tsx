"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, TrendingUp, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { PortfolioContent } from "@/data/portfolioData";

interface StrengthsSectionProps {
  data: PortfolioContent;
  lang: "ja" | "en";
}

export const StrengthsSection: React.FC<StrengthsSectionProps> = ({ data, lang }) => {
  const pillarArt = [
    {
      id: "lit",
      image: "/images/japanese-literature.png",
      sfx: "ズバッ",
      sfxColor: "pop-onomatope-yellow",
      speechBubble: "「行間と魂を徹底解読！」",
      speechBg: "#FED54A",
      badgeBg: "#FED54A",
      badgeText: "BLACK",
    },
    {
      id: "mkt",
      image: "/images/paris-marketing.png",
      sfx: "ドォン!!",
      sfxColor: "pop-onomatope-blue",
      speechBubble: "「欧州・BD市場を開拓！」",
      speechBg: "#3B82F6",
      badgeBg: "#3B82F6",
      badgeText: "WHITE",
    },
    {
      id: "syn",
      image: "/images/pop-manga/pop-comic-bubble-girl.png",
      sfx: "キラーン✨",
      sfxColor: "pop-onomatope-yellow",
      speechBubble: "「クリエイターと世界を繋ぐ！」",
      speechBg: "#FED54A",
      badgeBg: "#FED54A",
      badgeText: "BLACK",
    },
  ];

  return (
    <section id="strengths-section" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black overflow-hidden select-none">


      {/* Corner Crop Marks (トンボ) */}
      <div className="absolute top-3 left-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        ⌜ FRAME 03 • 3 CORE COMPETENCIES
      </div>
      <div className="absolute top-3 right-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        MANGA POWERS ⌝
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* ============================================================== */}
        {/* TOP HEADER: Pop Manga Chapter Tag & Title                      */}
        {/* ============================================================== */}
        <div className="text-center relative">
          
          {/* Top Manga SFX Row: Completely apart from title & separated from each other */}
          <div className="flex items-center justify-between max-w-4xl mx-auto px-2 sm:px-6 mb-5 select-none pointer-events-none whitespace-nowrap">
            <div className="transform -rotate-12 whitespace-nowrap">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black pop-onomatope-blue inline-block whitespace-nowrap leading-none">
                バァァン！
              </span>
            </div>

            {/* Spiked Shout Style Chapter Tag in Pop Yellow */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FED54A] border-3 border-black text-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000] transform rotate-1 pointer-events-auto shrink-0">
              <span className="bg-black text-[#FED54A] px-2.5 py-0.5 rounded text-[11px] font-black">
                第3コマ
              </span>
              <span>{lang === "ja" ? "3つのコア・コンピタンス" : "3 Core Competencies"}</span>
            </div>

            <div className="transform rotate-12 whitespace-nowrap">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black pop-onomatope-yellow inline-block whitespace-nowrap leading-none">
                ドドドド
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-black tracking-tight drop-shadow-xs">
            {lang === "ja"
              ? "「文学の解像度」×「マーケティングの推進力」"
              : "Literary Depth × Strategic Execution"}
          </h2>

          <p className="text-xs sm:text-sm text-gray-800 font-bold mt-3 max-w-xl mx-auto leading-relaxed">
            {lang === "ja"
              ? "作品の本質的な面白さを見抜き、言語と国境を越えて熱狂を生み出す3つの柱"
              : "Three pillars enabling true artistic appreciation combined with global commercial momentum."}
          </p>

          {/* Underline Bar in Yellow & Blue */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-16 h-2 bg-[#FED54A] border-2 border-black rounded-full" />
            <div className="w-8 h-2 bg-[#3B82F6] border-2 border-black rounded-full" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3 POP COMIC PANELS WITH ART & MANGA SPEECH BUBBLES             */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {data.strengths.map((strength, index) => {
            const art = pillarArt[index];

            return (
              <div
                key={strength.id}
                className="bg-white border-4 border-black rounded-3xl p-6 sm:p-7 pop-comic-panel flex flex-col justify-between relative group overflow-hidden transition-all hover:-translate-y-2"
              >
                {/* Ben-Day Dots Background Shading */}
                <div className="absolute inset-0 bg-pop-dots-black-soft opacity-15 pointer-events-none" />

                {/* Corner Manga Onomatopoeia Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#FED54A] border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] rotate-12 pointer-events-none select-none z-30">
                  <span className="text-xs font-black text-black">
                    {art.sfx}
                  </span>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Panel Artwork Inset Frame */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl border-3 border-black overflow-hidden shadow-[3px_3px_0px_#000] bg-black">
                    <Image
                      src={art.image}
                      alt={strength.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Frame Number Tag on Image */}
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/80 text-[#FED54A] border border-white/30 text-[10px] font-black tracking-widest">
                      PILLAR 0{index + 1}
                    </div>
                  </div>

                  {/* Manga Spiked Speaking Bubble */}
                  <div
                    className="p-3.5 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] relative"
                    style={{
                      backgroundColor: art.speechBg,
                      color: art.badgeText === "WHITE" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <p className="text-xs sm:text-sm font-black tracking-tight leading-snug">
                      {art.speechBubble}
                    </p>
                  </div>

                  {/* Japanese / English Tag */}
                  <div className="pt-1">
                    <span className="text-[11px] font-black text-black px-3 py-1 rounded-full bg-white border-2 border-black inline-block shadow-[1px_1px_0px_#000]">
                      {lang === "ja" ? strength.tag : strength.tagEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-black tracking-tight leading-snug">
                    {lang === "ja" ? strength.title : strength.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                    {lang === "ja" ? strength.description : strength.descriptionEn}
                  </p>

                  {/* Bullet points with Pop Checkmarks */}
                  <div className="pt-3 border-t-2 border-black/15 space-y-2.5">
                    {(lang === "ja" ? strength.points : strength.pointsEn).map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-black font-bold">
                        <span className="w-4 h-4 rounded-full bg-[#FED54A] border border-black text-black flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5 shadow-xs">
                          ✓
                        </span>
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Frame Footer */}
                <div className="mt-6 pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-black text-black/60 relative z-10">
                  <span>KODANSHA REEL</span>
                  <span className="text-[#3B82F6] font-black uppercase">FRAME 0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
