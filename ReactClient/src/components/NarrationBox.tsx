import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface NarrationBoxProps {
  narration: string;
  visibleText?: string;
}

const NarrationBox: React.FC<NarrationBoxProps> = ({ narration, visibleText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Get dark mode from Redux state
  const isDark = useSelector((state: RootState) => state.ui.darkMode);

  const startSpeech = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    const utterance = new window.SpeechSynthesisUtterance(narration);
    utterance.lang = "en-US";
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseSpeech = () => {
    if (synthRef.current.speaking && !synthRef.current.paused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (synthRef.current.paused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (minimized) {
    return (
      <div
        className={`flex items-center justify-between p-2 rounded-xl shadow-lg border transition-colors duration-300 cursor-pointer ${
          isDark
            ? "bg-gray-900 bg-opacity-90 border-gray-700 text-gray-100"
            : "bg-white bg-opacity-90 border-gray-200 text-gray-900"
        }`}
        style={{ position: "relative", zIndex: 20, minWidth: 120 }}
      >
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-xs mr-1">Play Explanation</span>
          {!isPlaying && (
            <button
              onClick={startSpeech}
              className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium shadow"
              aria-label="Play narration"
            >
              ▶
            </button>
          )}
          {isPlaying && !isPaused && (
            <button
              onClick={pauseSpeech}
              className="px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium shadow"
              aria-label="Pause narration"
            >
              ❚❚
            </button>
          )}
          {isPlaying && isPaused && (
            <button
              onClick={resumeSpeech}
              className="px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-xs font-medium shadow"
              aria-label="Resume narration"
            >
              ►
            </button>
          )}
          {(isPlaying || isPaused) && (
            <button
              onClick={stopSpeech}
              className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-medium shadow"
              aria-label="Stop narration"
            >
              ■
            </button>
          )}
        </div>
        <button
          onClick={() => setMinimized(false)}
          className="ml-2 px-2 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white text-xs font-medium shadow"
          aria-label="Expand narration box"
        >
          ⬆
        </button>
      </div>
    );
  }

  return (
    <div
      className={`mt-4 mb-2 p-4 rounded-xl shadow-lg border transition-colors duration-300 ${
        isDark
          ? "bg-gray-900 bg-opacity-90 border-gray-700 text-gray-100"
          : "bg-white bg-opacity-90 border-gray-200 text-gray-900"
      }`}
      style={{ position: "relative", zIndex: 20 }}
    >
      {/* Inject style for .shiv-highlight color based on dark mode */}
      <style>{`
        .shiv-highlight {
          color: ${isDark ? '#c4b5fd' : '#7c3aed'};
          transition: color 0.2s;
        }
      `}</style>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-base">How does SHIVA work?</span>
        <div className="flex gap-2 items-center">
          {!isPlaying && (
            <button
              onClick={startSpeech}
              className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium shadow"
              aria-label="Play narration"
            >
              ▶
            </button>
          )}
          {isPlaying && !isPaused && (
            <button
              onClick={pauseSpeech}
              className="px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium shadow"
              aria-label="Pause narration"
            >
              ❚❚
            </button>
          )}
          {isPlaying && isPaused && (
            <button
              onClick={resumeSpeech}
              className="px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-xs font-medium shadow"
              aria-label="Resume narration"
            >
              ►
            </button>
          )}
          {(isPlaying || isPaused) && (
            <button
              onClick={stopSpeech}
              className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-medium shadow"
              aria-label="Stop narration"
            >
              ■
            </button>
          )}
          <button
            onClick={() => setMinimized(true)}
            className="ml-2 px-2 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white text-xs font-medium shadow"
            aria-label="Minimize narration box"
          >
            ⬇
          </button>
        </div>
      </div>
      <div className="text-sm leading-relaxed whitespace-pre-line">
        {/* Rendering narration as HTML is safe here because the content is trusted and not user-supplied */}
        <span dangerouslySetInnerHTML={{ __html: visibleText || narration }} />
      </div>
    </div>
  );
};

export default NarrationBox; 