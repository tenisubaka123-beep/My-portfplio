"use client";

import React from "react";
import Image from "next/image";
import { Target, Flag, Rocket, CheckCircle2, Sparkles, ArrowRight, Zap, Trophy } from "lucide-react";
import { PortfolioContent } from "@/data/portfolioData";

interface VisionSectionProps {
  data: PortfolioContent;
  lang: "ja" | "en";
}

export const VisionSection: React.FC<VisionSectionProps> = ({ data, lang }) => {
  const roadmapFrames = [
    {
      step: "01",
      timeframe: lang === "ja" ? "1年目" : "Year 1",
      role: lang === "ja" ? "編集・作品の魂の学習" : "Editorial Foundations & Immersion",
      badgeColor: "#FED54A",
      textColor: "text-black",
      speechBubble: lang === "ja" ? "「現場主義で、作品の魂を全身でインプット！」" : "“Absorbing the authentic soul of creation on the editorial frontlines!”",
      sfx: "ドドンッ！",
      sfxColor: "pop-onomatope-yellow",
      details: lang === "ja"
        ? "編集現場とマーケティングの最前線に入り、作家様・クリエイターの熱量と読者の温度感を徹底的に体得。作品が生まれる痛快な瞬間を支える基礎力を固めます。"
        : "Immerse in the editorial room and marketing frontlines, learning the creator's passion and reader sentiment deeply.",
    },
    {
      step: "02",
      timeframe: lang === "ja" ? "3年目" : "Year 3",
      role: lang === "ja" ? "欧州・国際マーケティング推進" : "European & Global Marketing Expansion",
      badgeColor: "#3B82F6",
      textColor: "text-white",
      speechBubble: lang === "ja" ? "「フランス・欧州市場へ、熱狂の起爆剤を投下！」" : "“Igniting passionate manga communities across Europe & France!”",
      sfx: "ズババッ！",
      sfxColor: "pop-onomatope-blue",
      details: lang === "ja"
        ? "フランス留学で培った知見と現地ネットワークをフル稼働。アングレーム国際漫画祭やJapan Expo等とも連携し、現地ファンの心に突き刺さるプロモーションを展開します。"
        : "Leverage European insights & networks to spearhead targeted campaigns at Angoulême, Japan Expo, and global bookstores.",
    },
    {
      step: "03",
      timeframe: lang === "ja" ? "5年目" : "Year 5",
      role: lang === "ja" ? "グローバルIP戦略の牽引" : "Leading Global IP Ecosystems",
      badgeColor: "#FED54A",
      textColor: "text-black",
      speechBubble: lang === "ja" ? "「世界の読者に、一生モノの感動と人生の指標を届ける！」" : "“Delivering lifelong masterpieces to audiences worldwide!”",
      sfx: "ドォォォン!!",
      sfxColor: "pop-onomatope-yellow",
      details: lang === "ja"
        ? "国境や言語の壁を軽やかに越え、紙・電子・アニメ・グッズが連動する持続的なグローバルIPエコシステムをプロデュース。講談社マンガの世界的プレゼンスを不動のものにします。"
        : "Lead unified global IP franchises spanning print, digital, anime, and cross-border fan ecosystems for Kodansha.",
    },
  ];

  return (
    <section id="vision-section" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black overflow-hidden select-none">


      {/* Manuscript Registration Corner Marks (トンボ) */}
      <div className="absolute top-3 left-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        ⌜ FRAME 05 • FUTURE ROADMAP
      </div>
      <div className="absolute top-3 right-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        KODANSHA CAREER VISION ⌝
      </div>
      <div className="absolute bottom-3 left-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        ⌞ APPLICANT DEDICATION
      </div>
      <div className="absolute bottom-3 right-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        PAGE 05 ⌟
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
                ゴーッ!!
              </span>
            </div>

            {/* Spiked Shout Style Chapter Tag in Pop Yellow */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FED54A] border-3 border-black text-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000] transform rotate-1 pointer-events-auto shrink-0">
              <span className="bg-black text-[#FED54A] px-2.5 py-0.5 rounded text-[11px] font-black">
                最終コマ
              </span>
              <Target className="w-3.5 h-3.5 text-black" />
              <span>{lang === "ja" ? "未来へのロードマップ" : "Future Roadmap"}</span>
            </div>

            <div className="transform rotate-12 whitespace-nowrap">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black pop-onomatope-yellow inline-block whitespace-nowrap leading-none">
                パァァァ!!
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-black tracking-tight drop-shadow-xs">
            {lang === "ja" ? data.vision.title : data.vision.titleEn}
          </h2>

          <p className="text-xs sm:text-sm text-gray-800 font-bold mt-3 max-w-xl mx-auto leading-relaxed">
            {lang === "ja"
              ? "文学の眼で作品を深く尊び、マーケティングの推進力で世界中の読者へ。講談社で歩む確かな3段階の挑戦。"
              : "Step by step, contributing reliably to the publishing house's creative & commercial growth."}
          </p>

          {/* Underline Bar in Yellow & Blue */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-16 h-2 bg-[#FED54A] border-2 border-black rounded-full" />
            <div className="w-8 h-2 bg-[#3B82F6] border-2 border-black rounded-full" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* HERO CHARACTER RESOLVE BANNER (Pop Manga Character + Spikes)   */}
        {/* ============================================================== */}
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 pop-comic-panel relative overflow-hidden">
          {/* Ben-Day Dots Background */}
          <div className="absolute inset-0 bg-pop-dots-yellow opacity-35 pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-pop-dots-blue opacity-35 pointer-events-none blur-2xs" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            
            {/* Pop Art Comic Character */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[240px] aspect-square rounded-2xl border-4 border-black overflow-hidden shadow-[6px_6px_0px_#000] bg-[#FED54A] group">
                <Image
                  src="/images/applicant-heroine-drawing.png"
                  alt="吉川 実玖 - 決意のヒロイン (Applicant Heroine)"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-2 left-2 bg-black text-[#FED54A] px-2.5 py-0.5 rounded text-[10px] font-black uppercase">
                  DETERMINATION
                </div>

                <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#FED54A] border-2 border-black rounded-full shadow-[2px_2px_0px_#000] rotate-[-6deg] select-none z-20">
                  <span className="text-xs font-black text-black">
                    全力!!
                  </span>
                </div>
              </div>
            </div>

            {/* Spiked Dialogue Bubble with Tail */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-3">
              <div className="relative bg-[#FED54A] text-black border-4 border-black rounded-3xl p-6 sm:p-7 shadow-[6px_6px_0px_#000]">
                {/* Dialogue Tail pointing left (Like Image 2) */}
                <div className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FED54A] border-b-4 border-l-4 border-black rotate-45 z-20 pointer-events-none" />

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-[#FED54A] text-xs font-black uppercase tracking-wider mb-2.5 shadow-[2px_2px_0px_#000]">
                  <Trophy className="w-3.5 h-3.5 text-[#FED54A]" />
                  <span>{lang === "ja" ? "候補者の決意表明" : "APPLICANT COMMITMENT"}</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black leading-snug">
                  {lang === "ja" ? (
                    <>
                      「作品の魂」を誰よりも信じ、<br />
                      <span className="bg-white px-2 py-0.5 border-2 border-black rounded-md inline-block mt-1 shadow-[3px_3px_0px_#000]">
                        世界へ羽ばたく翼
                      </span>
                      になります！
                    </>
                  ) : (
                    "Believing in the creator's soul and becoming the wings that carry it across the globe!"
                  )}
                </h3>

                <p className="mt-3 text-xs sm:text-sm font-bold text-black leading-relaxed">
                  {lang === "ja"
                    ? "文学で鍛えた読解力で作家様の創造性に最大限のリスペクトを払い、フランスで培ったマーケティング感覚で世界各地のファンコミュニティを育成します。講談社の一員として、世界中の読者の人生に寄り添う作品群を届け続けることを誓います。"
                    : "Respecting creative autonomy while leveraging European marketing acumen to foster passionate global communities."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3-FRAME MANGA STORYBOARD SEQUENCE                              */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {roadmapFrames.map((frame, idx) => (
            <div
              key={frame.step}
              className="bg-white border-4 border-black rounded-3xl p-6 sm:p-7 pop-comic-panel relative flex flex-col justify-between hover:-translate-y-2 transition-transform shadow-[6px_6px_0px_#000] group"
            >
              {/* Ben-Day Dots Background */}
              <div className="absolute inset-0 bg-pop-dots-black-soft opacity-15 pointer-events-none" />

              <div>
                {/* Frame Header with Number & SFX */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-xl border-3 border-black flex items-center justify-center font-black text-lg shadow-[3px_3px_0px_#000]"
                      style={{ backgroundColor: frame.badgeColor, color: frame.badgeColor === "#FED54A" ? "#000000" : "#FFFFFF" }}
                    >
                      {frame.step}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-black/60 uppercase block font-mono">
                        TIMEFRAME
                      </span>
                      <span className="text-xs font-black text-black bg-gray-100 px-2 py-0.5 rounded border border-black">
                        {frame.timeframe}
                      </span>
                    </div>
                  </div>

                  <span className={`text-xl font-black ${frame.sfxColor} rotate-6 select-none`}>
                    {frame.sfx}
                  </span>
                </div>

                {/* Spiked / Comic Speech Bubble in Card */}
                <div
                  className="p-3.5 rounded-2xl border-2 border-black mb-4 relative z-10 shadow-[3px_3px_0px_#000]"
                  style={{
                    backgroundColor: frame.badgeColor === "#FED54A" ? "#FED54A" : "#3B82F6",
                    color: frame.badgeColor === "#FED54A" ? "#000000" : "#FFFFFF",
                  }}
                >
                  <p className="text-xs sm:text-sm font-black leading-snug">
                    {frame.speechBubble}
                  </p>
                </div>

                {/* Milestone Title */}
                <h4 className="text-base sm:text-lg font-black text-black leading-snug mb-2 relative z-10">
                  {frame.role}
                </h4>

                {/* Body Details */}
                <p className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed relative z-10">
                  {frame.details}
                </p>
              </div>

              {/* Bottom Frame Stamp */}
              <div className="mt-5 pt-3 border-t-2 border-black/15 flex items-center justify-between text-[11px] font-black text-black/60 relative z-10 font-mono">
                <span>ROADMAP FRAME {frame.step}</span>
                <span className="text-[#3B82F6] font-black">KODANSHA GOAL →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
