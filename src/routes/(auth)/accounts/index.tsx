import PageMeta from "@/components/PageMeta";

export default function Accounts() {
  return (
    <>
      <PageMeta
        title="حساب کاربری"
        description="صفحه حساب کاربری یادت مونده؟ برای ورود یا مدیریت دسترسی‌های مربوط به حساب."
        path="/accounts"
        noindex
      />
      <main class="h-full overflow-hidden px-4 py-8 text-white">
        <section class="mx-auto flex h-full max-w-md flex-col justify-center text-center">
          <h1 class="text-3xl font-black">Accounts 1</h1>
        </section>
      </main>
    </>
  );
}
