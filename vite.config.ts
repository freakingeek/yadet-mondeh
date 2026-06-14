import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { solidStart } from "@solidjs/start/config";
import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  
  server: {
    port: 3000
  },

  plugins: [
    solidStart(),
    tailwindcss(),
    nitro()
  ]
});
