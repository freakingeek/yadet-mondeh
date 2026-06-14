import { For } from "solid-js";
import { CHANGE_QUESTION_OPTIONS, ROUND_OPTIONS, TIMER_OPTIONS } from "@/game/constants";
import type { ChangeQuestionMode, GameSettings, RoundCount, TimerDuration } from "@/game/types";

type SettingsFormProps = {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
};

function OptionButton<T extends string | number>(props: {
  selected: boolean;
  value: T;
  label: string;
  onSelect: (value: T) => void;
}) {
  return (
    <button
      type="button"
      class={`min-h-14 rounded-xl px-3 py-3 text-xs leading-5 font-black whitespace-pre-line transition active:scale-[0.98] ${
        props.selected
          ? "bg-violet-400 text-slate-950"
          : "bg-slate-950/60 text-slate-200 ring-1 ring-white/10 hover:bg-slate-800"
      }`}
      onClick={() => props.onSelect(props.value)}
    >
      {props.label}
    </button>
  );
}

export default function SettingsForm(props: SettingsFormProps) {
  return (
    <div class="space-y-5">
      <div class="text-xs font-bold text-slate-300">زمان، دور و تعویض سؤال رو انتخاب کن.</div>

      <fieldset>
        <legend class="mb-2 text-xs font-black text-slate-300">زمان سؤال</legend>
        <div class="grid grid-cols-3 gap-2 sm:grid-cols-5">
          <For each={TIMER_OPTIONS}>
            {seconds => (
              <OptionButton<TimerDuration>
                selected={props.settings.timerSeconds === seconds}
                value={seconds}
                label={seconds === "unlimited" ? "∞" : `${seconds}\nثانیه`}
                onSelect={timerSeconds => props.onChange({ ...props.settings, timerSeconds })}
              />
            )}
          </For>
        </div>
      </fieldset>

      <fieldset>
        <legend class="mb-2 text-xs font-black text-slate-300">دور</legend>
        <div class="grid grid-cols-3 gap-2">
          <For each={ROUND_OPTIONS}>
            {rounds => (
              <OptionButton<RoundCount>
                selected={props.settings.rounds === rounds}
                value={rounds}
                label={`${rounds}`}
                onSelect={rounds => props.onChange({ ...props.settings, rounds })}
              />
            )}
          </For>
        </div>
      </fieldset>

      <fieldset>
        <legend class="mb-2 text-xs font-black text-slate-300">تعویض سؤال</legend>
        <div class="grid grid-cols-3 gap-2">
          <For each={CHANGE_QUESTION_OPTIONS}>
            {mode => (
              <OptionButton<ChangeQuestionMode>
                selected={props.settings.changeQuestionMode === mode}
                value={mode}
                label={mode === "unlimited" ? "∞" : `${mode}`}
                onSelect={changeQuestionMode => props.onChange({ ...props.settings, changeQuestionMode })}
              />
            )}
          </For>
        </div>
        <p class="mt-3 text-[11px] leading-5 text-slate-400">
          حالت محدود امتیاز سؤال را کم می‌کند، نامحدود جریمه ندارد. برای تغییر بازیکن‌ها به مرحله قبل برگرد.
        </p>
      </fieldset>
    </div>
  );
}
