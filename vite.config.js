import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// TanStack Start + Nitro. Nitro auto-detects the host at build time
// (Vercel in CI via Vercel Functions, a Node server locally).
// https://vercel.com/docs/frameworks/full-stack/tanstack-start
export default defineConfig({
  server: { port: 8080 },
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
  resolve: { dedupe: ["react", "react-dom"] },
});
