import { A } from "@solidjs/router";
import GameButton from "@/components/game/GameButton";
import GameCard from "@/components/game/GameCard";

export default function Settings() {
  return (
    <main dir="rtl" lang="fa" class="min-h-[calc(100vh-4rem)] px-4 py-8 text-white">
      <section class="mx-auto max-w-md space-y-5">
        <div>
          <p class="text-sm font-bold text-violet-200">تنظیمات</p>
          <h1 class="mt-2 text-4xl font-black">قوانین قابل تغییر</h1>
          <p class="mt-3 leading-8 text-slate-300">
            تنظیمات اصلی قبل از هر بازی در صفحه شروع انتخاب می‌شن تا هر دور با حال‌وهوای خودش اجرا بشه.
          </p>
        </div>

        <GameCard class="space-y-4">
          <div>
            <h2 class="font-black text-white">زمان سؤال</h2>
            <p class="mt-1 text-sm leading-7 text-slate-300">۱۰، ۱۵، ۳۰ یا ۴۵ ثانیه. هر چی کمتر، فشار روانی بیشتر.</p>
          </div>
          <div>
            <h2 class="font-black text-white">تعویض سؤال</h2>
            <p class="mt-1 text-sm leading-7 text-slate-300">
              ۱ بار، ۲ بار یا نامحدود. حالت محدود امتیاز سؤال رو کم می‌کنه.
            </p>
          </div>
          <div>
            <h2 class="font-black text-white">تعداد راند</h2>
            <p class="mt-1 text-sm leading-7 text-slate-300">۳، ۵ یا ۱۰ راند. هر راند یعنی همه بازیکن‌ها یک بار بازی می‌کنن.</p>
          </div>
        </GameCard>

        <A href="/start" class="block">
          <GameButton full>انتخاب تنظیمات و شروع</GameButton>
        </A>
      </section>
    </main>
  );
}
