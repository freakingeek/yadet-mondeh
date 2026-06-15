import "./app.css";
import { Meta, MetaProvider, Title } from "@solidjs/meta";
import Nav from "@/components/Nav";
import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { SITE_NAME } from "@/components/PageMeta";
import Providers from "@/providers";

export default function App() {
  return (
    <MetaProvider>
      <Title>{SITE_NAME}</Title>
      <Meta name="description" content="یادت مونده؟ یک بازی گروهی سریع و پرهیجان برای سؤال‌های سخت، امتیاز گرفتن و خراب نکردن آبرو وسط جمع است." />
      <Router
        root={props => (
          <Providers>
            <div class="flex h-full min-h-0 flex-col overflow-hidden">
              <Nav />
              <div class="flex-1 min-h-0 overflow-hidden">
                <Suspense>{props.children}</Suspense>
              </div>
            </div>
          </Providers>
        )}
      >
        {FileRoutes()}
      </Router>
    </MetaProvider>
  );
}
