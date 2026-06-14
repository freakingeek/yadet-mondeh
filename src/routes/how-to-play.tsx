import { A } from "@solidjs/router";
import PageMeta from "@/components/PageMeta";
import GameButton from "@/components/game/GameButton";
import GameCard from "@/components/game/GameCard";

const rules = [
  "حداقل دو بازیکن اضافه کنین و فقط اسم هر نفر رو بنویسین.",
  "در هر نوبت، گوشی فقط دست بازیکنیه که اسمش روی صفحه اومده.",
  "بازیکن سؤال رو بلند جواب می‌ده و خودش قبل از تمام شدن زمان روی دکمه جواب دادم می‌زنه.",
  "در ۳ ثانیه آخر، شمارش بزرگ می‌شه و کل صفحه برای ثبت جواب قابل لمس می‌شه.",
  "اگه زمان تموم شه، صفحه قرمز می‌شه و باختی! امتیاز هم نمی‌گیری.",
  "تعویض سؤال در حالت محدود امتیاز همون سؤال رو کم می‌کنه؛ حالت نامحدود جریمه نداره.",
  "بعد از تمام شدن دورها، جدول امتیازها و برنده‌ها نمایش داده می‌شه.",
];

export default function HowToPlay() {
  return (
    <>
      <PageMeta
        title="راهنمای بازی"
        description="قوانین یادت مونده؟ را بخوان تا با زمان، تعویض سؤال، امتیازها و روند بازی کاملاً آشنا شوی."
        path="/how-to-play"
      />
      <main dir="rtl" lang="fa" class="h-full overflow-hidden px-4 py-8 text-white">
      <section class="mx-auto flex h-full max-w-md flex-col gap-5">
        <div>
          <p class="text-sm font-bold text-violet-200">راهنما</p>
          <h1 class="mt-2 text-4xl font-black">چطوری بازی کنیم؟</h1>
        </div>

        <GameCard>
          <ol class="space-y-4">
            {rules.map((rule, index) => (
              <li class="flex gap-3 leading-8 text-slate-200">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-400 text-sm font-black text-slate-950">
                  {index + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </GameCard>

        <A href="/start" class="mt-auto block">
          <GameButton full>فهمیدم، بریم بازی</GameButton>
        </A>
      </section>
      </main>
    </>
  );
}
