"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Settings, ArrowDown, Maximize2 } from "lucide-react";
import { PortfolioContent } from "@/data/portfolioData";

interface HeroVideoSectionProps {
  data: PortfolioContent;
  lang: "ja" | "en";
  onOpenGuide: () => void;
  onOpenVideoPopUp: () => void;
  isPopUpActive?: boolean;
}

export const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({
  data,
  lang,
  onOpenGuide,
  onOpenVideoPopUp,
  isPopUpActive = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [customVideoUrl, setCustomVideoUrl] = useState(data.video.videoUrl || "/videos/hero.mp4");
  const [showConfig, setShowConfig] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isYouTube = customVideoUrl.includes("youtube.com") || customVideoUrl.includes("youtu.be");
  const isGoogleFlow = customVideoUrl.includes("flow.google.com");

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
    }
    return url;
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (vid) {
      if (vid.paused) {
        vid.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        vid.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (vid) {
      const nextMuted = !vid.muted;
      vid.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Robust Autoplay & Continuous Looping Effect
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.defaultMuted = isMuted;
    vid.muted = isMuted;
    vid.playsInline = true;
    vid.loop = true;

    const playVideo = () => {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Unmuted autoplay restricted by browser policy; playing muted:", error);
            vid.muted = true;
            setIsMuted(true);
            vid.play().then(() => setIsPlaying(true)).catch(() => {});
          });
      }
    };

    playVideo();

    // User gesture listener to automatically unlock audio if user taps anywhere
    const handleFirstGesture = () => {
      if (vid.paused) {
        vid.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener("click", handleFirstGesture, { once: true });
    document.addEventListener("touchstart", handleFirstGesture, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstGesture);
      document.removeEventListener("touchstart", handleFirstGesture);
    };
  }, [customVideoUrl, isPopUpActive, isMuted]);

  return (
    <section id="video-section" className="relative w-full overflow-hidden bg-black text-white select-none">
      {/* ============================================================== */}
      {/* 1. CINEMATIC BACKGROUND VIDEO LAYER (100% Full-Bleed Video)     */}
      {/* Runs continuously and reliably in the hero background!         */}
      {/* ============================================================== */}
      <div className="relative w-full min-h-[700px] sm:min-h-[780px] lg:min-h-[880px] flex items-center justify-center overflow-hidden">
        {customVideoUrl && !isGoogleFlow && isYouTube ? (
          <iframe
            src={getEmbedUrl(customVideoUrl)}
            className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none z-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={(el) => {
              videoRef.current = el;
              if (el) {
                el.defaultMuted = isMuted;
                el.muted = isMuted;
                el.playsInline = true;
              }
            }}
            src={customVideoUrl || "/videos/hero.mp4"}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {});
              }
            }}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Cinematic Vignette & Edge Gradients for maximum text readability */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[420px] bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-radial-[circle_at_bottom_left] from-black/60 via-transparent to-black/30 pointer-events-none z-10" />

        {/* ============================================================== */}
        {/* 2. FOREGROUND OVERLAY & CONTROLS                               */}
        {/* ============================================================== */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14 pointer-events-none">
          
          {/* Top Bar: Rotating Circular "PLAY MOVIE" Badge & Action Buttons */}
          <div className="flex items-start justify-between gap-4 pointer-events-auto">
            {/* Rotating Circular "PLAY MOVIE" Badge (Upper Left) */}
            <div
              className="relative flex items-center justify-center group cursor-pointer"
              onClick={togglePlay}
              title="クリックで動画の再生 / 一時停止"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white drop-shadow-md">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text fontSize="7.8" fontWeight="bold" letterSpacing="2.8">
                    <textPath href="#circlePath" className="uppercase">
                      • PLAY MOVIE • INTRO REEL • CANDIDATE
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Center Play/Pause Button */}
              <div className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FED54A] text-black border-2 border-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                )}
              </div>
            </div>

            {/* Top Right: Pop-up Video Button & Guide */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenVideoPopUp}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-black hover:bg-[#FED54A] transition-all shadow-lg cursor-pointer transform hover:scale-105 border-2 border-black"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>{lang === "ja" ? "動画をポップアップで観る" : "Pop-up Clean Video"}</span>
              </button>

              <button
                onClick={onOpenGuide}
                className="hidden sm:inline-flex px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-xs font-bold text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                ガイド
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. BOTTOM-LEFT CINEMATIC TYPOGRAPHY (Reference Image 2 Style)  */}
          {/* "日本の漫画を世界へ" in ONE LINE, Yellow Letters with Candidate */}
          {/* ============================================================== */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6 pb-2 pointer-events-auto">
            
            {/* Bottom-Left Core Typography */}
            <div className="space-y-3 max-w-5xl w-full">
              
              {/* Small Category / Metadata Tag (Like Reference Image 2) */}
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-black tracking-wider text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FED54A] shadow-[0_0_8px_#FED54A]" />
                <span className="uppercase font-mono">
                  {lang === "ja" ? "KODANSHA RECRUITMENT 2026 / 吉川 実玖" : "KODANSHA RECRUITMENT 2026 / MIKU YOSHIKAWA"}
                </span>
              </div>

              {/* Massive Main Headline in Yellow Letters (Guaranteed strictly ONE LINE) */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#FED54A] tracking-tight leading-none whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)]">
                  {lang === "ja" ? "日本の漫画を世界へ" : "Sharing Japanese Manga with the World"}
                </h1>
              </div>

              {/* Subtitle Sentence incorporating 吉川実玖 */}
              <p className="text-xs sm:text-base md:text-lg font-bold text-white/95 max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {lang === "ja" ? (
                  <>
                    <span className="text-[#FED54A] font-black underline decoration-[#FED54A]/60 underline-offset-4">
                      吉川実玖（Miku Yoshikawa）
                    </span>
                    {" "}— 日本文学で培った作品の解像度と、フランスで学んだ国際マーケティングの推進力。言葉と国境の壁を越え、マンガが放つ熱量と感動を世界中の読者へ届けます。
                  </>
                ) : (
                  <>
                    <span className="text-[#FED54A] font-black underline decoration-[#FED54A]/60 underline-offset-4">
                      Miku Yoshikawa
                    </span>
                    {" "}— Bridging Japanese literary narrative depth with international marketing execution to share the passion and emotion of manga with readers across the globe.
                  </>
                )}
              </p>
            </div>

            {/* Bottom-Right Media Controls */}
            <div className="flex items-center gap-2 shrink-0 self-start lg:self-end">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-md hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors cursor-pointer shadow-lg"
                title="動画の再生 / 一時停止"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#FED54A]" />
                    <span>一時停止</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-[#FED54A]" />
                    <span>再生</span>
                  </>
                )}
              </button>

              {/* Audio Toggle */}
              <button
                onClick={toggleMute}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-black transition-all cursor-pointer shadow-lg ${
                  isMuted
                    ? "bg-black/70 border-white/30 text-white/80 hover:bg-black"
                    : "bg-[#3B82F6] text-white border-black shadow-[2px_2px_0px_#000]"
                }`}
                title="音声のON/OFFを切り替え"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white/60" />
                    <span>消音中 (音声ON)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-white" />
                    <span>音声ON</span>
                  </>
                )}
              </button>

              {/* Video Settings */}
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-md hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors cursor-pointer shadow-lg"
              >
                <Settings className="w-3.5 h-3.5 text-[#FED54A]" />
                <span>{showConfig ? "閉じる" : "動画設定"}</span>
              </button>
            </div>
          </div>

          {/* Optional URL Replacement input popup */}
          {showConfig && (
            <div
              className="mt-2 p-3 bg-black/90 backdrop-blur-md border border-white/30 rounded-2xl flex flex-col sm:flex-row gap-2 items-center text-xs pointer-events-auto animate-in fade-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-bold text-white shrink-0">
                動画URL / ローカルパス:
              </span>
              <input
                type="text"
                placeholder="例: /videos/hero.mp4 または YouTube URL"
                value={customVideoUrl}
                onChange={(e) => setCustomVideoUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-white/30 bg-white/10 text-white text-xs focus:outline-hidden focus:border-[#FED54A]"
              />
              <button
                onClick={() => setShowConfig(false)}
                className="px-3.5 py-1.5 bg-[#FED54A] text-black rounded-xl font-black shrink-0 hover:bg-[#3B82F6] hover:text-white transition-colors cursor-pointer"
              >
                反映する
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Down arrow indicator to prompt scrolling into the candidate profile */}
      <div className="w-full bg-[#121A20] py-3 flex items-center justify-center border-t border-white/10">
        <a
          href="#showcase-section"
          className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white transition-colors group cursor-pointer"
        >
          <span>マンガ作品ショーケースへスクロール</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#FED54A] group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};
