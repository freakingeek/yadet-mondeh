// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

const handler = createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="fa" dir="rtl">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
          />
          <meta name="theme-color" content="#020617" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="icon" href="/images/mental-health.png" type="image/png" />
          <link rel="apple-touch-icon" href="/images/mental-health.png" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

export default {
  fetch(req: any, context: any) {
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const proto = req.headers["x-forwarded-proto"] || (req.socket?.encrypted ? "https" : "http");
    const url = `${proto}://${host}${req.url || "/"}`;
    const hasBody = req.method && !["GET", "HEAD"].includes(req.method);

    return handler.fetch(
      new Request(url, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: hasBody ? req : undefined,
        duplex: hasBody ? "half" : undefined
      } as RequestInit & { duplex?: "half" }),
      context
    );
  }
};
