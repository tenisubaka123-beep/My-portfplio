"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, BookOpen, ArrowRight, X, Heart } from "lucide-react";

interface MangaBookOpeningProps {
  onComplete?: () => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  lang: "ja" | "en";
}

export const MangaBookOpening: React.FC<MangaBookOpeningProps> = ({
  isOpen,
  setIsOpen,
  lang,
}) => {
  // Opening scenes:
  // "walking": Girl carrying precious mangas walking toward us
  // "presenting": She holds out her special manga to us with a warm smile
  // "opened_spread": The book opens to reveal the authentic B&W manga double-page spread!
  // "zooming": Diving inside the manga spread into the profile
  // "finished": Complete, website visible
  const [scene, setScene] = useState<"walking" | "presenting" | "opened_spread" | "zooming" | "finished">(
    isOpen ? "finished" : "walking"
  );

  useEffect(() => {
    if (!isOpen) {
      setScene("walking");
    }
  }, [isOpen]);

  const handleNextToPresent = () => {
    setScene("presenting");
  };

  const handleOpenBook = () => {
    setScene("opened_spread");
  };

  const handleDiveIntoProfile = () => {
    setScene("zooming");
    setTimeout(() => {
      setScene("finished");
      setIsOpen(true);
    }, 1200);
  };

  const handleSkip = () => {
    setScene("finished");
    setIsOpen(true);
  };

  if (scene === "finished" && isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-700 select-none overflow-hidden ${
        scene === "zooming" ? "scale-[3] opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at center, rgba(235, 246, 253, 0.98) 0%, rgba(220, 242, 222, 0.96) 55%, rgba(42, 50, 61, 0.96) 100%)",
      }}
    >
      {/* Background screentone dots */}
      <div className="absolute inset-0 bg-manga-screentone-soft opacity-40 pointer-events-none" />

      {/* Floating flower petals / spring sparkles in Skip and Loafer palette */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-3 h-3 rounded-full bg-[#E05A53]/30 animate-paw" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-[#8AC2EB]/40 animate-manga-float" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-[#9DDE8F]/40 animate-paw" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/6 right-1/6 w-2.5 h-2.5 rounded-full bg-[#F5DB88]/50 animate-manga-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Top Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 py-2 rounded-full bg-white/95 border-2 border-[#2A323D] text-xs font-black text-[#2A323D] manga-panel-sm hover:bg-[#F5DB88] transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
      >
        <span>{lang === "ja" ? "スキップ" : "Skip"}</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* ============================================================== */}
      {/* SCENE 1: THE GIRL WALKING TOWARD US HOLDING MANGAS CLOSE TO HER CHEST */}
      {/* ============================================================== */}
      {scene === "walking" && (
        <div className="max-w-md w-full flex flex-col items-center text-center animate-in fade-in duration-500 relative">
          {/* Subtle Manga Speech / Thought Bubble */}
          <div className="mb-4 p-3.5 bg-white border-2 border-[#2A323D] rounded-2xl manga-panel-sm max-w-sm speech-bubble-bottom relative">
            <p className="text-xs sm:text-sm font-black text-[#2A323D] leading-relaxed">
              {lang === "ja"
                ? "「私を育て、世界へと背中を押してくれたのは、いつも大好きなマンガたちでした。」"
                : '"It was always the stories in manga that shaped who I am and gave me the courage to step forward."'}
            </p>
          </div>

          {/* Character Illustration: The Applicant Heroine (Direct user drawing reference) */}
          <div className="relative w-64 h-72 sm:w-72 sm:h-80 my-2 animate-manga-float flex flex-col items-center justify-center">
            <div className="relative w-48 h-60 sm:w-56 sm:h-68 rounded-3xl border-4 border-[#2A323D] bg-white overflow-hidden shadow-[6px_6px_0px_#2A323D] p-2 flex flex-col items-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#2A323D] bg-[#FED54A]/30">
                <Image
                  src="/images/applicant-heroine-drawing.png"
                  alt="Applicant Heroine - 吉川 実玖"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Badge */}
                <div className="absolute top-2 left-2 bg-[#FED54A] border-2 border-black px-2 py-0.5 rounded text-[10px] font-black uppercase text-black shadow-xs">
                  APPLICANT HEROINE
                </div>
                <div className="absolute bottom-2 right-2 rotate-[-6deg]">
                  <span className="text-base font-black pop-onomatope-yellow">
                    トコトコ…✨
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Step Button */}
          <div className="mt-4 space-y-2">
            <button
              onClick={handleNextToPresent}
              className="px-8 py-3.5 rounded-full bg-[#8AC2EB] hover:bg-[#67A9DD] text-[#2A323D] border-3 border-[#2A323D] manga-panel font-black text-sm sm:text-base flex items-center gap-2.5 cursor-pointer transform hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <span>{lang === "ja" ? "彼女に近づく（話を聞く）" : "Step Closer to Her"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-[#52606D] font-bold">
              {lang === "ja" ? "マンガを大切そうに抱えた彼女が、歩み寄ってきます" : "She walks toward you, holding her cherished mangas close."}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 2: SHE PRESENTS ONE OF HER SPECIAL MANGAS TOWARD US */}
      {/* ============================================================== */}
      {scene === "presenting" && (
        <div className="max-w-md w-full flex flex-col items-center text-center animate-in zoom-in-95 duration-500 relative">
          {/* Dialogue Speech Bubble */}
          <div className="mb-4 p-3.5 bg-[#FFF9E6] border-3 border-[#2A323D] rounded-2xl manga-panel max-w-sm speech-bubble-bottom relative">
            <p className="text-xs sm:text-sm font-black text-[#2A323D] leading-relaxed">
              {lang === "ja"
                ? "「私のこれまでの歩みと、マンガ出版への情熱をこの一冊に込めました。ぜひ、開いてみてください！」"
                : '"I have poured my journey, literature studies, and marketing passion into this volume. Please, turn the page!"'}
            </p>
          </div>

          {/* The Original Fictional Manga She Offers to Us */}
          <div className="relative w-[270px] sm:w-[320px] aspect-[1/1.42] rounded-2xl border-3 border-[#2A323D] manga-panel overflow-hidden bg-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
            {/* Cover of the Original Fictional Manga (Safe & Skip & Loafer palette) */}
            <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-skip-split p-4 text-left">
              {/* Halftone texture */}
              <div className="absolute inset-0 bg-manga-screentone-soft opacity-30 pointer-events-none" />

              {/* Spine edge illusion */}
              <div className="absolute top-0 bottom-0 left-0 w-3.5 bg-gradient-to-r from-black/20 via-white/25 to-transparent pointer-events-none z-20" />

              {/* Top Banner */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="px-2 py-0.5 bg-white border-2 border-[#2A323D] rounded text-[10px] font-black text-[#2A323D]">
                  ORIGINAL COMICS
                </span>
                <span className="px-2 py-0.5 bg-[#F5DB88] border-2 border-[#2A323D] rounded text-[10px] font-black text-[#2A323D]">
                  VOL. 01
                </span>
              </div>

              {/* Title & Badge */}
              <div className="relative z-10 text-center my-auto space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-white border-2 border-[#2A323D] flex items-center justify-center text-2xl shadow-inner">
                  📖
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-[#2A323D]/80 block">
                    — オリジナル創作単行本 —
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#2A323D] leading-tight">
                    ステップ＆ストーリー
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-[#2A323D]/80">
                    STEP & STORY : JOURNEY OF WORDS
                  </p>
                </div>
              </div>

              {/* Book Obi */}
              <div className="relative z-10 p-2.5 rounded-xl bg-[#F5DB88] border-2 border-[#2A323D] shadow-sm">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-[#E05A53] text-white text-[9px] font-black">
                    採用選考特別号
                  </span>
                  <span className="text-[9px] font-bold text-[#2A323D]">
                    著：応募者
                  </span>
                </div>
                <p className="text-xs font-black text-[#2A323D] leading-snug">
                  文学 × マーケティングで世界へ挑むポートフォリオ
                </p>
              </div>
            </div>
          </div>

          {/* Action Button: Take and Open the Book */}
          <div className="mt-5 space-y-2">
            <button
              onClick={handleOpenBook}
              className="px-8 py-3.5 rounded-full bg-[#8AC2EB] hover:bg-[#67A9DD] text-[#2A323D] border-3 border-[#2A323D] manga-panel font-black text-sm sm:text-base flex items-center gap-2.5 cursor-pointer transform hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <BookOpen className="w-5 h-5" />
              <span>{lang === "ja" ? "マンガを受け取って開く！" : "Take and Open Manga!"}</span>
              <Sparkles className="w-4 h-4 text-[#F5DB88]" />
            </button>
            <p className="text-xs text-[#2A323D]/80 font-black">
              {lang === "ja" ? "開くと、迫力のマンガ原稿見開きページが現れます" : "Turn the page to see the authentic manga spread"}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 3: THE BOOK IS OPENED → AUTHENTIC B&W MANGA DOUBLE SPREAD */}
      {/* ============================================================== */}
      {(scene === "opened_spread" || scene === "zooming") && (
        <div className="relative max-w-4xl w-full flex flex-col items-center select-none animate-in zoom-in-95 duration-500">
          {/* Top Spread Banner */}
          <div className="mb-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#2A323D] manga-panel-sm flex items-center gap-2 text-xs font-black text-[#2A323D]">
            <span className="w-2 h-2 rounded-full bg-[#E05A53]" />
            <span>{lang === "ja" ? "彼女が見せてくれたマンガ原稿（見開き）" : "The Manga Double-Page Spread She Opened"}</span>
          </div>

          {/* Authentic Manga Spread Frame */}
          <div className="relative w-full max-w-3xl aspect-[1.42/1] rounded-2xl border-3 border-[#2A323D] manga-panel overflow-hidden bg-white shadow-2xl flex items-center justify-center p-2 sm:p-3">
            {/* The Authentic Manga Spread Image (From uploaded reference) */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#2A323D]/20 flex items-center justify-center">
              <Image
                src="/images/skip-manga-spread.png"
                alt="Authentic Skip and Loafer Manga Double-Page Spread"
                fill
                className="object-contain"
                priority
              />

              {/* Realistic Gutter Shadow */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none" />

              {/* Callout to Dive inside the Manga Panels into the Portfolio */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-md bg-white/95 backdrop-blur-md border-3 border-[#2A323D] rounded-2xl p-3 manga-panel text-center space-y-2 shadow-2xl">
                <div className="flex items-center justify-center gap-1.5 text-xs font-black text-[#2A323D]">
                  <Sparkles className="w-4 h-4 text-[#F5DB88]" />
                  <span>
                    {lang === "ja"
                      ? "「ここから、私の物語（プロフィール）へご案内します！」"
                      : '"From these pages, welcome into my portfolio world!"'}
                  </span>
                </div>

                <button
                  onClick={handleDiveIntoProfile}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8AC2EB] hover:bg-[#67A9DD] text-[#2A323D] border-2 border-[#2A323D] font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transform hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {lang === "ja" ? "マンガの中へ進む（プロフィールを開く） →" : "Dive into the Profile →"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Return to Previous Step */}
          <div className="mt-2.5 flex items-center gap-3">
            <button
              onClick={() => setScene("presenting")}
              className="text-xs text-[#52606D] font-bold hover:text-[#2A323D] underline cursor-pointer"
            >
              ← {lang === "ja" ? "もう一度表紙を見る" : "Back to Cover"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
