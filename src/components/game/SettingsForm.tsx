import { For } from "solid-js";
import { CHANGE_QUESTION_OPTIONS, ROUND_OPTIONS, TIMER_OPTIONS, formatChangeMode } from "@/game/constants";
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
      class={`rounded-xl px-3 py-3 text-xs font-black transition active:scale-[0.98] ${
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
    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-black text-white">تنظیمات</h2>
        <p class="mt-1 text-xs text-slate-300">زمان، راند و تعویض سؤال رو انتخاب کن.</p>
      </div>

      <fieldset>
        <legend class="mb-2 text-xs font-black text-slate-300">زمان سؤال</legend>
        <div class="grid grid-cols-4 gap-2">
          <For each={TIMER_OPTIONS}>
            {seconds => (
              <OptionButton<TimerDuration>
                selected={props.settings.timerSeconds === seconds}
                value={seconds}
                label={`${seconds}ث`}
                onSelect={timerSeconds => props.onChange({ ...props.settings, timerSeconds })}
              />
            )}
          </For>
        </div>
      </fieldset>

      <div class="grid grid-cols-2 gap-3">
        <fieldset>
          <legend class="mb-2 text-xs font-black text-slate-300">راند</legend>
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
          <legend class="mb-2 text-xs font-black text-slate-300">تعویض</legend>
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
        </fieldset>
      </div>

      <p class="text-[11px] leading-5 text-slate-400">حالت محدود امتیاز سؤال را کم می‌کند، نامحدود جریمه ندارد.</p>
    </div>
  );
}
