import type { JSX, ParentProps } from "solid-js";

type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "ghost";

type GameButtonProps = ParentProps<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    full?: boolean;
  }
>;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-violet-500 text-white shadow-violet-950/30 hover:bg-violet-400",
  secondary: "bg-slate-800 text-slate-100 ring-1 ring-white/10 hover:bg-slate-700",
  success: "bg-emerald-500 text-white shadow-emerald-950/30 hover:bg-emerald-400",
  danger: "bg-rose-500 text-white shadow-rose-950/30 hover:bg-rose-400",
  ghost: "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15",
};

export default function GameButton(props: GameButtonProps) {
  const variant = () => props.variant ?? "primary";

  return (
    <button
      {...props}
      class={`rounded-2xl px-5 py-4 text-base font-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant()]} ${
        props.full ? "w-full" : ""
      } ${props.class ?? ""}`}
    >
      {props.children}
    </button>
  );
}
