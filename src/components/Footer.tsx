"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, ArrowUp, Copy, Check, Heart, Sparkles, MessageCircle } from "lucide-react";
import { PortfolioContent } from "@/data/portfolioData";

interface FooterProps {
  data: PortfolioContent;
  lang: "ja" | "en";
}

export const Footer: React.FC<FooterProps> = ({ data, lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-transparent border-t-4 border-black pt-16 pb-14 px-4 sm:px-6 lg:px-8 z-10 select-none overflow-hidden">

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* ============================================================== */}
        {/* CONTACT & MESSAGE CARD IN POP MANGA COMIC STYLE               */}
        {/* ============================================================== */}
        <div className="bg-[#FED54A] border-4 border-black rounded-3xl p-7 sm:p-10 pop-comic-panel-yellow text-center relative overflow-hidden shadow-[8px_8px_0px_#000]">
          {/* Ben-Day Dots Shading */}
          <div className="absolute inset-0 bg-pop-dots-black-soft opacity-15 pointer-events-none" />

          {/* Top Manga Heroine Avatar & Comic Speech Bubble */}
          <div className="flex items-center justify-center gap-3 mb-3 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white border-3 border-black overflow-hidden shadow-[3px_3px_0px_#000] relative group">
              <Image
                src="/images/applicant-heroine-drawing.png"
                alt="吉川 実玖 - 感謝"
                fill
                className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative bg-white px-4 py-2 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-b-3 border-l-3 border-black rotate-45" />
              <span className="relative z-10 text-base sm:text-lg font-black text-black select-none">
                感謝！
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-[#FED54A] text-xs font-black uppercase tracking-wider mb-3 shadow-[2px_2px_0px_#000] relative z-10">
            <Sparkles className="w-3.5 h-3.5 text-[#FED54A]" />
            <span>{lang === "ja" ? "御礼 • 採用担当の皆様へ" : "INTERVIEW APPRECIATION"}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-3 relative z-10 tracking-tight">
            {lang === "ja" ? "面接のお時間をいただき、心より感謝申し上げます！" : "Thank you for the opportunity to interview!"}
          </h3>

          <p className="text-xs sm:text-sm text-black font-bold max-w-xl mx-auto leading-relaxed mb-8 relative z-10">
            {lang === "ja" ? data.contact.note : data.contact.noteEn}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <a
              href={`mailto:${data.contact.email}`}
              className="px-6 py-3.5 rounded-2xl bg-black text-white text-xs sm:text-sm font-black hover:bg-[#3B82F6] hover:text-white transition-all flex items-center gap-2 border-3 border-black shadow-[4px_4px_0px_#000] cursor-pointer transform hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              <span>{lang === "ja" ? "メールで連絡する" : "Send an Email"}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-2xl bg-white border-3 border-black text-xs sm:text-sm font-black text-black hover:bg-[#3B82F6] hover:text-white transition-all flex items-center gap-2 shadow-[4px_4px_0px_#000] cursor-pointer transform hover:-translate-y-0.5"
            >
              {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (lang === "ja" ? "コピー完了！" : "Copied!") : data.contact.email}</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TRIBUTE & COPYRIGHT NOTICE                                     */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black font-bold pt-4 border-t-3 border-black relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#FED54A] border-2 border-black font-black shadow-[2px_2px_0px_#000]">
              PORTFOLIO
            </span>
            <span>•</span>
            <span className="text-gray-900 font-black">
              {lang === "ja"
                ? "吉川 実玖 採用応募ポートフォリオ（講談社 / 月刊アフタヌーン）"
                : "Miku Yoshikawa Portfolio (Kodansha / Monthly Afternoon)."}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-black bg-[#FED54A] hover:bg-[#3B82F6] hover:text-white text-black font-black transition-all shadow-[3px_3px_0px_#000] cursor-pointer"
          >
            <span>TOPへ戻る</span>
            <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
