import { type ParentProps } from "solid-js";
import { GameProvider } from "@/providers/game";
import { MusicProvider } from "@/providers/music";

export default function Providers(props: ParentProps) {
  return (
    <MusicProvider>
      <GameProvider>{props.children}</GameProvider>
    </MusicProvider>
  );
}
