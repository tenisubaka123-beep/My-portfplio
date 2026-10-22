// Web Audio API procedural manga sound effects & Web Speech synthesis helper
import { AnimeVoiceConfig, CharacterStyle } from '@/types/assistant';

let audioCtx: AudioContext | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;
let speechAnalyserNode: AnalyserNode | null = null;
let volumeAnimId: number | null = null;
let unlockedAudioElement: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let utteranceWatchdogTimer: NodeJS.Timeout | null = null;
let speechResumeInterval: NodeJS.Timeout | null = null;
let cachedAnimeVoice: SpeechSynthesisVoice | null = null;

export const DEFAULT_ANIME_VOICE_CONFIG: AnimeVoiceConfig = {
  pitch: 1.0, // Natural prosody (allows neural AI voice models to express authentic anime inflection smoothly without robotic distortion)
  rate: 1.05, // Smooth, lively anime heroine delivery pace
  playAnimeSting: false,
};

/**
 * Return all detected Japanese speech synthesis voices
 */
export function getJapaneseVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(
    (v) =>
      v.lang === 'ja-JP' ||
      v.lang === 'ja_JP' ||
      v.lang.startsWith('ja') ||
      /japanese/i.test(v.name)
  );
}

/**
 * Update and cache the single best anime female character voice
 */
function refreshCachedAnimeVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const jaVoices = getJapaneseVoices();
  const allVoices = window.speechSynthesis.getVoices();
  const pool = jaVoices.length > 0 ? jaVoices : allVoices;
  if (pool.length === 0) return null;

  // Premier natural anime female voices:
  // 1. Nanami Online (Natural) in Microsoft Edge - the definitive anime heroine voice
  // 2. Sayaka / Ayumi in Windows OneCore - youthful anime girl voices
  // 3. Google 日本語 in Google Chrome
  // 4. Kyoko / Otoya in Safari
  const topAnimeFemalePatterns = [
    /nanami.*natural/i,
    /nanami/i,
    /shiori.*natural/i,
    /sayaka/i,
    /ayumi/i,
    /google\s*日本語/i,
    /kyoko/i,
    /mizuki/i,
    /mei/i,
  ];

  for (const pattern of topAnimeFemalePatterns) {
    const found = pool.find((v) => pattern.test(v.name) && !/desktop|ichiro|keita|male/i.test(v.name));
    if (found) {
      cachedAnimeVoice = found;
      return found;
    }
  }

  // Next, any smooth non-desktop female
  const smoothFemale = pool.find((v) => !/desktop|ichiro|keita|male/i.test(v.name) && /female|woman|natural|online/i.test(v.name));
  if (smoothFemale) {
    cachedAnimeVoice = smoothFemale;
    return smoothFemale;
  }

  // Any non-desktop voice
  const nonDesktop = pool.find((v) => !/desktop|ichiro|keita|male/i.test(v.name));
  if (nonDesktop) {
    cachedAnimeVoice = nonDesktop;
    return nonDesktop;
  }

  // Fallback to pool
  cachedAnimeVoice = pool[0] || null;
  return cachedAnimeVoice;
}

// Pre-warm voices listener as soon as module loads in browser
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    refreshCachedAnimeVoice();
    window.speechSynthesis.onvoiceschanged = () => {
      refreshCachedAnimeVoice();
    };
  } catch {
    // ignore
  }
}

/**
 * Get the single best, ultra-smooth anime female character voice
 */
export function getBestAnimeVoice(preferredVoiceName?: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  
  if (preferredVoiceName) {
    const allVoices = window.speechSynthesis.getVoices();
    const match = allVoices.find((v) => v.name === preferredVoiceName);
    if (match) return match;
  }

  if (cachedAnimeVoice) {
    return cachedAnimeVoice;
  }

  return refreshCachedAnimeVoice();
}

/**
 * Get or create the shared AudioContext
 */
export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Unlock AudioContext and HTMLAudioElement on first user interaction
 */
export function unlockAudioPlayer(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Play a microscopic silent buffer to unlock browser audio pipeline
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);

    if (!unlockedAudioElement) {
      unlockedAudioElement = new Audio(
        'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='
      );
    }
    unlockedAudioElement.play().catch(() => {});

    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    return true;
  } catch (err) {
    console.warn('Audio unlock warning:', err);
    return false;
  }
}

/**
 * Helper to convert base64 to ArrayBuffer
 */
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Stop any current speech playback across all engines
 */
export function stopAllSpeech(): void {
  if (volumeAnimId !== null) {
    cancelAnimationFrame(volumeAnimId);
    volumeAnimId = null;
  }
  if (utteranceWatchdogTimer !== null) {
    clearTimeout(utteranceWatchdogTimer);
    utteranceWatchdogTimer = null;
  }
  if (speechResumeInterval !== null) {
    clearInterval(speechResumeInterval);
    speechResumeInterval = null;
  }
  activeUtterance = null;

  if (currentSourceNode) {
    try {
      currentSourceNode.stop();
      currentSourceNode.disconnect();
    } catch {
      // ignore
    }
    currentSourceNode = null;
  }
  if (unlockedAudioElement) {
    try {
      unlockedAudioElement.pause();
      unlockedAudioElement.currentTime = 0;
    } catch {
      // ignore
    }
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

function ensureWavHeader(buffer: ArrayBuffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): ArrayBuffer {
  const bytes = new Uint8Array(buffer);
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x41 && bytes[10] === 0x56 && bytes[11] === 0x45
  ) {
    return buffer;
  }
  const dataSize = bytes.length;
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  view.setUint32(0, 0x52494646, false); // 'RIFF'
  view.setUint32(4, 36 + dataSize, true);
  view.setUint32(8, 0x57415645, false); // 'WAVE'
  view.setUint32(12, 0x666d7420, false); // 'fmt '
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
  view.setUint16(32, numChannels * (bitsPerSample / 8), true);
  view.setUint16(34, bitsPerSample, true);
  view.setUint32(36, 0x64617461, false); // 'data'
  view.setUint32(40, dataSize, true);

  const combined = new Uint8Array(44 + dataSize);
  combined.set(new Uint8Array(header), 0);
  combined.set(bytes, 44);
  return combined.buffer;
}

/**
 * Play Base64 Audio using high-performance Web Audio API with fallback
 */
export async function playBase64Audio(
  base64Audio: string,
  onStart?: () => void,
  onEnd?: () => void,
  onVolumeChange?: (vol: number) => void,
  onError?: (err: unknown) => void
): Promise<void> {
  stopAllSpeech();

  const cleanBase64 = base64Audio.replace(/^data:audio\/\w+;base64,/, '');

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const rawBuffer = base64ToArrayBuffer(cleanBase64);
    const arrayBuffer = ensureWavHeader(rawBuffer);
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;

    // Create analyser for speaking lipsync animation
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(ctx.destination);

    currentSourceNode = source;
    speechAnalyserNode = analyser;

    // Track volume for animated lipsync & aura
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const trackVolume = () => {
      if (!currentSourceNode || !speechAnalyserNode) return;
      speechAnalyserNode.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;
      const vol = Math.min(100, Math.round((avg / 128) * 100));
      onVolumeChange?.(vol);
      volumeAnimId = requestAnimationFrame(trackVolume);
    };

    source.onended = () => {
      if (volumeAnimId !== null) {
        cancelAnimationFrame(volumeAnimId);
        volumeAnimId = null;
      }
      onVolumeChange?.(0);
      currentSourceNode = null;
      onEnd?.();
    };

    onStart?.();
    source.start(0);
    trackVolume();
    return;
  } catch (webAudioErr) {
    console.warn('Web Audio decode failed, attempting HTMLAudioElement fallback:', webAudioErr);

    // Tier 2: HTMLAudioElement fallback
    try {
      const audio = unlockedAudioElement || new Audio();
      unlockedAudioElement = audio;
      audio.src = `data:audio/wav;base64,${cleanBase64}`;

      audio.onplay = () => onStart?.();
      audio.onended = () => {
        onVolumeChange?.(0);
        onEnd?.();
      };
      audio.onerror = (e) => {
        console.warn('HTMLAudioElement error:', e);
        onError?.(e);
      };

      await audio.play();
    } catch (htmlAudioErr) {
      console.warn('HTMLAudioElement failed:', htmlAudioErr);
      onError?.(htmlAudioErr);
    }
  }
}

/**
 * Manga sound effects using procedural synthesis
 */
export const playMangaSoundEffect = (type: 'boom' | 'sparkle' | 'page' | 'pop') => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'boom') {
      // Dramatic manga impact (ドドン！)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.45);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'sparkle') {
      // Manga sparkle / epiphany (キラーン！)
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.28);
      });
    } else if (type === 'page') {
      // Manga page turn (サッ！)
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.linearRampToValueAtTime(400, now + 0.15);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start(now);
    } else if (type === 'pop') {
      // Comic pop (ポンッ！)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch (err) {
    console.warn('Audio effect playback error:', err);
  }
};

/**
 * Siri-style audio chimes for voice interaction cueing
 */
export const playSiriChime = (type: 'listen' | 'done') => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    if (type === 'listen') {
      // Pleasant double ascending tone
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.frequency.setValueAtTime(520, now);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.1);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.frequency.setValueAtTime(680, now + 0.07);
      gain2.gain.setValueAtTime(0.08, now + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.07);
      osc2.stop(now + 0.2);
    } else {
      // Gentle confirmation tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(740, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // ignore
  }
};

/**
 * Web Speech API with authentic Japanese Anime Character Voice tuning
 * Guarantees smooth, natural anime heroine delivery without robotic artifacts
 */
export const speakWithWebSpeech = (
  text: string,
  configOrStyle?: CharacterStyle | AnimeVoiceConfig,
  onStart?: () => void,
  onEnd?: () => void,
  onVolumeChange?: (vol: number) => void
): SpeechSynthesisUtterance | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return null;
  }

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
  } catch {
    // ignore
  }

  // Pick single best anime heroine voice
  let preferredVoiceName: string | undefined;
  if (typeof configOrStyle === 'object' && configOrStyle !== null) {
    preferredVoiceName = configOrStyle.voiceName;
  }

  const selectedVoice = getBestAnimeVoice(preferredVoiceName);

  // Set natural pitch and lively anime pace tailored to the specific voice engine
  let pitch = 1.05;
  let rate = 1.05;

  if (selectedVoice) {
    const vName = selectedVoice.name.toLowerCase();
    if (vName.includes('nanami') || vName.includes('natural') || vName.includes('online')) {
      // Azure neural anime model: 1.0 pitch is required to avoid browser audio error and preserves full neural prosody
      pitch = 1.0;
      rate = 1.05;
    } else if (vName.includes('google')) {
      // Chrome neural cloud voice: smooth natural tone
      pitch = 1.05;
      rate = 1.05;
    } else if (vName.includes('sayaka') || vName.includes('ayumi')) {
      // Windows OneCore: youthful anime heroine tone
      pitch = 1.12;
      rate = 1.05;
    } else if (vName.includes('kyoko') || vName.includes('otoya')) {
      // macOS Safari voice
      pitch = 1.08;
      rate = 1.05;
    } else if (vName.includes('haruka') || vName.includes('desktop')) {
      // Windows legacy voice: elevate pitch out of flat mechanical drone
      pitch = 1.16;
      rate = 1.08;
    }
  }

  // Allow explicit config override if provided as object
  if (typeof configOrStyle === 'object' && configOrStyle !== null) {
    if (typeof configOrStyle.pitch === 'number' && !/natural|online/i.test(selectedVoice?.name || '')) {
      pitch = configOrStyle.pitch;
    }
    if (typeof configOrStyle.rate === 'number') {
      rate = configOrStyle.rate;
    }
  }

  // Detect emotion and play procedural anime sound effect
  if (text.includes('バァァァン') || text.includes('メラメラ') || text.includes('passionate') || text.includes('ドヤァ')) {
    playMangaSoundEffect('boom');
  } else if (text.includes('キラーン') || text.includes('sparkling')) {
    playMangaSoundEffect('sparkle');
  } else if (text.includes('ポンッ') || text.includes('ニコニコ') || text.includes('happy')) {
    playMangaSoundEffect('pop');
  }

  // Clean speech text from meta markers while preserving anime cadence
  let clean = text
    .replace(/\[EMOTION:\s*\w+\]/gi, '')
    .replace(/【.*?】/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/（.*?）/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/^[#*\-•\s]+/gm, '')
    .replace(/[*_~`#]/g, '')
    .replace(/[「」『』]/g, '、')
    .replace(/[:：]/g, '、')
    .replace(/[!！]+/g, '！')
    .replace(/[?？]+/g, '？')
    .replace(/[….]+/g, '、')
    .replace(/\s+/g, ' ')
    .trim();

  // Insert natural breath pauses after greetings and interjections for authentic anime heroine cadence
  clean = clean
    .replace(/面接官さん([！!])/g, '面接官さん、$1')
    .replace(/はじめまして([！!])/g, 'はじめまして、$1')
    .replace(/はいっ([！!])/g, 'はいっ、$1')
    .replace(/ありがとうございます([！!])/g, 'ありがとうございます、$1')
    .replace(/よろしくお願いいたします([！!])/g, 'よろしくお願いいたします、$1')
    .replace(/、、+/g, '、');

  if (!clean) {
    onEnd?.();
    return null;
  }

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = 'ja-JP';

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.pitch = pitch;
  utterance.rate = rate;

  // Retain active utterance globally so V8 garbage collector does not dispose of it mid-speech
  activeUtterance = utterance;

  let mouthInterval: NodeJS.Timeout | null = null;
  let hasHandledFinish = false;
  let hasRetried = false;

  const handleFinish = () => {
    if (hasHandledFinish) return;
    hasHandledFinish = true;

    if (mouthInterval) {
      clearInterval(mouthInterval);
      mouthInterval = null;
    }
    if (utteranceWatchdogTimer) {
      clearTimeout(utteranceWatchdogTimer);
      utteranceWatchdogTimer = null;
    }
    if (speechResumeInterval) {
      clearInterval(speechResumeInterval);
      speechResumeInterval = null;
    }
    activeUtterance = null;
    onVolumeChange?.(0);
    onEnd?.();
  };

  utterance.onstart = () => {
    onStart?.();
    mouthInterval = setInterval(() => {
      onVolumeChange?.(Math.floor(35 + Math.random() * 55));
    }, 130);

    // Keep-alive to prevent Chromium speech synthesis pause bug
    if (speechResumeInterval) clearInterval(speechResumeInterval);
    speechResumeInterval = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.resume();
      }
    }, 4000);
  };

  utterance.onend = handleFinish;
  utterance.onerror = (e) => {
    console.warn('SpeechSynthesis initial utterance error:', e);
    // Automatic retry with clean fallback voice and standard pitch
    if (!hasRetried && !hasHandledFinish) {
      hasRetried = true;
      try {
        const fallbackUtterance = new SpeechSynthesisUtterance(clean);
        fallbackUtterance.lang = 'ja-JP';
        if (selectedVoice) {
          fallbackUtterance.voice = selectedVoice;
        }
        fallbackUtterance.pitch = 1.0;
        fallbackUtterance.rate = 1.0;
        fallbackUtterance.onend = handleFinish;
        fallbackUtterance.onerror = () => handleFinish();
        activeUtterance = fallbackUtterance;
        window.speechSynthesis.speak(fallbackUtterance);
        return;
      } catch (retryErr) {
        console.warn('Fallback speech synthesis failed:', retryErr);
      }
    }
    handleFinish();
  };

  // Watchdog timer: If browser never fires onend (e.g. backgrounded or audio glitch), guarantee finish after reasonable duration
  const estimatedDurationMs = Math.max(3500, Math.min(25000, clean.length * 160 + 2500));
  if (utteranceWatchdogTimer) clearTimeout(utteranceWatchdogTimer);
  utteranceWatchdogTimer = setTimeout(() => {
    if (!hasHandledFinish) {
      console.warn('SpeechSynthesis watchdog triggered finish after', estimatedDurationMs, 'ms');
      handleFinish();
    }
  }, estimatedDurationMs);

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis speak error:', err);
    handleFinish();
  }

  return utterance;
};

/**
 * Test sample anime voice line
 */
export function testAnimeVoice(config?: AnimeVoiceConfig, onEnd?: () => void) {
  unlockAudioPlayer();
  const samplePhrase = 'はじめまして、面接官さん！私、講談社で世界中の読者の心をときめかせる作品を届けるため、全力でお話ししますねっ！';
  return speakWithWebSpeech(samplePhrase, config, undefined, onEnd);
}
