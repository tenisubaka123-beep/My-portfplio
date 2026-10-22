"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Sparkles, BookOpen, Lightbulb, Users, Bookmark, ChevronRight, MessageSquareQuote, Star } from "lucide-react";
import { PortfolioContent } from "@/data/portfolioData";

interface SkipAndLoaferSectionProps {
  data: PortfolioContent;
  lang: "ja" | "en";
}

export const SkipAndLoaferSection: React.FC<SkipAndLoaferSectionProps> = ({ data, lang }) => {
  const [selectedTab, setSelectedTab] = useState<"analysis" | "marketing">("analysis");
  const [selectedMangaPage, setSelectedMangaPage] = useState(0);

  const mangaPages = [
    {
      title: "第1巻 表紙",
      titleEn: "Vol. 1 Cover",
      tag: "VOLUME 01",
      src: "/images/skip-and-loafer-cover.png",
      caption: "美津未と志摩くんの出逢いと始まり",
    },
    {
      title: "第7巻 表紙",
      titleEn: "Vol. 7 Cover",
      tag: "VOLUME 07",
      src: "/images/skip-and-loafer-vol7.png",
      caption: "等身大の悩みと友情・修学旅行の成長",
    },
    {
      title: "第8巻 表紙",
      titleEn: "Vol. 8 Cover",
      tag: "VOLUME 08",
      src: "/images/skip-and-loafer-vol8.png",
      caption: "雨の日の相合傘・心情の機微と深まる絆",
    },
    {
      title: "文学詩の引用",
      titleEn: "Toson Poetry Scene",
      tag: "LITERARY MOTIF",
      src: "/images/skip-manga/page-apple.png",
      caption: "「まだあげ初めし前髪の 林檎のもとに見えしとき」文学的引用の鮮やかさ",
    },
    {
      title: "54話 着物と機微",
      titleEn: "Ch. 54 Kimono",
      tag: "SCENE 54",
      src: "/images/skip-manga/page-kimono.png",
      caption: "「人の好意に敏感な男」繊細な心理変化の巧みな描写",
    },
    {
      title: "71話 青春群像",
      titleEn: "Ch. 71 Ensemble",
      tag: "SCENE 71",
      src: "/images/skip-manga/page-school.png",
      caption: "登場人物たちの等身大の悩みと友情のリアリティ",
    },
  ];

  return (
    <section id="skip-section" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black overflow-hidden select-none">
      {/* Manuscript Registration Corner Marks (トンボ) */}
      <div className="absolute top-3 left-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        ⌜ FRAME 04 • SKIP & LOAFER ANALYSIS
      </div>
      <div className="absolute top-3 right-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        MONTHLY AFTERNOON ⌝
      </div>
      <div className="absolute bottom-3 left-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        ⌞ FAVORITE TITLE CASE STUDY
      </div>
      <div className="absolute bottom-3 right-4 text-black/40 text-[11px] font-mono select-none pointer-events-none">
        PAGE 04 ⌟
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* ============================================================== */}
        {/* TOP HEADER: Pop Manga Chapter Tag & Title                      */}
        {/* ============================================================== */}
        <div className="text-center relative">
          
          {/* Top Manga SFX Row: Completely apart from title & separated from each other */}
          <div className="flex items-center justify-between max-w-4xl mx-auto px-2 sm:px-6 mb-5 select-none pointer-events-none whitespace-nowrap">
            <div className="transform -rotate-12 whitespace-nowrap">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black pop-onomatope-blue inline-block whitespace-nowrap leading-none">
                ドキッ
              </span>
            </div>

            {/* Spiked Shout Style Chapter Tag in Pop Yellow */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FED54A] border-3 border-black text-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000] transform -rotate-1 pointer-events-auto shrink-0">
              <span className="bg-black text-[#FED54A] px-2.5 py-0.5 rounded text-[11px] font-black">
                第4コマ
              </span>
              <Heart className="w-3.5 h-3.5 fill-black text-black" />
              <span>{lang === "ja" ? "愛読作 ＆ 出版社への敬意" : "Favorite Title & Publisher Tribute"}</span>
            </div>

            <div className="transform rotate-12 whitespace-nowrap">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black pop-onomatope-yellow inline-block whitespace-nowrap leading-none">
                キュンッ
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-black tracking-tight drop-shadow-xs">
            {lang === "ja" ? data.skipAndLoafer.workTitle : "Deep Love for 'Skip and Loafer'"}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3 text-xs font-black text-black">
            <span className="px-3.5 py-1 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
              {data.skipAndLoafer.magazine}
            </span>
            <span className="px-3.5 py-1 rounded-xl bg-[#FED54A] border-2 border-black shadow-[2px_2px_0px_#000]">
              {data.skipAndLoafer.author}
            </span>
            <span className="px-3.5 py-1 rounded-xl bg-[#3B82F6] text-white border-2 border-black shadow-[2px_2px_0px_#000]">
              {lang === "ja" ? "月刊アフタヌーン連載中" : "Monthly Afternoon"}
            </span>
          </div>

          {/* Underline Bar in Yellow & Blue */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-16 h-2 bg-[#FED54A] border-2 border-black rounded-full" />
            <div className="w-8 h-2 bg-[#3B82F6] border-2 border-black rounded-full" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* POP MANGA CHARACTER DIALOGUE BANNER (Featuring Actual Pages)    */}
        {/* ============================================================== */}
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 pop-comic-panel relative overflow-hidden">
          {/* Ben-Day Dots Shading */}
          <div className="absolute inset-0 bg-pop-dots-blue-soft opacity-20 pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* TOP ROW: Left = Selected Manga Page & Thumbnails, Right = Featured Volume 7 & Volume 8 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Left Column (5 cols): Main Interactive Page Display */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[280px] aspect-[3/4.3] rounded-2xl border-4 border-black overflow-hidden shadow-[6px_6px_0px_#000] bg-white group">
                  <Image
                    src={mangaPages[selectedMangaPage].src}
                    alt={mangaPages[selectedMangaPage].title}
                    fill
                    className="object-contain p-1 group-hover:scale-102 transition-transform duration-300"
                  />
                  
                  {/* Comic Badge */}
                  <div className="absolute top-2 left-2 bg-[#FED54A] text-black border-2 border-black px-2.5 py-0.5 rounded text-[10px] font-black uppercase shadow-xs">
                    {mangaPages[selectedMangaPage].tag}
                  </div>

                  {/* Corner Comic Stamp Badge */}
                  <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#FED54A] border-2 border-black rounded-full shadow-[2px_2px_0px_#000] rotate-6 select-none z-20">
                    <span className="text-[11px] font-black text-black">
                      名場面!!
                    </span>
                  </div>
                </div>

                {/* Thumbnail Selector buttons */}
                <div className="grid grid-cols-3 gap-1.5 mt-3 w-full max-w-[320px]">
                  {mangaPages.map((pg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMangaPage(idx)}
                      className={`px-2 py-1.5 rounded-lg border-2 border-black text-[10px] font-black transition-all cursor-pointer truncate ${
                        selectedMangaPage === idx
                          ? "bg-[#FED54A] text-black shadow-[2px_2px_0px_#000]"
                          : "bg-white text-black hover:bg-gray-100"
                      }`}
                    >
                      {pg.title}
                    </button>
                  ))}
                </div>

                <p className="text-[11px] font-black text-black/70 mt-2 font-mono text-center">
                  {mangaPages[selectedMangaPage].caption}
                </p>
              </div>

              {/* Right Column (7 cols): FILLING THE EMPTY RIGHT SIDE WITH ANOTHER VOLUMES (Vol 7 & Vol 8) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                <div className="bg-[#FAF9F5] border-3 border-black rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#000] space-y-4">
                  {/* Header Tag */}
                  <div className="flex items-center justify-between pb-2 border-b-2 border-black/15">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-black text-[#FED54A] text-[10px] font-black uppercase tracking-wider">
                        ANOTHER VOLUMES
                      </span>
                      <span className="text-xs sm:text-sm font-black text-black">
                        {lang === "ja" ? "愛読巻コレクション（第7巻・第8巻）" : "Cherished Volume Highlights (Vol. 7 & 8)"}
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#3B82F6] font-mono hidden sm:inline">
                      KODANSHA AFTERNOON
                    </span>
                  </div>

                  {/* 2-Volume Side-by-Side Display */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Volume 7 Card */}
                    <div 
                      onClick={() => setSelectedMangaPage(1)}
                      className="group cursor-pointer bg-white border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_#000] hover:-translate-y-1 transition-all flex flex-col items-center text-center"
                    >
                      <div className="relative w-full aspect-[3/4.3] rounded-lg border-2 border-black overflow-hidden mb-2 bg-[#FED54A]/10">
                        <Image
                          src="/images/skip-and-loafer-vol7.png"
                          alt="スキップとローファー 第7巻"
                          fill
                          className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-1 left-1 bg-[#FED54A] text-black border border-black px-1.5 py-0.2 rounded text-[9px] font-black">
                          VOL. 07
                        </div>
                      </div>
                      <span className="text-xs font-black text-black block truncate w-full">
                        {lang === "ja" ? "第7巻：成長と友情" : "Vol. 7: Growth"}
                      </span>
                      <span className="text-[10px] text-gray-700 font-bold leading-tight mt-0.5 line-clamp-2">
                        {lang === "ja" ? "修学旅行編・等身大の悩みと温もり" : "Field trip arc: Relatable teenage emotions"}
                      </span>
                      <button className="mt-2 text-[10px] font-black px-2 py-0.5 rounded bg-[#FED54A] border border-black shadow-xs group-hover:bg-black group-hover:text-[#FED54A] transition-colors">
                        {lang === "ja" ? "プレビュー表示 →" : "View Cover →"}
                      </button>
                    </div>

                    {/* Volume 8 Card */}
                    <div 
                      onClick={() => setSelectedMangaPage(2)}
                      className="group cursor-pointer bg-white border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_#000] hover:-translate-y-1 transition-all flex flex-col items-center text-center"
                    >
                      <div className="relative w-full aspect-[3/4.3] rounded-lg border-2 border-black overflow-hidden mb-2 bg-[#3B82F6]/10">
                        <Image
                          src="/images/skip-and-loafer-vol8.png"
                          alt="スキップとローファー 第8巻"
                          fill
                          className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-1 left-1 bg-[#3B82F6] text-white border border-black px-1.5 py-0.2 rounded text-[9px] font-black">
                          VOL. 08
                        </div>
                      </div>
                      <span className="text-xs font-black text-black block truncate w-full">
                        {lang === "ja" ? "第8巻：優しさと絆" : "Vol. 8: Deep Bond"}
                      </span>
                      <span className="text-[10px] text-gray-700 font-bold leading-tight mt-0.5 line-clamp-2">
                        {lang === "ja" ? "雨の日の相合傘・言葉を超えた機微" : "Under the red umbrella: Pure emotional subtlety"}
                      </span>
                      <button className="mt-2 text-[10px] font-black px-2 py-0.5 rounded bg-[#3B82F6] text-white border border-black shadow-xs group-hover:bg-black group-hover:text-white transition-colors">
                        {lang === "ja" ? "プレビュー表示 →" : "View Cover →"}
                      </button>
                    </div>
                  </div>

                  {/* Volume Editorial Reader Note */}
                  <div className="p-3 bg-white rounded-xl border-2 border-black flex items-center justify-between gap-3 text-xs overflow-hidden relative">
                    <p className="font-bold text-gray-900 text-[11px] leading-relaxed">
                      {lang === "ja"
                        ? "どの巻を切り取っても、高松美咲先生の繊細な心理描写と温かな眼差しが溢れており、世界中で愛される普遍的な価値を持っています。"
                        : "Every single volume showcases the empathetic warmth and psychological nuance that makes Kodansha manga universally beloved."}
                    </p>
                    <div className="shrink-0 px-3 py-1.5 bg-[#FED54A] border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] rotate-[-3deg] flex items-center justify-center">
                      <span className="text-[11px] font-black text-black">
                        名作✨
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM ROW: Speech Bubbles */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-8">
                {/* Spiked Shout Speech Bubble (ウニフラ / 黄色メイン) */}
                <div className="relative bg-[#FED54A] text-black border-4 border-black rounded-3xl p-6 sm:p-7 shadow-[6px_6px_0px_#000]">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-[#FED54A] text-xs font-black uppercase tracking-wider mb-2.5 shadow-[2px_2px_0px_#000]">
                    <Sparkles className="w-3.5 h-3.5 text-[#FED54A]" />
                    <span>{lang === "ja" ? "情熱の叫び • 作品へのラブレター" : "PASSIONATE TRIBUTE"}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black leading-snug">
                    {lang === "ja" ? (
                      <>
                        誰も悪者にしない優しさと、<br />
                        <span className="bg-white px-2 py-0.5 border-2 border-black rounded-md inline-block mt-1 shadow-[3px_3px_0px_#000]">
                          青春の痛快なリアリティ
                        </span>
                        が世界を救う！
                      </>
                    ) : (
                      "Nuanced emotional realism & radiant sincerity that resonate across borders."
                    )}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm font-bold text-black leading-relaxed">
                    {lang === "ja"
                      ? "日本文学を専攻し言葉の機微を追究してきたからこそ、高松美咲先生が描く登場人物たちの「繊細な心理変化」と「日常の微細な救い」に圧倒されました。この真実味こそ、文化圏を問わず全人類の胸を打つ力を持っています。"
                      : "The literary depth of subtle psychological nuance makes this masterpiece universal — capable of touching readers in France, Europe, and all over the world."}
                  </p>
                </div>
              </div>

              {/* Pop Blue Cloud Thought Bubble (思考吹き出し / サブブルー) */}
              <div className="lg:col-span-4">
                <div className="relative bg-[#3B82F6] text-white border-4 border-black rounded-2xl p-5 shadow-[5px_5px_0px_#000] flex flex-col justify-between gap-3 h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border-2 border-black text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                      <MessageSquareQuote className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-yellow-300 block">
                        {lang === "ja" ? "【フランス留学時のリアルな実感】" : "【INSIGHT FROM FRANCE】"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-white leading-relaxed">
                    {lang === "ja"
                      ? "「現地の学生や書店員と話す中で、日本の等身大の学園心理描写が今もっとも求められていると確信しました」"
                      : "French manga readers crave authentic, non-stereotypical emotional maturity."}
                  </p>
                  <div className="flex justify-end">
                    <span className="text-xl font-black pop-onomatope-yellow rotate-6">
                      ジーン…
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE TABS: Literary Analysis vs. Global Marketing       */}
        {/* ============================================================== */}
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 pop-comic-panel relative overflow-hidden">
          
          {/* Ben-Day Dots Background */}
          <div className="absolute inset-0 bg-pop-dots-black-soft opacity-15 pointer-events-none" />

          {/* Switcher Buttons in Pop Yellow & Pop Blue */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-3 border-black relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#FED54A] border-2 border-black" />
              <span className="text-sm font-black text-black uppercase tracking-wider">
                {lang === "ja" ? "分析切り替え" : "SELECT PERSPECTIVE"}
              </span>
            </div>

            <div className="flex bg-gray-100 p-1.5 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] text-xs font-black">
              <button
                onClick={() => setSelectedTab("analysis")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all cursor-pointer font-black flex items-center gap-2 ${
                  selectedTab === "analysis"
                    ? "bg-[#FED54A] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
                    : "text-black hover:bg-white"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === "ja" ? "文学的読解・作品の魅力" : "Literary Analysis"}</span>
              </button>
              <button
                onClick={() => setSelectedTab("marketing")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all cursor-pointer font-black flex items-center gap-2 ${
                  selectedTab === "marketing"
                    ? "bg-[#3B82F6] text-white border-2 border-black shadow-[2px_2px_0px_#000]"
                    : "text-black hover:bg-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === "ja" ? "海外マーケティング提案" : "Global Marketing Pitch"}</span>
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TAB 1: Literary Nuance                                        */}
          {/* ============================================================ */}
          {selectedTab === "analysis" && (
            <div className="pt-6 space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.skipAndLoafer.lovePoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 sm:p-6 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] flex flex-col justify-between hover:-translate-y-1 transition-transform relative group"
                  >
                    {/* Comic Panel Header */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-[#FED54A] border-2 border-black text-black font-black text-xs flex items-center justify-center shadow-[2px_2px_0px_#000]">
                            0{idx + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-black text-white text-[10px] font-black uppercase">
                            LITERARY POINT
                          </span>
                        </div>
                        <span className="text-lg font-black pop-onomatope-yellow opacity-75">
                          {idx === 0 ? "ズバッ" : "キュン"}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-black text-black leading-snug">
                        {lang === "ja" ? point.headline : point.headlineEn}
                      </h4>

                      <p className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed pt-2">
                        {lang === "ja" ? point.body : point.bodyEn}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-black text-black/60">
                      <span>MONTHLY AFTERNOON APPRECIATION</span>
                      <span className="text-[#3B82F6] font-black">POINT 0{idx + 1} ★</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Character Ensemble Callout */}
              <div className="p-5 bg-[#FED54A] rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-black text-black flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-black border border-white" />
                    <span>特に深く共鳴した登場人物の群像劇</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-black font-bold">
                    岩倉美津未、志摩聡介、江頭ミカ、久留米誠、村重結月
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white text-black border-2 border-black font-black text-xs shadow-[2px_2px_0px_#000] shrink-0">
                  アンサンブルの妙 ✨
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: Global Marketing Pitch (Pop Blue Sub Color)           */}
          {/* ============================================================ */}
          {selectedTab === "marketing" && (
            <div className="pt-6 space-y-6 relative z-10">
              <div className="p-6 sm:p-7 bg-white rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3.5 py-1 rounded-xl bg-[#3B82F6] text-white border-2 border-black font-black text-xs shadow-[2px_2px_0px_#000]">
                      STRATEGY PITCH
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-black">
                      {lang === "ja"
                        ? data.skipAndLoafer.marketingPerspective.title
                        : data.skipAndLoafer.marketingPerspective.titleEn}
                    </h4>
                  </div>
                  <span className="text-2xl font-black pop-onomatope-blue rotate-6">
                    ドォン!!
                  </span>
                </div>

                {/* Insight Card with Pop Manga Speech Bubble Styling */}
                <div className="p-5 bg-blue-50 rounded-2xl border-2 border-black space-y-2 relative">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                    <span className="text-xs sm:text-sm font-black text-black">
                      【欧州・フランス市場のインサイト】
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                    {lang === "ja"
                      ? data.skipAndLoafer.marketingPerspective.insight
                      : data.skipAndLoafer.marketingPerspective.insightEn}
                  </p>
                </div>

                {/* Strategy Idea Card with Pop Yellow Accent */}
                <div className="p-5 bg-[#FED54A]/30 rounded-2xl border-2 border-black space-y-2 relative">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FED54A] border border-black" />
                    <span className="text-xs sm:text-sm font-black text-black">
                      【具体的な展開アイデア】
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
                    {lang === "ja"
                      ? data.skipAndLoafer.marketingPerspective.strategyIdea
                      : data.skipAndLoafer.marketingPerspective.strategyIdeaEn}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
