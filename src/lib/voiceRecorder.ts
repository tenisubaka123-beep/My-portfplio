// Bulletproof voice recording & volume analyzer for cross-browser support
export interface VoiceRecordingSession {
  stop: () => Promise<{ audioBase64: string; mimeType: string; blob: Blob }>;
  cancel: () => void;
  getVolume: () => number;
}

export async function startAudioRecording(
  onVolumeChange?: (volume: number) => void
): Promise<VoiceRecordingSession> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  // Setup Web Audio Analyser for real-time mic visualizer
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioContextClass();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  let animationFrameId: number | null = null;
  let currentVolume = 0;

  const checkVolume = () => {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const avg = sum / dataArray.length;
    // Normalize to 0 - 100
    currentVolume = Math.min(100, Math.round((avg / 128) * 100));
    onVolumeChange?.(currentVolume);
    animationFrameId = requestAnimationFrame(checkVolume);
  };
  checkVolume();

  // Determine supported mimeType
  let mimeType = 'audio/webm';
  if (typeof MediaRecorder !== 'undefined') {
    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      mimeType = 'audio/webm;codecs=opus';
    } else if (MediaRecorder.isTypeSupported('audio/webm')) {
      mimeType = 'audio/webm';
    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
      mimeType = 'audio/mp4';
    } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
      mimeType = 'audio/ogg';
    }
  }

  const mediaRecorder = new MediaRecorder(stream, { mimeType });
  const audioChunks: Blob[] = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.start(100);

  const cleanup = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    try {
      analyser.disconnect();
      source.disconnect();
      audioCtx.close();
    } catch {
      // ignore
    }
    stream.getTracks().forEach((track) => track.stop());
  };

  return {
    getVolume: () => currentVolume,
    cancel: () => {
      try {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      } catch {
        // ignore
      }
      cleanup();
    },
    stop: () => {
      return new Promise((resolve, reject) => {
        mediaRecorder.onstop = () => {
          cleanup();
          const audioBlob = new Blob(audioChunks, { type: mimeType });
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1] || '';
            resolve({
              audioBase64: base64String,
              mimeType,
              blob: audioBlob,
            });
          };
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(audioBlob);
        };

        try {
          if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
          } else {
            cleanup();
            resolve({ audioBase64: '', mimeType, blob: new Blob() });
          }
        } catch (err) {
          cleanup();
          reject(err);
        }
      });
    },
  };
}
