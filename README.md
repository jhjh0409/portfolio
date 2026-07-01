# JingHuanOS — Tok Jing Huan's Portfolio

A personal portfolio built as an interactive desktop operating system. Boot into the
lock screen, log in, then explore About / Work / Projects / Stack / Blog / Contact as
draggable windows — or drop into the built-in terminal and type `help`.

Built with [TanStack Start](https://tanstack.com/start) (React 19 + Vite), Tailwind CSS v4,
and deployed on Vercel.

## Prerequisites

This project uses **[Bun](https://bun.sh)** as its package manager and runtime. Install it,
then use `bun` for everything (do not use `npm`/`yarn`/`pnpm` — only `bun.lock` is committed).

```bash
curl -fsSL https://bun.sh/install | bash
```

## Getting started

```bash
bun install      # install dependencies
bun dev          # start the dev server (http://localhost:3000)
```

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `bun dev`         | Start the Vite dev server            |
| `bun run build`   | Production build (SSR)               |
| `bun run preview` | Preview the production build locally |
| `bun run lint`    | Lint with ESLint                     |
| `bun run format`  | Format with Prettier                 |

## Project structure

```
public/                  static assets (tahoe-8bit.png wallpaper)
src/
  components/os/         the JingHuanOS UI (lock screen, dock, windows, terminal)
  data/                  content: projects, experience, about, stack, blog, contact
  routes/                TanStack routes (__root shell + index → JingHuanOS)
  styles.css             Tailwind v4 entry + OS keyframes/animations
```

Content lives in `src/data/*` — edit those files to update projects, experience, and so on.

## Deployment

Hosted on Vercel. The app uses TanStack Start with the [Nitro](https://nitro.build) Vite plugin,
which Vercel detects and runs on Vercel Functions — pushes to `main` auto-deploy. `bun run build`
produces a Nitro build (`.output` locally, `.vercel/output` in CI).
