"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { MangaBackground } from "@/components/MangaBackground";
import { VideoPopUpModal } from "@/components/VideoPopUpModal";
import { Navbar } from "@/components/Navbar";
import { HeroVideoSection } from "@/components/HeroVideoSection";
import { KodanshaMangaShowcase } from "@/components/KodanshaMangaShowcase";
import { IntroductionSection } from "@/components/IntroductionSection";
import { StrengthsSection } from "@/components/StrengthsSection";
import { SkipAndLoaferSection } from "@/components/SkipAndLoaferSection";
import { VisionSection } from "@/components/VisionSection";
import { Footer } from "@/components/Footer";
import { VideoGuideModal } from "@/components/VideoGuideModal";

export default function Home() {
  const [lang, setLang] = useState<"ja" | "en">("ja");
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  // Initial State: Opening video plays first on initial open with audio!
  const [isVideoPopUpOpen, setIsVideoPopUpOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col relative text-[#2A323D] selection:bg-[#FED54A] selection:text-black">
      {/* 1. Manga Background (Diagonal split, screentone dots, manuscript marks & Skip & Loafer doodles) */}
      <MangaBackground />

      {/* 2. Opening Video Experience (Plays on initial open with audio, controls, and replay) */}
      <VideoPopUpModal
        isOpen={isVideoPopUpOpen}
        onClose={() => setIsVideoPopUpOpen(false)}
        lang={lang}
        videoSrc="/videos/hero.mp4"
      />

      {/* 3. Full Website Content & Details */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar with Kodansha branding and Audio Replay trigger */}
        <Navbar
          lang={lang}
          setLang={setLang}
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenVideo={() => setIsVideoPopUpOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* 第1コマ: Top Cinematic Video Hero (Video remains in background with text in front, Nippon Sangoku style) */}
          <HeroVideoSection
            data={portfolioData}
            lang={lang}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenVideoPopUp={() => setIsVideoPopUpOpen(true)}
            isPopUpActive={isVideoPopUpOpen}
          />

          {/* Kodansha Manga Academy Showcase: Vivid Red Banner, Onomatopoeia (ドドンッ！), & 4 Manga Frames */}
          <KodanshaMangaShowcase lang={lang} />

          {/* 第2コマ: Introduction Section */}
          <IntroductionSection data={portfolioData} lang={lang} />

          {/* 第3コマ: Strengths Section (Japanese Literature + French Marketing Synergy) */}
          <StrengthsSection data={portfolioData} lang={lang} />

          {/* 第4コマ: Skip and Loafer Tribute & Global Strategy Case Study */}
          <SkipAndLoaferSection data={portfolioData} lang={lang} />

          {/* 最終コマ: Future Roadmap & Contribution to the Publisher */}
          <VisionSection data={portfolioData} lang={lang} />
        </main>

        {/* Footer */}
        <Footer data={portfolioData} lang={lang} />

        {/* Modal: Video Setup Guide */}
        <VideoGuideModal
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
          lang={lang}
        />
      </div>
    </div>
  );
}
