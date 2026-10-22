"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Globe, Video, User, Lightbulb, Heart, Target, Menu, X, Volume2, Mic } from "lucide-react";

interface NavbarProps {
  lang: "ja" | "en";
  setLang: (lang: "ja" | "en") => void;
  onOpenGuide: () => void;
  onOpenVideo?: () => void;
  onReplayManga?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  onOpenGuide,
  onOpenVideo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#video-section", labelJa: "Voices (動画)", labelEn: "Voices", icon: Video },
    { href: "#showcase-section", labelJa: "Passion (4つの柱)", labelEn: "Passion", icon: Sparkles },
    { href: "#intro-section", labelJa: "About (自己紹介)", labelEn: "About", icon: User },
    { href: "#strengths-section", labelJa: "Strengths (強み)", labelEn: "Strengths", icon: Lightbulb },
    { href: "#skip-section", labelJa: "Case Study (作品愛)", labelEn: "Case Study", icon: Heart },
    { href: "#vision-section", labelJa: "Roadmap (将来像)", labelEn: "Roadmap", icon: Target },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b-4 border-black transition-all relative overflow-hidden select-none">
      {/* 1. Authentic Manga Spread Watermark Background */}
      <div className="absolute inset-0 bg-[url('/images/skip-manga-spread.png')] bg-cover bg-top opacity-25 pointer-events-none" />

      {/* 2. Manga Screentone Halftone Texture */}
      <div className="absolute inset-0 bg-pop-dots-black-soft opacity-20 pointer-events-none" />

      {/* 4. Manuscript Registration Corner Marks */}
      <div className="absolute top-1 left-3 text-[8px] font-mono font-black text-black/35 pointer-events-none hidden sm:block">
        ⌜ KODANSHA TOP SPREAD
      </div>
      <div className="absolute bottom-1 right-3 text-[8px] font-mono font-black text-black/35 pointer-events-none hidden sm:block">
        MANGA HEADER ⌟
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative z-10">
        {/* Brand / Logo with Pop Manga Aesthetic */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Pop Manga 4-square emblem in Black, White, Yellow, Green */}
          <div className="w-8 h-8 grid grid-cols-2 gap-0.5 border-3 border-black p-0.5 bg-white group-hover:scale-105 transition-transform shadow-[2px_2px_0px_#000]">
            <div className="bg-black" />
            <div className="bg-[#FED54A]" />
            <div className="bg-[#3B82F6]" />
            <div className="bg-white border border-black" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <span className="font-black text-sm sm:text-base tracking-wide text-black uppercase leading-none">
                KODANSHA
              </span>
              <span className="text-[10px] bg-[#FED54A] text-black border border-black px-2 py-0.5 rounded-full font-black tracking-wider uppercase leading-none shadow-[1px_1px_0px_#000]">
                PORTFOLIO
              </span>
            </div>
            <span className="text-[10px] text-gray-800 font-bold tracking-normal mt-1 leading-none">
              {lang === "ja" ? "吉川 実玖 • 文学 × 国際マーケティング" : "Miku Yoshikawa • Literature × Marketing"}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Clean & Spacious) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            return (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 text-xs font-bold tracking-normal text-black hover:bg-[#FED54A] hover:shadow-[2px_2px_0px_#000] border-2 border-transparent hover:border-black transition-all rounded-md whitespace-nowrap"
              >
                {lang === "ja" ? link.labelJa : link.labelEn}
              </a>
            );
          })}
        </nav>

        {/* Action Controls in Pop Yellow & Blue (Strictly single-line, zero wrapping) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Talk to AI Assistant Button (Neat, clean pop badge) */}
          <Link
            href="/ai-assistant"
            className="shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FED54A] hover:bg-[#FFE500] text-black border-2 border-black font-black text-xs transition-all cursor-pointer shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 active:translate-y-0"
            title={lang === "ja" ? "AI面接アシスタントと音声で話す" : "Talk to the AI Assistant"}
          >
            <Mic className="w-3.5 h-3.5 text-black shrink-0 animate-pulse" />
            <span className="font-black">
              {lang === "ja" ? "AI面接" : "AI Assistant"}
            </span>
          </Link>

          {/* Replay Video with Audio (Pop Blue) */}
          {onOpenVideo && (
            <button
              onClick={onOpenVideo}
              className="shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B82F6] text-white border-2 border-black font-black text-xs hover:bg-[#2563EB] transition-all cursor-pointer shadow-[2px_2px_0px_#000]"
              title="動画を音声ありでポップアップ再生"
            >
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span>
                {lang === "ja" ? "動画 (音声ON)" : "Video"}
              </span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "ja" ? "en" : "ja")}
            className="shrink-0 whitespace-nowrap flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-black bg-white text-xs font-black text-black hover:bg-[#FED54A] transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
          >
            <Globe className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
            <span>{lang === "ja" ? "EN" : "日本語"}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg border-2 border-black text-black hover:bg-[#FED54A] shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b-4 border-black px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-black text-black hover:bg-[#FED54A] transition-colors border-2 border-transparent hover:border-black"
              >
                {lang === "ja" ? link.labelJa : link.labelEn}
              </a>
            );
          })}
          <div className="pt-2 border-t-2 border-black/15 flex flex-col gap-2">
            {/* Prominent Talk to AI Assistant Mobile Button */}
            <Link
              href="/ai-assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#FED54A] border-2 border-black text-xs font-black text-black shadow-[2px_2px_0px_#000] hover:bg-[#FFE500]"
            >
              <Mic className="w-4 h-4 text-black animate-pulse" />
              <span>{lang === "ja" ? "🎤 AI面接アシスタントと話す (Talk to AI Assistant)" : "🎤 Talk to the AI Assistant"}</span>
            </Link>

            {onOpenVideo && (
              <button
                onClick={() => {
                  onOpenVideo();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#3B82F6] text-white text-xs font-black border-2 border-black shadow-[2px_2px_0px_#000]"
              >
                <Volume2 className="w-4 h-4" />
                <span>動画を音声付きで観る (Audio ON)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
