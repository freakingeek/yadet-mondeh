import type { TimerDuration } from "@/game/types";

type TimerCircleProps = {
  remaining: number;
  total: TimerDuration;
  progress: number;
  urgent?: boolean;
};

export default function TimerCircle(props: TimerCircleProps) {
  const isUnlimited = () => props.total === "unlimited";
  const ringProgress = () => {
    if (isUnlimited()) {
      return 100;
    }

    return Math.max(0, Math.min(100, props.progress));
  };

  const ringColor = () => (props.urgent ? "#f43f5e" : "#a78bfa");

  return (
    <div class="flex flex-col items-center gap-3">
      <div
        class={`timer-circle-ring grid h-32 w-32 place-items-center rounded-full text-4xl font-black shadow-2xl ${
          props.urgent ? "shadow-rose-950/50" : "shadow-violet-950/30"
        }`}
        style={{
          background: `conic-gradient(${ringColor()} ${ringProgress()}%, rgba(255,255,255,.12) 0)`,
        }}
      >
        <div
          class={`grid h-24 w-24 place-items-center rounded-full bg-slate-950 font-black transition-colors duration-500 ${
            props.urgent ? "text-rose-300" : "text-white"
          }`}
        >
          {isUnlimited() ? "∞" : props.remaining}
        </div>
      </div>
      <span
        class={`text-sm font-bold transition-colors duration-500 ${props.urgent ? "text-rose-300" : "text-slate-300"}`}
      >
        {isUnlimited() ? "زمان نامحدود" : "زمان باقی‌مانده"}
      </span>
    </div>
  );
}
