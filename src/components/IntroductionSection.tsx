"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Globe2, Quote, Award, Sparkles, Check, MessageSquare, Star, Zap, Heart } from "lucide-react";
import { PortfolioContent } from "@/data/portfolioData";

interface IntroductionSectionProps {
  data: PortfolioContent;
  lang: "ja" | "en";
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({ data, lang }) => {
  return (
    <section id="intro-section" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black overflow-hidden select-none">


      {/* Corner Crop Marks (トンボ) */}
      <div className="absolute top-3 left-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        ⌜ FRAME 02 • ABOUT CANDIDATE
      </div>
      <div className="absolute top-3 right-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        KODANSHA APPLICANT ⌝
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* ============================================================== */}
        {/* 2. TOP HERO BANNER: POP ART MANGA GIRL WITH GIANT SPIKED BUBBLE */}
        {/* Inspired directly by Reference Images (Lichtenstein / Pop Girl) */}
        {/* ============================================================== */}
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 pop-comic-panel relative overflow-hidden">
          
          {/* Ben-Day Dots Background in Card */}
          <div className="absolute inset-0 bg-pop-dots-blue-soft opacity-25 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-pop-dots-yellow opacity-40 pointer-events-none blur-2xs" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            
            {/* Applicant Heroine Hand-Drawn Illustration (Direct user reference) */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start relative">
              <div className="relative w-full max-w-[320px] aspect-square rounded-2xl border-4 border-black overflow-hidden shadow-[6px_6px_0px_#000] bg-[#FED54A] group">
                <Image
                  src="/images/applicant-heroine-drawing.png"
                  alt="Applicant Heroine - 吉川 実玖"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Comic Corner Badge */}
                <div className="absolute top-2 left-2 bg-[#FED54A] text-black border-2 border-black px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider shadow-xs">
                  APPLICANT HEROINE
                </div>

                {/* Manga Sound Effect Sticker */}
                <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#FED54A] border-2 border-black rounded-full shadow-[2px_2px_0px_#000] rotate-[-6deg] select-none z-20">
                  <span className="text-xs font-black text-black">
                    キラッ✨
                  </span>
                </div>
              </div>
            </div>

            {/* Giant Spiked Shout Speech Bubble (ウニフラ / 叫び吹き出し) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              
              {/* Spiked Speech Bubble Container */}
              <div className="relative bg-[#FED54A] text-black border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000] transition-transform hover:-translate-y-1">
                
                {/* Dialog Bubble Tail pointing left to the Pop Character (Like Image 2) */}
                <div className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FED54A] border-b-4 border-l-4 border-black rotate-45 z-20 pointer-events-none" />

                {/* Category Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-[#FED54A] text-xs font-black uppercase tracking-wider mb-3 shadow-[2px_2px_0px_#000]">
                  <Sparkles className="w-3.5 h-3.5 text-[#FED54A]" />
                  <span>{lang === "ja" ? "第2コマ • 志望ステートメント" : "FRAME 02 • CANDIDATE STATEMENT"}</span>
                </div>

                {/* Massive Bold Manga Dialogue */}
                <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black text-black tracking-tight leading-[1.25]">
                  {lang === "ja" ? (
                    <>
                      文学の眼で愛し、<br />
                      <span className="bg-white px-2 py-0.5 border-2 border-black rounded-md inline-block mt-1 shadow-[3px_3px_0px_#000]">
                        マーケティングの力
                      </span>
                      で届ける！
                    </>
                  ) : (
                    <>
                      Deciphering with a Literary Soul,<br />
                      <span className="bg-white px-2 py-0.5 border-2 border-black rounded-md inline-block mt-1 shadow-[3px_3px_0px_#000]">
                        Delivering with Strategic Marketing!
                      </span>
                    </>
                  )}
                </h2>

                <p className="mt-3 text-xs sm:text-sm font-bold text-black leading-relaxed">
                  {lang === "ja"
                    ? "日本文学で培った作品の解像度と、フランスで学んだ国際マーケティングの推進力。講談社のマンガの感動を世界中の読者へ届けるポートフォリオ。"
                    : "Bridging narrative depth with global strategic distribution — cultivating sustainable passion for manga worldwide."}
                </p>

                {/* Speaker Sign-off */}
                <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-black">
                  <span>講談社 採用応募者</span>
                  <span className="text-[#3B82F6] font-black underline decoration-2">
                    吉川 実玖（Miku Yoshikawa）
                  </span>
                </div>
              </div>

              {/* Manga Onomatopoeia Banner - Separated without overlapping */}
              <div className="flex items-center justify-end gap-6 sm:gap-10 pt-4 select-none whitespace-nowrap">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black pop-onomatope-yellow rotate-6 inline-block whitespace-nowrap leading-none">
                  バァァン！
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black pop-onomatope-blue -rotate-6 inline-block whitespace-nowrap leading-none">
                  ドドドド
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. TWO-COLUMN POP MANGA COMIC PANELS                           */}
        {/* Character Sheet & Whispering Manga Girl with Ben-Day Dots      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ------------------------------------------------------------ */}
          {/* LEFT COLUMN: Character Card & Whispering Thought Bubble     */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Pop Comic Profile Card */}
            <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-7 pop-comic-panel relative overflow-hidden">
              
              {/* Ben-Day Dots Shading */}
              <div className="absolute inset-0 bg-pop-dots-black-soft opacity-20 pointer-events-none" />

              {/* Corner Pop Yellow Badge */}
              <div className="absolute top-0 right-0 bg-[#FED54A] border-b-3 border-l-3 border-black px-4 py-1 text-xs font-black text-black rounded-bl-2xl shadow-xs">
                APPLICANT PROFILE
              </div>

              {/* Applicant Profile Avatar (Hand-drawn drawing) */}
              <div className="flex flex-col items-center text-center mt-3 mb-6 relative z-10">
                <div className="w-28 h-28 rounded-2xl bg-[#FED54A] p-1 border-4 border-black shadow-[4px_4px_0px_#000] mb-3 relative group overflow-hidden">
                  <Image
                    src="/images/applicant-heroine-drawing.png"
                    alt="Miku Yoshikawa Profile Avatar"
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-2xl font-black text-black tracking-tight">
                  {lang === "ja" ? data.meta.name : data.meta.nameEn}
                </h3>
                <p className="text-xs text-black font-extrabold px-3 py-1 rounded-full bg-[#FED54A] border-2 border-black mt-1 shadow-[2px_2px_0px_#000]">
                  {lang === "ja" ? "講談社 採用選考応募者" : "Kodansha Candidate"}
                </p>
              </div>

              {/* 3 Key Background Pillars in Pop Comic Speech Snippets (Image 2 Reference) */}
              <div className="space-y-3.5 text-xs relative z-10">
                {/* 1. Japanese Literature Pillar */}
                <div className="relative bg-white p-3.5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-start gap-3 rotate-[-0.75deg] hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-[#FED54A] border-2 border-black flex items-center justify-center shrink-0 text-black font-black shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-black text-black text-sm block">
                      {lang === "ja" ? "日本：日本文学 専攻" : "Japan: Japanese Literature"}
                    </span>
                    <span className="text-gray-800 text-[11px] font-bold leading-relaxed">
                      {lang === "ja"
                        ? "作家の心理描写、セリフの機微、物語の構造と文脈を徹底して読解"
                        : "Deep analysis of character psychology, dialogue subtext, and literary context"}
                    </span>
                  </div>
                </div>

                {/* 2. France Marketing Pillar */}
                <div className="relative bg-white p-3.5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-start gap-3 rotate-[0.75deg] hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-[#3B82F6] border-2 border-black flex items-center justify-center shrink-0 text-white font-black shadow-xs">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-black text-black text-sm block">
                      {lang === "ja" ? "フランス：国際マーケティング 留学" : "France: International Marketing"}
                    </span>
                    <span className="text-gray-800 text-[11px] font-bold leading-relaxed">
                      {lang === "ja"
                        ? "欧州のマンガ・BD市場分析、ファンコミュニティ形成、グローバル展開戦略"
                        : "European manga & BD market segmentation, branding, and global distribution"}
                    </span>
                  </div>
                </div>

                {/* 3. Favorite Work Pillar */}
                <div className="relative bg-[#FED54A]/25 p-3.5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-start gap-3 rotate-[-0.5deg] hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-[#FED54A] border-2 border-black flex items-center justify-center shrink-0 text-black font-black shadow-xs">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <span className="font-black text-black text-sm block">
                      {lang === "ja" ? "愛読作：『スキップとローファー』" : "Favorite: 'Skip and Loafer'"}
                    </span>
                    <span className="text-gray-800 text-[11px] font-bold leading-relaxed">
                      {lang === "ja"
                        ? "月刊アフタヌーン（講談社）連載。優しさと真摯さに魅了された作品"
                        : "Published by Kodansha (Monthly Afternoon). Deeply moved by its empathy and honesty."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pop Comic Speech Bubble Card for Candidate Motto (Shaped like Image 2) */}
            <div className="relative w-full max-w-[340px] mx-auto bg-[#FED54A] border-4 border-black rounded-3xl p-6 sm:p-7 shadow-[5px_5px_0px_#000] text-center group hover:-translate-y-1 transition-transform">
              {/* Ben-Day Dots Shading */}
              <div className="absolute inset-0 bg-pop-dots-black-soft opacity-15 pointer-events-none rounded-3xl" />
              {/* Speech Tail pointing up towards profile avatar (Like Image 2) */}
              <div className="absolute -top-2 left-10 w-4 h-4 bg-[#FED54A] border-t-4 border-l-4 border-black rotate-45 z-20 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="text-[10px] font-black text-black px-2.5 py-0.5 rounded-full bg-white border-2 border-black uppercase font-mono tracking-wider mb-2.5 shadow-xs">
                  ✦ CANDIDATE MOTTO ✦
                </span>
                <p className="text-xs sm:text-sm font-black text-black leading-snug">
                  {lang === "ja"
                    ? "「美津未のように一歩ずつ誠実に。作品の本質を誰よりも愛し、マーケティングの力で世界中の読者の心へ届けます。」"
                    : '"Taking honest steps forward like Mitsumi. Cherishing the essence of stories, and delivering them to readers worldwide with strategic marketing."'}
                </p>
                <span className="text-[10px] font-black text-black/70 font-mono mt-2 block">
                  吉川 実玖（Miku Yoshikawa）
                </span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT COLUMN: Pop Narrative Comic Panels                      */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pop Yellow Core Value Dynamic Comic Shout Box (Image 2 Reference) */}
            <div className="relative rotate-[-0.75deg] hover:rotate-0 transition-transform group">
              {/* Ben-Day Halftone Shadow Layer (Like Image 2) */}
              <div className="absolute -bottom-2 -right-2 inset-0 bg-pop-dots-black-dense opacity-20 rounded-3xl pointer-events-none -z-10" />

              <div className="bg-[#FED54A] border-4 border-black rounded-3xl p-6 sm:p-7 shadow-[6px_6px_0px_#000] relative overflow-hidden">
                <div className="absolute inset-0 bg-pop-dots-black-soft opacity-15 pointer-events-none" />
                
                {/* Comic Speech Bubble Tail pointing left toward candidate profile (Like Image 2) */}
                <div className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FED54A] border-b-4 border-l-4 border-black rotate-45 z-20 pointer-events-none" />

                {/* Floating Comic Stars from Image 2 */}
                <div className="absolute top-2 right-3 flex items-center gap-1 select-none pointer-events-none">
                  <span className="text-base text-black font-black">★</span>
                  <span className="text-xs text-white font-black drop-shadow-[1px_1px_0px_#000]">✦</span>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider mb-2.5 bg-black border-2 border-black px-3.5 py-1 rounded-full inline-flex shadow-[2px_2px_0px_#000]">
                    <Sparkles className="w-3.5 h-3.5 text-[#FED54A]" />
                    <span>{lang === "ja" ? "私のコア・バリュー" : "Core Value Proposition"}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-black leading-snug drop-shadow-xs">
                    {lang === "ja" ? data.introduction.catchphrase : data.introduction.catchphraseEn}
                  </h3>
                </div>

                {/* Mini Comic Exclamation from Image 2 */}
                <div className="absolute bottom-2 right-3 select-none pointer-events-none rotate-12">
                  <span className="text-2xl font-black pop-onomatope-yellow">
                    ！
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Manga Speech Balloons (Different Fun Comic Shapes from Image 2) */}
            <div className="space-y-5 text-sm sm:text-base text-black leading-relaxed">
              {/* Bubble 01: Classic Comic Speech Balloon with Pointed Tail */}
              <div className="relative rotate-[-0.5deg] hover:rotate-0 transition-transform group">
                <div className="absolute -bottom-2 -right-2 inset-0 bg-pop-dots-black-dense opacity-20 rounded-3xl pointer-events-none -z-10" />

                <div className="p-5 sm:p-6 bg-white rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000] relative flex items-start gap-4">
                  {/* Comic Speech Tail pointing left toward Miku (Like Image 2) */}
                  <div className="hidden lg:block absolute -left-2 top-8 w-4 h-4 bg-white border-b-4 border-l-4 border-black rotate-45 z-20 pointer-events-none" />

                  <span className="w-10 h-10 rounded-2xl bg-[#3B82F6] border-2 border-black font-black text-white text-sm flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] rotate-[-3deg]">
                    01
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#3B82F6] tracking-wider block font-mono">
                      FRAME 01 • LITERARY INSIGHT
                    </span>
                    <p className="font-bold text-gray-900 leading-relaxed">
                      {(lang === "ja" ? data.introduction.bioParagraphs : data.introduction.bioParagraphsEn)[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble 02: Dynamic Comic Balloon with Lightning / Zig-Zag Tail (From Image 2) */}
              <div className="relative rotate-[0.5deg] hover:rotate-0 transition-transform group">
                <div className="absolute -bottom-2 -right-2 inset-0 bg-pop-dots-black-dense opacity-20 rounded-3xl pointer-events-none -z-10" />

                <div className="p-5 sm:p-6 bg-white rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000] relative flex items-start gap-4">
                  {/* Comic Speech Tail pointing left toward Miku (Like Image 2) */}
                  <div className="hidden lg:block absolute -left-2 top-8 w-4 h-4 bg-white border-b-4 border-l-4 border-black rotate-45 z-20 pointer-events-none" />

                  {/* Comic Lightning Accent in corner */}
                  <div className="absolute top-2 right-3 select-none pointer-events-none">
                    <span className="text-base font-black text-[#FED54A] drop-shadow-[1px_1px_0px_#000]">⚡</span>
                  </div>

                  <span className="w-10 h-10 rounded-2xl bg-[#FED54A] border-2 border-black font-black text-black text-sm flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] rotate-[3deg]">
                    02
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-black/70 tracking-wider block font-mono">
                      FRAME 02 • GLOBAL MARKETING
                    </span>
                    <p className="font-bold text-gray-900 leading-relaxed">
                      {(lang === "ja" ? data.introduction.bioParagraphs : data.introduction.bioParagraphsEn)[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble 03: Energetic Shout / Starburst Comic Balloon with Action Stars (From Image 2) */}
              <div className="relative rotate-[-0.5deg] hover:rotate-0 transition-transform group">
                <div className="absolute -bottom-2 -right-2 inset-0 bg-pop-dots-black-dense opacity-20 rounded-3xl pointer-events-none -z-10" />

                <div className="p-5 sm:p-6 bg-white rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000] relative flex items-start gap-4">
                  {/* Comic Speech Tail pointing left toward Miku (Like Image 2) */}
                  <div className="hidden lg:block absolute -left-2 top-8 w-4 h-4 bg-white border-b-4 border-l-4 border-black rotate-45 z-20 pointer-events-none" />

                  {/* Comic Star Sticker from Image 2 */}
                  <div className="absolute top-2 right-3 flex items-center gap-1 select-none pointer-events-none">
                    <span className="text-sm font-black text-[#3B82F6] drop-shadow-[1px_1px_0px_#000]">★</span>
                    <span className="text-xs font-black text-[#FED54A] drop-shadow-[1px_1px_0px_#000]">✦</span>
                  </div>

                  <span className="w-10 h-10 rounded-2xl bg-[#3B82F6] border-2 border-black font-black text-white text-sm flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] rotate-[-2deg]">
                    03
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#3B82F6] tracking-wider block font-mono">
                      FRAME 03 • VISION & SYNERGY
                    </span>
                    <p className="font-bold text-gray-900 leading-relaxed">
                      {(lang === "ja" ? data.introduction.bioParagraphs : data.introduction.bioParagraphsEn)[2]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Advantages Box with Pop Checkmarks */}
            <div className="bg-white border-4 border-black rounded-3xl p-6 pop-comic-panel space-y-4">
              <h4 className="text-base font-black text-black flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] border-2 border-black" />
                {lang === "ja"
                  ? "なぜこの経歴がマンガ出版ビジネスで活きるのか？"
                  : "Why this background is uniquely suited for Manga Publishing:"}
              </h4>
              
              <ul className="space-y-3 text-xs sm:text-sm text-black">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border-2 border-black">
                  <span className="w-6 h-6 rounded-full bg-[#FED54A] border-2 border-black text-black flex items-center justify-center shrink-0 font-black text-xs mt-0.5 shadow-[1px_1px_0px_#000]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="font-bold pt-0.5">
                    {lang === "ja"
                      ? "作家や編集者が注ぎ込んだ「作品の魂」を毀損することなく、海外向けに最適な文脈で届けることができる。"
                      : "Preserving the creative soul poured into each title by authors and editors, while translating it into optimal global contexts."}
                  </span>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border-2 border-black">
                  <span className="w-6 h-6 rounded-full bg-[#FED54A] border-2 border-black text-black flex items-center justify-center shrink-0 font-black text-xs mt-0.5 shadow-[1px_1px_0px_#000]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="font-bold pt-0.5">
                    {lang === "ja"
                      ? "フランスなどの成熟した海外市場のリアルな読者行動・カルチャーを肌感覚として持っている。"
                      : "Firsthand understanding of mature European readerships, fan behaviors, and cultural dynamics in France and beyond."}
                  </span>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border-2 border-black">
                  <span className="w-6 h-6 rounded-full bg-[#FED54A] border-2 border-black text-black flex items-center justify-center shrink-0 font-black text-xs mt-0.5 shadow-[1px_1px_0px_#000]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="font-bold pt-0.5">
                    {lang === "ja"
                      ? "単なる数字のマーケティングではなく、「感動の総量」を最大化する持続的なファンビジネスを設計できる。"
                      : "Moving beyond dry spreadsheets to design sustainable fan businesses that maximize genuine emotional resonance."}
                  </span>
                </li>
              </ul>
            </div>

            {/* Featured Pop Manga Design Panel: Portfolio & Manga Making Note (Image Reference) */}
            <div className="bg-[#10B981]/10 border-4 border-black rounded-3xl p-5 sm:p-6 pop-comic-panel relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center relative z-10">
                <div className="sm:col-span-5 relative">
                  <div className="relative w-full aspect-[16/9] sm:aspect-square rounded-2xl border-3 border-black overflow-hidden shadow-[4px_4px_0px_#000] bg-white group">
                    <Image
                      src="/images/pop-manga/pop-making-green-panel.png"
                      alt="自分の漫画を自分でデザインしたメイキング"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-black text-[#FED54A] px-2 py-0.5 rounded text-[9px] font-black uppercase shadow-xs">
                      MAKING NOTE
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-7 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981] text-white border-2 border-black text-[10px] font-black uppercase shadow-xs">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>{lang === "ja" ? "制作のこだわり • メイキング" : "DESIGN & MAKING INSIGHT"}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-black leading-snug">
                    {lang === "ja"
                      ? "「自分の漫画を自分でデザインしたメイキング」"
                      : "“Designing My Own Manga Portfolio Narrative Myself”"}
                  </h4>
                  <p className="text-xs font-bold text-gray-800 leading-relaxed">
                    {lang === "ja"
                      ? "既成のテンプレートに頼らず、原稿用紙のトンボ・コマ割り・オノマトペから色彩設計（黒・白・黄・青）まで、マンガの文法そのものを自身の表現としてデザインしました。"
                      : "Crafted directly with authentic manga framing, crop marks, screentone patterns, and pop-art energy to reflect deep love for the publishing medium."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
