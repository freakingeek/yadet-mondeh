import type { JSX } from "solid-js";
import GameButton from "./GameButton";

type ResultScreenProps = {
  outcome: "success" | "fail";
  title: string;
  message: string;
  points: number;
  actionLabel: string;
  onAction: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
};

export default function ResultScreen(props: ResultScreenProps) {
  const success = () => props.outcome === "success";

  return (
    <main
      dir="rtl"
      lang="fa"
      class={`min-h-[calc(100vh-4rem)] px-4 py-8 text-white ${
        success()
          ? "bg-gradient-to-br from-emerald-500 via-emerald-700 to-slate-950"
          : "bg-gradient-to-br from-rose-500 via-red-800 to-slate-950"
      }`}
    >
      <section class="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center text-center">
        <div class="mb-6 text-7xl">{success() ? "🏆" : "💀"}</div>
        <h1 class="text-5xl font-black leading-tight">{props.title}</h1>
        <p class="mt-5 text-xl font-bold leading-9 text-white/90">{props.message}</p>
        <div class="my-8 rounded-[2rem] bg-white/15 px-8 py-5 ring-1 ring-white/20">
          <span class="block text-sm text-white/70">امتیاز این نوبت</span>
          <strong class="text-4xl font-black">{props.points}</strong>
        </div>
        <GameButton type="button" variant={success() ? "success" : "danger"} full onClick={props.onAction}>
          {props.actionLabel}
        </GameButton>
      </section>
    </main>
  );
}
