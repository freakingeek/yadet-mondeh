import type { TimerDuration } from "@/game/types";

type TimerCircleProps = {
  remaining: number;
  total: TimerDuration;
};

export default function TimerCircle(props: TimerCircleProps) {
  const isUnlimited = () => props.total === "unlimited";
  const urgent = () => !isUnlimited() && props.remaining <= 3;
  const progress = () => {
    if (isUnlimited()) return 100;
    return Math.max(0, Math.min(100, (props.remaining / props.total) * 100));
  };

  return (
    <div class="flex flex-col items-center gap-3">
      <div
        class={`grid h-32 w-32 place-items-center rounded-full text-4xl font-black shadow-2xl transition ${
          urgent()
            ? "animate-pulse bg-rose-500 text-white shadow-rose-950/50"
            : "bg-violet-400 text-slate-950 shadow-violet-950/30"
        }`}
        style={{ background: urgent() ? undefined : `conic-gradient(#a78bfa ${progress()}%, rgba(255,255,255,.12) 0)` }}
      >
        <div class="grid h-24 w-24 place-items-center rounded-full bg-slate-950 text-white">{isUnlimited() ? "∞" : props.remaining}</div>
      </div>
      <span class={`text-sm font-bold ${urgent() ? "text-rose-200" : "text-slate-300"}`}>
        {urgent() ? "زود باش!" : isUnlimited() ? "زمان نامحدود" : "زمان باقی‌مانده"}
      </span>
    </div>
  );
}
