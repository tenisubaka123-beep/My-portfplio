"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Send,
  Flame,
  Globe2,
  ShoppingBag,
  BookOpen,
  Award,
  Film,
  Heart,
  MessageSquare,
  Square,
  ArrowLeft,
  Radio,
  ExternalLink,
  AlertCircle,
  PhoneOff,
} from "lucide-react";
import { MangaBackground } from "@/components/MangaBackground";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { EmotionType, ConversationTurn, DEFAULT_ANIME_VOICE_CONFIG } from "@/types/assistant";
import {
  speakWithWebSpeech,
  stopAllSpeech,
  playBase64Audio,
  unlockAudioPlayer,
  playMangaSoundEffect,
  playSiriChime,
} from "@/lib/audioEffects";
import { startAudioRecording, VoiceRecordingSession } from "@/lib/voiceRecorder";

const INITIAL_AOI_GREETING = `面接官さん、はじめまして！講談社専属パートナーのアオイですっ！
マイクに向かって直接話しかけてください！志望動機や好きな漫画、入社後の企画など、何でも全力でお答えします！`;

export default function AIAssistantPage() {
  const [lang, setLang] = useState<"ja" | "en">("ja");

  // Call & Session States
  const [callState, setCallState] = useState<"idle" | "connecting" | "listening" | "thinking" | "speaking" | "error">("idle");
  const [hasStartedSession, setHasStartedSession] = useState<boolean>(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>("happy");
  const [transcript, setTranscript] = useState<string>("");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [lastBotReply, setLastBotReply] = useState<string>(INITIAL_AOI_GREETING);
  const [continuousMode, setContinuousMode] = useState<boolean>(true);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [speakingLipsyncVolume, setSpeakingLipsyncVolume] = useState<number>(0);
  const [audioBlocked, setAudioBlocked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Text input & History
  const [textInput, setTextInput] = useState<string>("");
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<ConversationTurn[]>([]);

  // Refs for audio sessions, timers & stale-closure avoidance
  const callStateRef = useRef<"idle" | "connecting" | "listening" | "thinking" | "speaking" | "error">("idle");
  const hasStartedSessionRef = useRef<boolean>(false);
  const continuousModeRef = useRef<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const recordingSessionRef = useRef<VoiceRecordingSession | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const historyRef = useRef<ConversationTurn[]>([]);
  const latestReplyRef = useRef<string>(INITIAL_AOI_GREETING);
  const latestTranscriptRef = useRef<string>("");

  useEffect(() => {
    callStateRef.current = callState;
  }, [callState]);

  useEffect(() => {
    hasStartedSessionRef.current = hasStartedSession;
  }, [hasStartedSession]);

  useEffect(() => {
    continuousModeRef.current = continuousMode;
  }, [continuousMode]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  // Clean stop for voice playback
  const stopVoice = useCallback(() => {
    stopAllSpeech();
    setSpeakingLipsyncVolume(0);
    if (callStateRef.current === "speaking") {
      callStateRef.current = "idle";
      setCallState("idle");
    }
  }, []);

  // Stop microphone capture and clean up audio recording session
  const stopListening = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    if (recordingSessionRef.current) {
      recordingSessionRef.current.cancel();
      recordingSessionRef.current = null;
    }
    setMicVolume(0);
    if (callStateRef.current === "listening") {
      callStateRef.current = "idle";
      setCallState("idle");
    }
  }, []);

  // Browser speech fallback with natural anime female voice
  const speakWithBrowser = useCallback((cleanText: string, onDone: () => void) => {
    speakWithWebSpeech(
      cleanText,
      DEFAULT_ANIME_VOICE_CONFIG,
      () => {
        callStateRef.current = "speaking";
        setCallState("speaking");
      },
      () => onDone(),
      (vol) => setSpeakingLipsyncVolume(vol)
    );
  }, []);

  // Play Character Speech with Gemini TTS or natural Web Speech fallback
  const playCharacterSpeech = useCallback(
    async (text: string, onSpeechFinished?: () => void) => {
      if (isMuted) {
        onSpeechFinished?.();
        return;
      }

      stopListening();
      stopVoice();
      unlockAudioPlayer();
      callStateRef.current = "speaking";
      setCallState("speaking");
      setAudioBlocked(false);
      playMangaSoundEffect("boom");

      const clean = text.replace(/\[EMOTION:\s*\w+\]/gi, "").replace(/【.*?】/g, "").trim();

      const finishCallback = () => {
        setSpeakingLipsyncVolume(0);
        onSpeechFinished?.();
      };

      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: clean,
            characterStyle: "hero",
          }),
        });

        const data = await res.json();
        if (data?.audioBase64) {
          await playBase64Audio(
            data.audioBase64,
            () => {
              callStateRef.current = "speaking";
              setCallState("speaking");
            },
            () => finishCallback(),
            (vol) => setSpeakingLipsyncVolume(vol),
            (err) => {
              console.warn("Base64 playback error, using browser speech fallback:", err);
              setAudioBlocked(true);
              speakWithBrowser(clean, finishCallback);
            }
          );
          return;
        }
      } catch (err) {
        console.warn("TTS fetch failed, falling back to Web Speech:", err);
      }

      // Smooth Anime Neural Web Speech Fallback
      speakWithBrowser(clean, finishCallback);
    },
    [isMuted, stopListening, stopVoice, speakWithBrowser]
  );

  // Called when character finishes speaking: auto-listen in continuous mode
  const handleSpeechFinished = useCallback(() => {
    setSpeakingLipsyncVolume(0);
    callStateRef.current = "idle";
    setCallState("idle");

    if (continuousModeRef.current && hasStartedSessionRef.current) {
      setTimeout(() => {
        if (hasStartedSessionRef.current && continuousModeRef.current) {
          playSiriChime("listen");
          startListening();
        }
      }, 500);
    }
  }, []);

  // Dual-Capture Voice Listening: MediaRecorder + Web Speech API with real-time volume analyzer
  const startListening = async () => {
    stopVoice();
    unlockAudioPlayer();
    setErrorMessage("");
    setTranscript("");
    setInterimTranscript("");
    latestTranscriptRef.current = "";
    callStateRef.current = "listening";
    setCallState("listening");

    // 1. Start audio recording with real-time volume visualizer & silence detection
    try {
      const session = await startAudioRecording((vol) => {
        setMicVolume(vol);

        // Auto silence detection: if user was speaking and quiet for 1.4s, send query
        if (vol > 15) {
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            if (latestTranscriptRef.current.trim().length >= 2) {
              finishListeningAndSend();
            }
          }, 1400);
        }
      });
      recordingSessionRef.current = session;
    } catch (err: unknown) {
      console.warn("getUserMedia error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Permission") || msg.includes("denied")) {
        setErrorMessage("マイクの使用が許可されていません。ブラウザのアドレスバーでマイクを許可してください。");
      } else {
        setErrorMessage("マイクを起動できませんでした。テキスト入力でも対話いただけます！");
      }
    }

    // 2. Also run Web Speech Recognition concurrently for instant live transcript
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowObj = typeof window !== "undefined" ? (window as any) : null;
    const SpeechRecognition = windowObj?.SpeechRecognition || windowObj?.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = "ja-JP";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
          playMangaSoundEffect("sparkle");
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          let finalStr = "";
          let interimStr = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const trans = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalStr += trans;
            } else {
              interimStr += trans;
            }
          }

          if (finalStr) {
            setTranscript((prev) => {
              const updated = prev ? `${prev} ${finalStr}` : finalStr;
              latestTranscriptRef.current = updated;
              return updated;
            });
          }
          if (interimStr) {
            setInterimTranscript(interimStr);
            latestTranscriptRef.current = (transcript ? `${transcript} ` : "") + interimStr;
          }

          // Reset silence timer on live speech
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            const fullQuery = latestTranscriptRef.current.trim();
            if (fullQuery.length >= 2) {
              finishListeningAndSend(fullQuery);
            }
          }, 1300);
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = (e: any) => {
          console.warn("Speech recognition notice (MediaRecorder audio backup is active):", e.error);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.warn("SpeechRecognition start failed (audio recorder active):", err);
      }
    }
  };

  // Finish listening and send query to AI assistant
  const finishListeningAndSend = async (forcedQuery?: string) => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    let query = (forcedQuery || latestTranscriptRef.current || transcript || interimTranscript).trim();

    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    // Stop recording and retrieve audio data for server fallback transcription
    let recordingData = null;
    if (recordingSessionRef.current) {
      try {
        recordingData = await recordingSessionRef.current.stop();
      } catch (err) {
        console.warn("Recording stop error:", err);
      }
      recordingSessionRef.current = null;
    }
    setMicVolume(0);

    // If Web Speech yielded no text, transcribe audio using Gemini on server!
    if (!query && recordingData && recordingData.audioBase64) {
      callStateRef.current = "thinking";
      setCallState("thinking");
      try {
        const transRes = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            audioBase64: recordingData.audioBase64,
            mimeType: recordingData.mimeType,
          }),
        });
        const transJson = await transRes.json();
        if (transJson.text && !transJson.text.includes("聞き取れませんでした")) {
          query = transJson.text.trim();
        }
      } catch (err) {
        console.warn("Server transcribe error:", err);
      }
    }

    if (!query) {
      callStateRef.current = "idle";
      setCallState("idle");
      setErrorMessage("音声が聞き取れませんでした。マイクに近づいてもう一度お話しいただくか、ワンタップ質問をご利用ください。");
      return;
    }

    setTranscript(query);
    setInterimTranscript("");
    latestTranscriptRef.current = "";
    submitQuestion(query);
  };

  // Submit question to AI and speak answer
  const submitQuestion = async (questionText: string) => {
    const question = questionText.trim();
    if (!question) return;

    stopListening();
    stopVoice();
    unlockAudioPlayer();
    callStateRef.current = "thinking";
    setCallState("thinking");
    playMangaSoundEffect("pop");

    const interviewerTurn: ConversationTurn = {
      id: `q-${Date.now()}`,
      role: "interviewer",
      text: question,
      timestamp: Date.now(),
    };

    const updatedHistory = [...historyRef.current, interviewerTurn];
    historyRef.current = updatedHistory;
    setHistory(updatedHistory);

    try {
      const messagesForApi = updatedHistory.map((h) => ({
        role: h.role === "interviewer" ? "user" : "assistant",
        text: h.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesForApi,
          candidateProfile: {
            characterStyle: "hero",
          },
        }),
      });

      const data = await response.json();
      const replyText = data.text || "";

      const emotionMatch = replyText.match(/\[EMOTION:\s*(\w+)\]/i);
      const parsedEmotion = (emotionMatch ? emotionMatch[1].toLowerCase() : "passionate") as EmotionType;
      const validEmotion: EmotionType = ["passionate", "happy", "serious", "sparkling", "shy"].includes(parsedEmotion)
        ? parsedEmotion
        : "passionate";

      setCurrentEmotion(validEmotion);
      setLastBotReply(replyText);
      latestReplyRef.current = replyText;

      const partnerTurn: ConversationTurn = {
        id: `a-${Date.now()}`,
        role: "partner",
        text: replyText,
        emotion: validEmotion,
        timestamp: Date.now(),
      };
      const finalHistory = [...updatedHistory, partnerTurn];
      historyRef.current = finalHistory;
      setHistory(finalHistory);

      playCharacterSpeech(replyText, handleSpeechFinished);
    } catch (err) {
      console.error("Chat error:", err);
      const fallback = `[EMOTION: passionate] 【はいっ！】面接官さん、素敵なご質問をありがとうございます！応募者の誠実さと「面白い漫画を世の中に届けたい」という情熱は本物です！講談社で精一杯お役に立ちたいです！`;
      setLastBotReply(fallback);
      latestReplyRef.current = fallback;
      playCharacterSpeech(fallback, handleSpeechFinished);
    }
  };

  // Explicit START CONVERSATION action
  const startConversation = async () => {
    try {
      setErrorMessage("");
      callStateRef.current = "connecting";
      setCallState("connecting");

      unlockAudioPlayer();
      hasStartedSessionRef.current = true;
      setHasStartedSession(true);

      // Play opening greeting with anime voice, then start listening
      playCharacterSpeech(INITIAL_AOI_GREETING, handleSpeechFinished);
    } catch (err) {
      console.error("Start conversation error:", err);
      setErrorMessage("セッションの開始に失敗しました。もう一度お試しください。");
      callStateRef.current = "error";
      setCallState("error");
    }
  };

  // Explicit END CONVERSATION action
  const endConversation = () => {
    hasStartedSessionRef.current = false;
    setHasStartedSession(false);
    stopListening();
    stopVoice();
    setSpeakingLipsyncVolume(0);
    setTranscript("");
    setInterimTranscript("");
    callStateRef.current = "idle";
    setCallState("idle");
  };

  // Cleanup when leaving page or unmounting
  useEffect(() => {
    const handleBeforeUnload = () => {
      endConversation();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
      endConversation();
    };
  }, []);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || callState === "thinking") return;
    const q = textInput.trim();
    setTextInput("");
    unlockAudioPlayer();
    hasStartedSessionRef.current = true;
    setHasStartedSession(true);
    submitQuestion(q);
  };

  // Preset Topics directly from candidate's real Kodansha Entry Sheet
  const presetQuestions = [
    {
      icon: Flame,
      label: "志望動機と情熱",
      prompt: "講談社への志望動機と、あなたがどんな情熱を持った人柄なのか教えてください！",
    },
    {
      icon: Globe2,
      label: "海外マーケ企画",
      prompt: "海外マーケティングで提案している「World meets KODANSHA」のインタビューシリーズ企画について詳しく聞かせてください！",
    },
    {
      icon: ShoppingBag,
      label: "ブルーロックご当地グッズ",
      prompt: "ライツビジネスでやりたい「ブルーロックのご当地グッズ企画」とはどのような内容ですか？",
    },
    {
      icon: BookOpen,
      label: "『アフタヌーン』高松美咲先生企画",
      prompt: "なぜ『アフタヌーン』なのか、そして高松美咲先生と企画したいファンタジー作品について教えてください！",
    },
    {
      icon: Award,
      label: "強み・太鼓の達人・テニス",
      prompt: "太鼓の達人の鬼レベルクリアやソフトテニス全国大会、フランス留学での挫折克服など、あなたの強みを教えてください！",
    },
    {
      icon: Film,
      label: "2026年〜お薦め作品",
      prompt: "2026年以降のお薦めコンテンツとして挙げている『日本三国』や『天幕のジャードゥーガル』などの魅力を教えてください！",
    },
    {
      icon: Heart,
      label: "人生の特別作品5選",
      prompt: "あなたの人生において特別な『スキップとローファー』や『幸福論』『風の帰る場所』について教えてください！",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative text-[#2A323D] selection:bg-[#FED54A] selection:text-black">
      {/* Authentic Manga Background with Single Clean Layer of Ben-Day Dots */}
      <MangaBackground />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-black select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-black bg-white hover:bg-[#FED54A] text-black font-black text-xs sm:text-sm transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>{lang === "ja" ? "ポートフォリオTOPへ戻る" : "Back to Home"}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Connection State Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border-2 border-black font-black text-xs shadow-xs">
              {callState === "idle" && (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                  <span className="text-gray-700">{lang === "ja" ? "待機中" : "Idle"}</span>
                </>
              )}
              {callState === "connecting" && (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FED54A] animate-ping" />
                  <span className="text-black">{lang === "ja" ? "接続中…" : "Connecting..."}</span>
                </>
              )}
              {callState === "listening" && (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span className="text-red-600 font-bold">{lang === "ja" ? "🎙️ マイク録音中…" : "Listening..."}</span>
                </>
              )}
              {callState === "thinking" && (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FED54A] animate-spin" />
                  <span className="text-black">{lang === "ja" ? "💭 回答を考え中…" : "Thinking..."}</span>
                </>
              )}
              {callState === "speaking" && (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-pink-600">{lang === "ja" ? "🌸 アオイが回答中…" : "Speaking..."}</span>
                </>
              )}
              {callState === "error" && (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-red-600">{lang === "ja" ? "エラー" : "Error"}</span>
                </>
              )}
            </div>

            {/* Audio Mute Toggle */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted) stopVoice();
              }}
              className={`p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer ${
                isMuted ? "bg-red-500 text-white" : "bg-white text-black hover:bg-[#FED54A]"
              }`}
              title={isMuted ? "音声をオンにする" : "音声をミュートする"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "ja" ? "en" : "ja")}
              className="px-3 py-1.5 rounded-xl border-2 border-black bg-white text-xs font-black text-black hover:bg-[#FED54A] transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
            >
              {lang === "ja" ? "EN" : "日本語"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl mx-auto w-full space-y-8">
        
        {/* ============================================================== */}
        {/* 1. TOP TITLE HEADER                                             */}
        {/* ============================================================== */}
        <div className="text-center relative select-none">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FED54A] border-3 border-black text-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000] mb-3 transform -rotate-1">
            <Radio className="w-3.5 h-3.5 text-black animate-pulse" />
            <span className="bg-red-600 text-white px-2.5 py-0.5 rounded text-[11px] font-black">
              LIVE
            </span>
            <span>{lang === "ja" ? "面接官 × 志望者 音声対話モード" : "Voice Interview Mode"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight drop-shadow-xs leading-tight">
            {lang === "ja" ? "情熱ヒロイン アオイ" : "Heroine Aoi"}
          </h1>

          <p className="text-xs sm:text-sm text-gray-800 font-bold mt-2 max-w-xl mx-auto leading-relaxed">
            {lang === "ja"
              ? "マイクに向かって声で話しかけると、応募者の志望動機・強み・企画をアニメボイスで即座に回答します。"
              : "Speak with Aoi using your microphone. She answers your interview questions with an anime heroine voice in real-time."}
          </p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-16 h-2 bg-[#FED54A] border-2 border-black rounded-full" />
            <div className="w-8 h-2 bg-[#3B82F6] border-2 border-black rounded-full" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CORE SESSION CONTROLS: START / END CONVERSATION BUTTONS     */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!hasStartedSession ? (
            <button
              onClick={startConversation}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#FED54A] hover:bg-[#FACC15] text-black border-4 border-black font-black text-lg sm:text-xl rounded-2xl shadow-[6px_6px_0px_#000] active:translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Mic className="w-6 h-6 text-black group-hover:scale-110 transition-transform animate-pulse" />
              <span>{lang === "ja" ? "会話を始める (Start Conversation)" : "Start Conversation"}</span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <button
                onClick={endConversation}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white border-3 border-black font-black text-sm rounded-2xl shadow-[4px_4px_0px_#000] active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>{lang === "ja" ? "会話を終了する (End)" : "End Conversation"}</span>
              </button>

              {callState === "listening" ? (
                <button
                  onClick={() => finishListeningAndSend()}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-center gap-2 animate-pulse cursor-pointer"
                >
                  <MicOff className="w-4 h-4" />
                  <span>話し終わったので送信！</span>
                </button>
              ) : (
                <button
                  onClick={startListening}
                  disabled={callState === "thinking"}
                  className="px-6 py-3 bg-[#FED54A] hover:bg-[#FACC15] disabled:bg-gray-200 text-black font-black text-sm rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-red-600 fill-current" />
                  <span>🎙️ 話しかける（音声入力）</span>
                </button>
              )}

              {callState === "speaking" && (
                <button
                  onClick={stopVoice}
                  className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 border-3 border-black text-slate-800 cursor-pointer"
                  title="音声を止める"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Continuous Hands-Free Dialogue Checkbox */}
        <div className="flex items-center justify-center">
          <label className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black text-slate-800 cursor-pointer select-none hover:bg-amber-50">
            <input
              type="checkbox"
              checked={continuousMode}
              onChange={(e) => setContinuousMode(e.target.checked)}
              className="w-4 h-4 rounded border-2 border-black accent-red-600"
            />
            <span>🔄 ハンズフリー連続対話モード（回答後に自動でマイク待機）</span>
          </label>
        </div>

        {/* Error notification banner */}
        {errorMessage && (
          <div className="bg-red-50 border-3 border-red-500 text-red-900 rounded-2xl p-4 shadow-[4px_4px_0px_#EF4444] flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-black leading-snug">{errorMessage}</p>
              <p className="text-[11px] font-bold text-red-700">
                ※ ブラウザのアドレスバーでマイクアクセスを「許可」してください。下のワンタップ質問やテキスト入力でも対話いただけます！
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. MAIN CHARACTER INTERACTION STAGE                            */}
        {/* ============================================================== */}
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 pop-comic-panel relative overflow-hidden shadow-[8px_8px_0px_#000] flex flex-col items-center text-center">
          
          <div className="absolute inset-0 bg-pop-dots-blue-soft opacity-15 pointer-events-none" />

          {/* Status Badge */}
          <div className="mb-3">
            {callState === "listening" && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600 text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] animate-bounce">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                マイクで聞いています… 話してください！
              </div>
            )}
            {callState === "thinking" && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FED54A] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] animate-pulse">
                <span>⚡ ネーム構成中…（AI応答を生成中）</span>
              </div>
            )}
            {callState === "speaking" && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500 text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000]">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>🌸 アオイが熱弁中！</span>
              </div>
            )}
            {callState === "idle" && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white font-black text-xs border-2 border-black">
                <span>🎙️ 「話しかける」を押して喋ってください</span>
              </div>
            )}
          </div>

          {/* Character Avatar with dynamic lipsync & emotional aura */}
          <div className="relative my-2">
            <CharacterAvatar
              emotion={currentEmotion}
              characterStyle="hero"
              isSpeaking={callState === "speaking"}
              speechVolume={speakingLipsyncVolume}
              size="lg"
            />
          </div>

          <div className="mt-2 mb-2">
            <h2 className="text-lg font-black text-black">
              {lang === "ja" ? "情熱ヒロイン アオイ" : "Heroine Aoi"}
            </h2>
            <span className="text-[11px] font-black text-black px-3 py-0.5 rounded-full bg-[#FED54A] border-2 border-black inline-block shadow-xs mt-1">
              {lang === "ja" ? "講談社専属・アニメヒロインボイス" : "Kodansha Dedicated • Anime Voice"}
            </span>
          </div>

          {/* Real-time Microphone Input Volume Meter from VoiceCallModal */}
          {callState === "listening" && (
            <div className="w-64 bg-slate-100 rounded-full border-2 border-black p-1 my-3 shadow-[2px_2px_0px_#000]">
              <div className="flex items-center justify-between text-[10px] font-bold px-2 text-slate-700 mb-0.5">
                <span>🎤 マイク入力感度</span>
                <span>{micVolume}%</span>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 transition-all duration-75"
                  style={{ width: `${Math.max(5, micVolume)}%` }}
                />
              </div>
            </div>
          )}

          {/* Animated Comic Equalizer Bars when speaking */}
          {callState === "speaking" && (
            <div className="flex items-center gap-1.5 my-3 h-8">
              {[40, 75, 100, 60, 90, 45, 80, 50, 70, 95, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-pink-500 animate-pulse transition-all duration-150"
                  style={{
                    height: `${Math.max(8, (h * (i % 2 === 0 ? 1 : 0.7)) / 3.2)}px`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Audio Blocked Autoplay Notice */}
          {audioBlocked && (
            <button
              onClick={() => {
                unlockAudioPlayer();
                if (latestReplyRef.current) {
                  playCharacterSpeech(latestReplyRef.current, handleSpeechFinished);
                }
              }}
              className="my-2 px-4 py-2 bg-[#FED54A] hover:bg-[#FACC15] text-black font-black text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] animate-bounce flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 音声を再生する（ブラウザの自動再生を許可）</span>
            </button>
          )}

          {/* User Live Speech Transcript Bubble */}
          {(transcript || interimTranscript || callState === "listening") && (
            <div className="w-full max-w-lg bg-amber-100 border-3 border-black rounded-2xl p-3.5 my-2 shadow-[3px_3px_0px_#000] text-center">
              <span className="text-[10px] font-black text-amber-900 block mb-0.5">
                面接官（あなた）のお声:
              </span>
              <p className="font-black text-slate-900 text-sm sm:text-base">
                {transcript || interimTranscript || "（お話し中… 音声認識および録音中）"}
              </p>
              {transcript && callState === "listening" && (
                <button
                  onClick={() => finishListeningAndSend()}
                  className="mt-2 px-4 py-1 rounded-full bg-red-600 text-white font-black text-xs border border-black shadow-xs hover:bg-red-700 cursor-pointer"
                >
                  今すぐ送信する
                </button>
              )}
            </div>
          )}

          {/* Bot Latest Response Bubble */}
          {lastBotReply && callState !== "listening" && (
            <div className="w-full max-w-2xl bg-[#FED54A] text-black rounded-3xl border-4 border-black p-5 sm:p-6 shadow-[5px_5px_0px_#000] relative text-left my-2">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b-2 border-black/20">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${callState === "speaking" ? "bg-black animate-ping" : "bg-black"}`} />
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    {callState === "speaking" ? "🌸 アオイが声で熱弁中！" : "🌸 アオイからの回答"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {callState === "speaking" && (
                    <button
                      onClick={stopVoice}
                      className="px-2.5 py-0.5 rounded-lg bg-black text-white text-[10px] font-black border border-black flex items-center gap-1 cursor-pointer"
                    >
                      <Square className="w-3 h-3 fill-current" />
                      <span>停止</span>
                    </button>
                  )}

                  <button
                    onClick={() => playCharacterSpeech(lastBotReply, handleSpeechFinished)}
                    className="px-2.5 py-0.5 rounded-lg bg-white text-black text-[10px] font-black border-2 border-black shadow-[1px_1px_0px_#000] flex items-center gap-1 hover:bg-gray-100 cursor-pointer"
                    title="もう一度音声で聴く"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>もう一度聴く</span>
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base font-black text-black leading-relaxed whitespace-pre-wrap">
                {lastBotReply.replace(/\[EMOTION:\s*\w+\]/gi, "").trim()}
              </p>
            </div>
          )}

          {/* Text Input Row for Typed Questions */}
          <form onSubmit={handleTextSubmit} className="w-full max-w-xl flex items-center gap-2 mt-4">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={lang === "ja" ? "テキストでも質問できます…（例：強みや留学について教えて）" : "Type a question here..."}
              disabled={callState === "thinking"}
              className="flex-1 bg-white border-3 border-black rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-black placeholder-gray-500 shadow-[3px_3px_0px_#000] focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || callState === "thinking"}
              className="px-5 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-xl border-3 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 cursor-pointer active:translate-y-0.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>送信</span>
            </button>
          </form>
        </div>

        {/* ============================================================== */}
        {/* 4. PRESET TOPIC CHIPS (Click to ask immediately in voice)       */}
        {/* ============================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-black" />
              <h3 className="text-sm sm:text-base font-black text-black">
                {lang === "ja" ? "ワンタップ質問（クリックすると即座に音声で答えます）：" : "One-Tap Questions:"}
              </h3>
            </div>
            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-xs font-black text-[#3B82F6] hover:underline"
              >
                {showHistory ? "対話履歴を隠す" : `対話履歴 (${history.length})`}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {presetQuestions.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    unlockAudioPlayer();
                    hasStartedSessionRef.current = true;
                    setHasStartedSession(true);
                    submitQuestion(q.prompt);
                  }}
                  disabled={callState === "thinking"}
                  className="px-3.5 py-2 bg-white hover:bg-[#FED54A] text-xs font-black rounded-xl border-2 border-black text-black shadow-[3px_3px_0px_#000] transition-all flex items-center gap-1.5 disabled:opacity-50 active:translate-y-0.5 cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{q.label}</span>
                </button>
              );
            })}
          </div>

          {/* Conversation History Drawer */}
          {showHistory && (
            <div className="w-full bg-white border-3 border-black rounded-2xl p-4 text-xs max-h-56 overflow-y-auto space-y-2 mt-2 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between border-b-2 border-black/10 pb-1 mb-2">
                <span className="font-black text-xs text-black">面接対話ログ</span>
                <button
                  onClick={() => setHistory([])}
                  className="text-[10px] text-gray-500 hover:text-red-600 font-bold"
                >
                  履歴をクリア
                </button>
              </div>
              {history.map((turn) => (
                <div
                  key={turn.id}
                  className={`p-2.5 rounded-xl border-2 border-black ${
                    turn.role === "interviewer"
                      ? "bg-[#3B82F6]/10 text-black"
                      : "bg-[#FED54A]/30 text-black font-bold"
                  }`}
                >
                  <span className="font-black text-[10px] block opacity-80 mb-0.5">
                    {turn.role === "interviewer" ? "👤 面接官" : "🌸 アオイ"}
                  </span>
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {turn.text.replace(/\[EMOTION:\s*\w+\]/gi, "").trim()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 5. GOOGLE AI STUDIO DIRECT LINK & BACK TO HOME                  */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-black text-white hover:bg-[#FED54A] hover:text-black border-3 border-black font-black text-xs sm:text-sm transition-all shadow-[4px_4px_0px_#000] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>{lang === "ja" ? "ポートフォリオTOPへ戻る" : "Back to Home"}</span>
          </Link>

          <a
            href="https://ai.studio/apps/aca49d1b-a881-4ecd-8785-9ebe5862214d"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FED54A] text-black border-3 border-black font-black text-xs sm:text-sm transition-all shadow-[4px_4px_0px_#000] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span>{lang === "ja" ? "Google AI Studioアプリを直接開く" : "Open in AI Studio App"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>
    </div>
  );
}