import { A, useNavigate } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import GameButton from "@/components/game/GameButton";
import GameCard from "@/components/game/GameCard";
import ResultScreen from "@/components/game/ResultScreen";
import Scoreboard from "@/components/game/Scoreboard";
import TimerCircle from "@/components/game/TimerCircle";
import { FAIL_MESSAGES, SUCCESS_MESSAGES, formatChangeMode } from "@/game/constants";
import { pickMessage } from "@/game/messages";
import { canChangeQuestion } from "@/game/scoring";
import { useGame } from "@/game/state";

export default function Play() {
  const navigate = useNavigate();
  const game = useGame();
  const [remaining, setRemaining] = createSignal(0);

  createEffect(() => {
    const session = game.session;
    const questionId = session?.currentQuestion?.id;

    if (!session || session.phase !== "question" || !questionId) {
      return;
    }

    if (session.settings.timerSeconds === "unlimited") {
      setRemaining(0);
      return;
    }

    setRemaining(session.settings.timerSeconds);
    const interval = setInterval(() => {
      setRemaining(current => {
        if (current <= 1) {
          clearInterval(interval);
          game.markFail();
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    onCleanup(() => clearInterval(interval));
  });

  const submitSuccess = () => {
    if (game.session?.phase === "question") {
      game.markSuccess();
    }
  };

  const next = () => {
    if (game.isLastTurn()) {
      game.nextTurn();
      navigate("/summary");
      return;
    }

    game.nextTurn();
  };

  const actionLabel = () => (game.isLastTurn() ? "دیدن نتیجه نهایی" : "نوبت بعدی");

  return (
    <Show
      when={game.session}
      fallback={
        <main dir="rtl" lang="fa" class="fixed inset-0 z-10 h-svh overflow-hidden px-4 pt-24 pb-8 text-white">
          <section class="mx-auto flex h-full max-w-md flex-col justify-center text-center">
            <GameCard>
              <p class="text-5xl">🫠</p>
              <h1 class="mt-5 text-3xl font-black">بازی فعالی پیدا نشد</h1>
              <p class="mt-3 leading-8 text-slate-300">اول بازیکن‌ها رو وارد کن تا بتونیم آبروریزی رو شروع کنیم.</p>
              <A href="/start" class="mt-6 block">
                <GameButton full>ساخت بازی جدید</GameButton>
              </A>
            </GameCard>
          </section>
        </main>
      }
    >
      {session => (
        <>
          <Show when={session().phase === "turn-intro"}>
            <main dir="rtl" lang="fa" class="fixed inset-0 z-10 h-svh overflow-hidden px-4 pt-24 pb-8 text-white">
              <section class="mx-auto flex h-full max-w-md flex-col justify-center gap-5">
                <GameCard class="text-center">
                  <p class="text-sm font-bold text-violet-200">
                    دور {session().roundIndex + 1} از {session().settings.rounds}
                  </p>
                  <h1 class="mt-4 text-5xl font-black leading-tight">نوبت {game.currentPlayer()?.name}</h1>
                  <p class="mt-4 leading-8 text-slate-300">گوشی رو بده بهش. وقتی آماده بود، شروع رو بزنه و بدون گریه جواب بده.</p>
                  <GameButton type="button" class="mt-8" full onClick={game.beginTurn}>
                    شروع نوبت
                  </GameButton>
                </GameCard>
                <GameCard>
                  <Scoreboard session={session()} compact />
                </GameCard>
              </section>
            </main>
          </Show>

          <Show when={session().phase === "question" && session().currentQuestion}>
            {question => (
              <main
                dir="rtl"
                lang="fa"
                class={`fixed inset-0 z-10 h-svh overflow-hidden px-4 pt-20 pb-6 text-white transition ${remaining() <= 3 ? "bg-rose-950" : ""}`}
                onClick={() => {
                  if (remaining() <= 3) submitSuccess();
                }}
              >
                <section class="mx-auto flex h-full max-w-md flex-col justify-between gap-5">
                  <div class="space-y-5">
                    <div class="flex items-center justify-between gap-3 text-sm font-bold text-slate-300">
                      <span>نوبت {game.currentPlayer()?.name}</span>
                      <span>
                        دور {session().roundIndex + 1}/{session().settings.rounds}
                      </span>
                    </div>

                    <TimerCircle remaining={remaining()} total={session().settings.timerSeconds} />

                    <Show when={remaining() <= 3}>
                      <div class="rounded-[2rem] bg-rose-500 p-6 text-center shadow-2xl shadow-rose-950/50">
                        <p class="text-sm font-black">کل صفحه رو لمس کن اگه جواب دادی!</p>
                        <strong class="mt-2 block text-8xl font-black">{remaining()}</strong>
                      </div>
                    </Show>

                    <GameCard class="text-center">
                      <p class="text-sm font-bold text-violet-200">سؤال سخت و ناجوانمردانه</p>
                      <h1 class="mt-4 text-3xl font-black leading-[1.7]">{question().text}</h1>
                      <p class="mt-5 rounded-2xl bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                        جواب رو بلند بگو؛ اگه مطمئنی زدی تو خال، ثبتش کن.
                      </p>
                    </GameCard>
                  </div>

                  <div class="space-y-3" onClick={event => event.stopPropagation()}>
                    <div class="grid grid-cols-2 gap-3">
                      <GameCard class="p-4 text-center">
                        <span class="block text-xs text-slate-400">امتیاز سؤال</span>
                        <strong class="text-3xl font-black text-violet-200">{session().currentTurnPoints}</strong>
                      </GameCard>
                      <GameCard class="p-4 text-center">
                        <span class="block text-xs text-slate-400">تعویض</span>
                        <strong class="text-xl font-black text-violet-200">{formatChangeMode(session().settings.changeQuestionMode)}</strong>
                      </GameCard>
                    </div>

                    <GameButton type="button" variant="success" full onClick={submitSuccess}>
                      جواب دادم، درست بود
                    </GameButton>
                    <GameButton
                      type="button"
                      variant="secondary"
                      full
                      disabled={!canChangeQuestion(session().settings.changeQuestionMode, session().changesUsedThisTurn)}
                      onClick={game.changeQuestion}
                    >
                      سؤال رو عوض کن ({session().changesUsedThisTurn} استفاده شده)
                    </GameButton>
                    <GameButton type="button" variant="danger" full onClick={game.markFail}>
                      نتونستم؛ باختم
                    </GameButton>
                  </div>
                </section>
              </main>
            )}
          </Show>

          <Show when={session().phase === "success"}>
            <ResultScreen
              outcome="success"
              title="قبول شدی!"
              message={pickMessage(SUCCESS_MESSAGES, session().results.length)}
              points={session().currentTurnPoints}
              actionLabel={actionLabel()}
              onAction={next}
            />
          </Show>

          <Show when={session().phase === "fail"}>
            <ResultScreen
              outcome="fail"
              title="باختی!"
              message={pickMessage(FAIL_MESSAGES, session().results.length)}
              points={0}
              actionLabel={actionLabel()}
              onAction={next}
            />
          </Show>
        </>
      )}
    </Show>
  );
}
