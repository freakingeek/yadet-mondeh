import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="h-full overflow-hidden px-4 py-8 text-center text-gray-700">
      <section class="mx-auto flex h-full max-w-md flex-col justify-center">
        <h1 class="max-6-xs my-16 text-6xl font-thin uppercase text-sky-700">Not Found</h1>
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
          <A href="/about" class="text-sky-600 hover:underline">
            About Page
          </A>
        </p>
      </section>
    </main>
  );
}
