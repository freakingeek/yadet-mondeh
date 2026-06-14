import type { ParentProps } from "solid-js";

type GameCardProps = ParentProps<{
  class?: string;
}>;

export default function GameCard(props: GameCardProps) {
  return (
    <section class={`rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur ${props.class ?? ""}`}>
      {props.children}
    </section>
  );
}
