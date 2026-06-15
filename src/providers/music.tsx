import { createContext, onCleanup, useContext, type ParentProps } from "solid-js";

const SONG_PATH = "/songs/play.ogg";
const MAX_PLAYBACK_RATE = 1.35;

type MusicContextValue = {
  startForGame: () => void;
  setPlaybackRate: (rate: number) => void;
  resetPlaybackRate: () => void;
};

const MusicContext = createContext<MusicContextValue>();

export function MusicProvider(props: ParentProps) {
  let element: HTMLAudioElement | undefined;

  const ensureElement = () => {
    if (!element) {
      element = new Audio(SONG_PATH);
      element.loop = true;
      element.preload = "auto";
    }
    return element;
  };

  onCleanup(() => {
    element?.pause();
    element = undefined;
  });

  const value: MusicContextValue = {
    startForGame() {
      const audio = ensureElement();
      audio.currentTime = 0;
      audio.playbackRate = 1;
      void audio.play().catch(() => undefined);
    },
    setPlaybackRate(rate) {
      const audio = element;
      if (!audio) return;
      audio.playbackRate = Math.max(1, Math.min(MAX_PLAYBACK_RATE, rate));
    },
    resetPlaybackRate() {
      const audio = element;
      if (!audio) return;
      audio.playbackRate = 1;
    },
  };

  return <MusicContext.Provider value={value}>{props.children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used inside MusicProvider");
  }

  return context;
}
