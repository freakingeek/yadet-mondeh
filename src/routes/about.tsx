import { A } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import PageMeta from "@/components/PageMeta";

const Counter = clientOnly(() => import("@/components/Counter"), { lazy: true });

export default function About() {
  return (
    <>
      <PageMeta
        title="درباره بازی"
        description="درباره یادت مونده؟ بیشتر بدان و ببین این بازی گروهی چطور برای جمع‌های دوستانه و خانوادگی طراحی شده است."
        path="/about"
      />
      <main class="h-full overflow-hidden px-4 py-8 text-center text-gray-700">
      <section class="mx-auto flex h-full max-w-md flex-col justify-center">
        <h1 class="max-6-xs my-16 text-6xl font-thin uppercase text-sky-700">About Page</h1>

        <Counter
          fallback={
            <div
              class="mx-auto h-14 w-[200px] animate-pulse rounded-full bg-gray-300"
              aria-hidden="true"
            />
          }
        />

        <p class="mt-8">
          Visit{" "}
          <a href="https://solidjs.com" target="_blank" class="text-sky-600 hover:underline">
            solidjs.com
          </a>{" "}
          to learn how to build Solid apps.
        </p>
        <p class="my-4">
          <A href="/" class="text-sky-600 hover:underline">
            Home
          </A>
          {" - "}
          <span>About Page</span>
        </p>
      </section>
      </main>
    </>
  );
}
