import { A } from "@solidjs/router";
import PageMeta from "@/components/PageMeta";
import GameButton from "@/components/game/GameButton";

export default function Home() {
  return (
    <>
      <PageMeta
        title="بازی حافظه و آبرو"
        description="یادت مونده؟ یک بازی گروهی سریع و بامزه برای سؤال‌های سخت، امتیاز گرفتن و نباختن جلوی جمع است."
        path="/"
      />
      <main dir="rtl" lang="fa" class="h-full overflow-hidden px-4 py-8 text-white">
      <section class="mx-auto flex h-full max-w-md flex-col justify-between gap-8">
        <div class="pt-8 text-center">
          <img
            src="/images/mental-health.png"
            alt="Yadet Moondeh"
            class="home-icon mx-auto h-36 w-36 object-contain"
          />
          <p class="mt-3 text-sm font-bold text-violet-200">بازی حافظه و آبرو</p>
          <h1 class="home-title mt-4 text-7xl font-black leading-none sm:text-8xl">یادت مونده؟</h1>
          <p class="mt-6 text-base leading-8 text-slate-300">
            گوشی رو دست‌به‌دست کنین، سؤال‌های سخت جواب بدین، امتیاز بگیرین و نذارین صفحه قرمز آبروتون رو ببره.
          </p>
        </div>

        <div class="pb-2 text-center">
          <A href="/start" class="block">
            <GameButton class="home-start-button py-7 text-2xl" full>
              شروع بازی
            </GameButton>
          </A>

          <div class="mt-3 grid grid-cols-2 gap-3">
            <A href="/how-to-play" class="block">
              <GameButton variant="secondary" full>
                راهنما
              </GameButton>
            </A>
            <A href="/settings" class="block">
              <GameButton variant="ghost" full>
                تنظیمات
              </GameButton>
            </A>
          </div>

          <p class="mt-12 text-xs font-medium tracking-wide text-slate-500"> ما رو یادت مونده؟ {new Date().getFullYear()} ©</p>
        </div>
      </section>
      </main>
    </>
  );
}
