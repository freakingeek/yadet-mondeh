import { useLocation, useNavigate } from "@solidjs/router";
import { Show } from "solid-js";

const pageTitles: Record<string, string> = {
  "/start": "شروع بازی",
  "/start/players": "بازیکن‌ها",
  "/start/settings": "تنظیمات بازی",
  "/how-to-play": "راهنما",
  "/settings": "تنظیمات",
  "/play": "بازی",
  "/summary": "نتیجه بازی",
  "/about": "درباره",
};

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = () => pageTitles[location.pathname] ?? "برگشت";

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigate("/");
  };

  return (
    <Show when={location.pathname !== "/"}>
      <header dir="rtl" lang="fa" class="z-20 shrink-0 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div class="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <button
            type="button"
            class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-xl font-black text-white ring-1 ring-white/15 transition active:scale-95"
            aria-label="برگشت"
            onClick={goBack}
          >
            →
          </button>

          <strong class="min-w-0 flex-1 truncate text-center text-base font-black text-white">{title()}</strong>

          <div class="h-11 w-11 shrink-0" aria-hidden="true" />
        </div>
      </header>
    </Show>
  );
}
