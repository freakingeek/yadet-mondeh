import { createContext, createEffect, createSignal, onCleanup, onMount, useContext, type ParentProps } from "solid-js";

const SONG_PATH = "/songs/play.ogg";
const MAX_PLAYBACK_RATE = 1.35;

type MusicContextValue = {
  startGlobalPlayback: () => void;
  restartForGameStart: () => void;
  setPlaybackRate: (rate: number) => void;
  resetPlaybackRate: () => void;
};

const MusicContext = createContext<MusicContextValue>();

export function MusicProvider(props: ParentProps) {
  const [audio, setAudio] = createSignal<HTMLAudioElement>();

  const ensurePlaying = () => {
    const element = audio();
    if (!element) return;
    void element.play().catch(() => undefined);
  };

  onMount(() => {
    const element = new Audio(SONG_PATH);
    element.loop = true;
    element.preload = "auto";
    setAudio(element);
    ensurePlaying();
  });

  createEffect(() => {
    audio();
    ensurePlaying();
  });

  onCleanup(() => {
    const element = audio();
    if (!element) return;
    element.pause();
    element.currentTime = 0;
  });

  const value: MusicContextValue = {
    startGlobalPlayback() {
      ensurePlaying();
    },
    restartForGameStart() {
      const element = audio();
      if (!element) return;
      element.currentTime = 0;
      element.playbackRate = 1;
      ensurePlaying();
    },
    setPlaybackRate(rate) {
      const element = audio();
      if (!element) return;
      element.playbackRate = Math.max(1, Math.min(MAX_PLAYBACK_RATE, rate));
      ensurePlaying();
    },
    resetPlaybackRate() {
      const element = audio();
      if (!element) return;
      element.playbackRate = 1;
      ensurePlaying();
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
