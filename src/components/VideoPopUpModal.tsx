"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Volume2 } from "lucide-react";

interface VideoPopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "ja" | "en";
  videoSrc?: string;
}

export const VideoPopUpModal: React.FC<VideoPopUpModalProps> = ({
  isOpen,
  onClose,
  lang,
  videoSrc = "/videos/hero.mp4",
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [needsUserTapForAudio, setNeedsUserTapForAudio] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Play opening movie automatically with audio
  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setIsFadingOut(false);

    // Attempt unmuted playback first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setNeedsUserTapForAudio(false);
        })
        .catch(() => {
          // Browser restricted unmuted autoplay before user interaction:
          // Smoothly play muted, and prompt user tap to enable full audio
          video.muted = true;
          setIsMuted(true);
          setNeedsUserTapForAudio(true);
          video.play().catch(() => {});
        });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      startPlayback();
    }
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [isOpen, startPlayback]);

  // Enable audio on user interaction
  const enableAudio = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      setNeedsUserTapForAudio(false);
      video.play().catch(() => {});
    }
  };

  // When video ends, smoothly fade out and automatically open the website
  const handleVideoEnded = () => {
    setIsFadingOut(true);
    fadeTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 700);
  };

  // Skip button handler with smooth transition
  const handleSkip = () => {
    setIsFadingOut(true);
    fadeTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black select-none overflow-hidden transition-opacity duration-700 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={needsUserTapForAudio ? enableAudio : undefined}
    >
      {/* Top Right: Clean Skip Option */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute top-5 right-5 sm:top-6 sm:right-6 z-50 flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-[#FED54A] hover:text-black text-white/90 border-2 border-white/40 hover:border-black font-black text-xs sm:text-sm backdrop-blur-md transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Skip opening movie"
      >
        <span>{lang === "ja" ? "スキップ" : "Skip"}</span>
        <X className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Tap for Audio Pill (Appears only if browser initially restricted unmuted sound) */}
      {needsUserTapForAudio && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            enableAudio();
          }}
          className="absolute z-40 px-5 py-2.5 rounded-full bg-[#FED54A] hover:bg-[#FFE500] text-black border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95 transition-all animate-bounce"
        >
          <Volume2 className="w-4 h-4 text-black" />
          <span className="font-black text-xs sm:text-sm">
            {lang === "ja" ? "タップして音声ON" : "Tap for Sound"}
          </span>
        </div>
      )}

      {/* Pure Opening Movie Display (No captions below, just the video) */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={needsUserTapForAudio ? enableAudio : undefined}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          playsInline
          muted={isMuted}
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain cursor-pointer"
        />
      </div>
    </div>
  );
};