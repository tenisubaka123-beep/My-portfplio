"use client";

import React from "react";

export const MangaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Paper Canvas */}
      <div className="absolute inset-0 bg-white" />

      {/* 2. Authentic Skip and Loafer Manga Spread (Soft & Highly Readable Watermark) */}
      <div className="absolute inset-0 bg-[url('/images/skip-manga-spread.png')] bg-cover bg-center opacity-16 pointer-events-none" />

      {/* 3. Manga Screentone Halftone Dots Texture (Soft & Clean) */}
      <div className="absolute inset-0 bg-pop-dots-black-soft opacity-20 pointer-events-none" />

      {/* 4. Manga Manuscript Grid Guidelines (Subtle) */}
      <div className="absolute inset-0 bg-manuscript-grid opacity-15 pointer-events-none" />

      {/* 5. Pop Yellow & Blue Ben-Day Dots Accents (Strictly ONE Single Non-Overlapping Layer) */}
      <div className="absolute -top-20 -right-20 w-88 h-88 rounded-full bg-pop-dots-yellow opacity-50 blur-xs pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-76 h-76 rounded-full bg-pop-dots-blue opacity-40 blur-xs pointer-events-none" />
      <div className="absolute top-2/3 -right-20 w-76 h-76 rounded-full bg-pop-dots-yellow opacity-40 blur-xs pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-88 h-88 rounded-full bg-pop-dots-blue opacity-40 blur-xs pointer-events-none" />

      {/* 6. Manga Manuscript Corner Crop Marks (トンボ) */}
      <div className="absolute top-4 left-4 w-10 h-10 opacity-40">
        <div className="absolute top-0 left-4 w-0.5 h-10 bg-black" />
        <div className="absolute top-4 left-0 w-10 h-0.5 bg-black" />
        <span className="absolute top-5 left-5 text-[9px] font-mono font-bold text-black">
          裁ち落とし
        </span>
      </div>

      <div className="absolute top-4 right-4 w-10 h-10 opacity-40">
        <div className="absolute top-0 right-4 w-0.5 h-10 bg-black" />
        <div className="absolute top-4 right-0 w-10 h-0.5 bg-black" />
        <span className="absolute top-5 right-5 text-[9px] font-mono font-bold text-black">
          KODANSHA
        </span>
      </div>

      <div className="absolute bottom-4 left-4 w-10 h-10 opacity-40">
        <div className="absolute bottom-0 left-4 w-0.5 h-10 bg-black" />
        <div className="absolute bottom-4 left-0 w-10 h-0.5 bg-black" />
        <span className="absolute bottom-6 left-5 text-[9px] font-mono font-bold text-black">
          YOSHIKAWA
        </span>
      </div>

      <div className="absolute bottom-4 right-4 w-10 h-10 opacity-40">
        <div className="absolute bottom-0 right-4 w-0.5 h-10 bg-black" />
        <div className="absolute bottom-4 right-0 w-10 h-0.5 bg-black" />
        <span className="absolute bottom-6 right-5 text-[9px] font-mono font-bold text-black">
          PAGE • 01
        </span>
      </div>

      {/* 7. Pop Manga Sticker Badges (Yellow Main & Blue Sub) */}
      
      {/* Pop Yellow Circular Badge Sticker */}
      <div className="hidden xl:flex absolute top-40 right-10 w-24 h-24 rounded-full bg-[#FED54A] border-3 border-black shadow-[4px_4px_0px_#000] flex-col items-center justify-center p-2 text-center rotate-12 opacity-85">
        <span className="text-[10px] font-black text-black leading-tight uppercase">
          MANGA
        </span>
        <span className="text-xs font-black text-black leading-tight">
          特効・演出
        </span>
      </div>

      {/* Pop Blue Sticker Badge */}
      <div className="hidden xl:flex absolute bottom-52 left-8 px-3 py-1.5 rounded-lg bg-[#3B82F6] text-white border-3 border-black shadow-[3px_3px_0px_#000] font-black text-xs -rotate-6 opacity-85">
        <span>POP • BLUE 漫画</span>
      </div>

      {/* Manga SFX: ドドドド (Top-center subtle) */}
      <div className="hidden lg:block absolute top-28 left-1/4 opacity-25 pointer-events-none">
        <span className="text-4xl font-black text-black tracking-widest font-sans rotate-[-8deg] inline-block">
          ドドドド
        </span>
      </div>

      {/* Manga SFX: キラキラ✨ (Right side) */}
      <div className="hidden lg:block absolute top-2/3 right-12 opacity-30 pointer-events-none">
        <span className="text-3xl font-black text-black font-sans rotate-12 inline-block">
          キラキラ✨
        </span>
      </div>

      {/* Manga SFX: パァァ (Left side) */}
      <div className="hidden lg:block absolute bottom-1/3 left-14 opacity-30 pointer-events-none">
        <span className="text-3xl font-black text-black font-sans rotate-[-15deg] inline-block">
          パァァ!!
        </span>
      </div>
    </div>
  );
};
