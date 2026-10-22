"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, BookOpen, Globe2, Heart, Target } from "lucide-react";

interface KodanshaMangaShowcaseProps {
  lang: "ja" | "en";
}

export const KodanshaMangaShowcase: React.FC<KodanshaMangaShowcaseProps> = ({ lang }) => {
  const showcasePanels = [
    {
      id: "lit",
      title: "JAPANESE LITERATURE",
      titleJa: "日本文学の解像度",
      badge: "LITERARY NUANCE",
      subtext: "行間・感情の機微を徹底読解",
      image: "/images/japanese-literature.png",
      tagColor: "#FED54A",
      onomatope: "ゴゴゴ",
    },
    {
      id: "mkt",
      title: "MARKETING IN FRANCE",
      titleJa: "フランス国際マーケ",
      badge: "GLOBAL STRATEGY",
      subtext: "欧州マンガ・BD市場の開拓力",
      image: "/images/paris-marketing.png",
      tagColor: "#3B82F6",
      onomatope: "ズバッ",
    },
    {
      id: "skip",
      title: "SKIP AND LOAFER",
      titleJa: "スキップとローファー",
      badge: "KODANSHA AFTERNOON",
      subtext: "高松美咲先生の筆致への敬意",
      image: "/images/skip-and-loafer-cover.png",
      tagColor: "#FED54A",
      onomatope: "ピカッ",
    },
    {
      id: "biz",
      title: "BUSINESS IMPACT",
      titleJa: "出版ビジネスの架け橋",
      badge: "CREATIVE SYNERGY",
      subtext: "高松美咲先生が描く心温まる名場面",
      image: "/images/skip-manga/page-kimono.png",
      tagColor: "#3B82F6",
      onomatope: "ドォン",
    },
  ];

  return (
    <section id="showcase-section" className="relative w-full bg-transparent text-[#1A1A1A] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-y-4 border-black overflow-hidden select-none">
      {/* 4. Manuscript Registration Corner Marks (トンボ) */}
      <div className="absolute top-3 left-4 text-black/35 text-[11px] font-mono select-none pointer-events-none">
        ⌜ KODANSHA EDITORIAL FRAME • 4-PANEL SHOWCASE
      </div>
      <div className="absolute top-3 right-4 text-black/35 text-[11px] font-mono select-none pointer-events-none">
        B&W MANGA SPREAD ⌝
      </div>
      <div className="absolute bottom-3 left-4 text-black/35 text-[11px] font-mono select-none pointer-events-none">
        ⌞ APPLICANT PORTFOLIO
      </div>
      <div className="absolute bottom-3 right-4 text-black/35 text-[11px] font-mono select-none pointer-events-none">
        PAGE 02 ⌟
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ============================================================== */}
        {/* TOP HEADER: Kodansha Manga Editorial Title & 3D Onomatopoeia    */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-6 border-b-4 border-black relative">
          <div className="space-y-3 max-w-2xl">
            {/* Kodansha Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#FED54A] text-black text-xs font-black tracking-wider uppercase border-2 border-black shadow-[3px_3px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>{lang === "ja" ? "講談社 採用選考プレゼンテーション" : "APPLICANT PORTFOLIO FOR KODANSHA"}</span>
            </div>

            {/* Massive Kodansha Extended Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none font-sans text-black drop-shadow-xs">
              PASSION FOR MANGA
            </h2>

            <p className="text-xs sm:text-sm font-bold text-[#2A323D] max-w-xl leading-relaxed pt-1">
              {lang === "ja"
                ? "日本文学で培った作品読解力と、フランスで学んだ国際マーケティング戦略。作品の魂を誰よりも理解し、世界へ届けるための4つの柱。"
                : "Discover what it means to bridge literary narrative depth with international commercial momentum for Kodansha titles."}
            </p>
          </div>

          {/* MANGA ONOMATOPOEIA (ドドンッ！ & バァァン！ STRICTLY 1 HORIZONTAL LINE, NEVER 2 LINES) */}
          <div className="flex flex-row items-center gap-4 sm:gap-8 shrink-0 self-start lg:self-center select-none pt-2 whitespace-nowrap">
            <div className="transform rotate-[-4deg] hover:rotate-0 transition-transform whitespace-nowrap">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black manga-onomatope-dodon tracking-tighter inline-block select-none leading-none whitespace-nowrap">
                ドドンッ！
              </span>
            </div>
            <div className="transform rotate-[6deg] hover:rotate-0 transition-transform whitespace-nowrap">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black pop-onomatope-yellow select-none inline-block leading-none whitespace-nowrap">
                バァァン！
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4 VERTICAL MANGA PANELS SIDE-BY-SIDE (With Requested Images!)   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {showcasePanels.map((panel, idx) => (
            <div
              key={panel.id}
              className="bg-black kodansha-panel rounded-2xl overflow-hidden flex flex-col justify-between relative group aspect-[3/4.4] sm:aspect-auto sm:min-h-[460px] shadow-[6px_6px_0px_#000] border-4 border-black"
            >
              {/* Top Panel Number */}
              <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-black text-white text-[10px] font-black tracking-widest border border-white/40 shadow-sm">
                FRAME 0{idx + 1}
              </div>

              {/* Artwork / Manga Image inside the panel */}
              <div className="relative w-full h-full flex-1 overflow-hidden min-h-[360px] sm:min-h-[420px]">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-all duration-500"
                />

                {/* Dark Vignette Overlay for Title Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                {/* Screentone Texture Overlay inside panel */}
                <div className="absolute inset-0 bg-manga-screentone-soft opacity-20 pointer-events-none" />
                <div className={`absolute inset-0 ${panel.tagColor === '#FED54A' ? 'bg-pop-dots-yellow' : 'bg-pop-dots-blue'} opacity-20 pointer-events-none`} />

                {/* Manga Onomatopoeia sound effect in corner */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="text-xl font-black manga-onomatope-black rotate-[8deg] inline-block">
                    {panel.onomatope}
                  </span>
                </div>

                {/* Bottom Content Area inside the Frame */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 z-20">
                  {/* Japanese Subtitle */}
                  <p className="text-xs font-black text-[#FED54A] tracking-wider uppercase drop-shadow-md">
                    {lang === "ja" ? panel.titleJa : panel.subtext}
                  </p>

                  {/* Big Bold Manga Title */}
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase leading-none drop-shadow-lg font-sans">
                    {panel.title}
                  </h3>

                  {/* Author / Spec Badge Box (White box with black border) */}
                  <div className="pt-2 flex justify-end">
                    <div className="px-3 py-1 bg-white border-2 border-black rounded-md shadow-[2px_2px_0px_#000] text-right">
                      <span className="text-[10px] font-black text-black tracking-wider uppercase block">
                        {panel.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM MANGA CAPTION BANNER                                    */}
        {/* ============================================================== */}
        <div className="mt-10 p-5 rounded-2xl bg-black border-3 border-black text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold shadow-[6px_6px_0px_#000]">
          <div className="flex items-center gap-3.5">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="font-black text-white text-sm sm:text-base">
                {lang === "ja"
                  ? "「物語の深さ」を愛し、「ビジネスの力」で世界へ届ける。"
                  : "Bridging creative narrative depth with global publishing momentum."}
              </p>
              <p className="text-white/70 text-xs pt-0.5">
                {lang === "ja"
                  ? "講談社が誇る名作の数々を、国境を越えて熱狂へ導く架け橋となります。"
                  : "Honoring Kodansha creators while pioneering sustainable global readership."}
              </p>
            </div>
          </div>

          <a
            href="#intro-section"
            className="px-5 py-2.5 rounded-xl bg-[#FED54A] hover:bg-white text-black font-black text-xs uppercase tracking-wider transition-all border-2 border-black shadow-[3px_3px_0px_#fff] shrink-0"
          >
            {lang === "ja" ? "自己紹介の詳細へ →" : "Read Full Story →"}
          </a>
        </div>
      </div>
    </section>
  );
};
