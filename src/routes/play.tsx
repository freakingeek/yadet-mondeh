import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import PageMeta from "@/components/PageMeta";
import GameButton from "@/components/game/GameButton";
import GameCard from "@/components/game/GameCard";
import ResultScreen from "@/components/game/ResultScreen";
import Scoreboard from "@/components/game/Scoreboard";
import TimerCircle from "@/components/game/TimerCircle";
import { FAIL_MESSAGES, SUCCESS_MESSAGES } from "@/game/constants";
import { pickMessage } from "@/game/messages";
import { canChangeQuestion } from "@/game/scoring";
import { useGame } from "@/game/state";

export default function Play() {
  const navigate = useNavigate();
  const game = useGame();
  const [remaining, setRemaining] = createSignal(0);
  const [progress, setProgress] = createSignal(100);

  createEffect(() => {
    if (!game.session) {
      game.resetGame();
      navigate("/");
    }
  });

  createEffect(() => {
    const session = game.session;
    const questionId = session?.currentQuestion?.id;

    if (!session || session.phase !== "question" || !questionId) {
      return;
    }

    if (session.settings.timerSeconds === "unlimited") {
      setRemaining(0);
      setProgress(100);
      return;
    }

    const totalSeconds = session.settings.timerSeconds;
    const deadline = Date.now() + totalSeconds * 1000;
    let frame = 0;

    const tick = () => {
      const leftMs = deadline - Date.now();

      if (leftMs <= 0) {
        setRemaining(0);
        setProgress(0);
        game.markFail();
        return;
      }

      setRemaining(Math.ceil(leftMs / 1000));
      setProgress((leftMs / (totalSeconds * 1000)) * 100);
      frame = requestAnimationFrame(tick);
    };

    setRemaining(totalSeconds);
    setProgress(100);
    frame = requestAnimationFrame(tick);

    onCleanup(() => cancelAnimationFrame(frame));
  });

  const isUrgent = () => remaining() <= 3 && remaining() > 0;

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
    <>
      <PageMeta
        title="در حال بازی"
        description="نوبت بازیکن، سؤال فعلی و شمارش معکوس بازی یادت مونده؟ را در این صفحه دنبال کن."
        path="/play"
        noindex
      />
      <Show when={game.session}>
      {session => (
        <>
          <Show when={session().phase === "turn-intro"}>
            <main dir="rtl" lang="fa" class="fixed inset-0 z-10 h-svh overflow-hidden px-4 pt-8 pb-8 text-white">
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
                class={`fixed inset-0 z-10 h-svh overflow-hidden px-4 pt-8 pb-6 text-white transition-colors duration-500 ${isUrgent() ? "bg-rose-950" : ""}`}
                onClick={() => {
                  if (isUrgent()) {
                    submitSuccess();
                  }
                }}
              >
                <section class="mx-auto flex h-full max-w-md flex-col justify-between gap-5">
                  <div class="space-y-5">
                    <TimerCircle
                      remaining={remaining()}
                      total={session().settings.timerSeconds}
                      progress={progress()}
                      urgent={isUrgent()}
                    />

                    <GameCard class="relative text-center">
                      <p class="text-sm font-bold text-violet-200">سؤال سخت و ناجوانمردانه</p>
                      <h1 class="mt-4 text-3xl font-black leading-[1.7]">{question().text}</h1>
                      <p class="mt-5 rounded-2xl bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                        جواب رو بلند بگو؛ اگه مطمئنی زدی تو خال، ثبتش کن.
                      </p>
                      <Show when={isUrgent()}>
                        <p class="timer-hurry-text pointer-events-none absolute inset-x-0 top-full mt-4 text-6xl font-black text-rose-400" aria-live="polite">
                          زود باش!
                        </p>
                      </Show>
                    </GameCard>
                  </div>

                  <div class="space-y-3" onClick={event => event.stopPropagation()}>
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
    </>
  );
}
