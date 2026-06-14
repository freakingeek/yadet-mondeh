import { Navigate } from "@solidjs/router";
import PageMeta from "@/components/PageMeta";

export default function Start() {
  return (
    <>
      <PageMeta
        title="شروع بازی"
        description="مسیر شروع یادت مونده؟ که بازیکن‌ها و تنظیمات بازی را آماده می‌کند."
        path="/start"
      />
      <Navigate href="/start/players" />
    </>
  );
}
