# CCCycle

This repo is already a standard Vite + React app generated from Figma Make, so you can run and deploy it like any other frontend project.

## Run locally

Use Node 20+ and `pnpm`.

```bash
cd /Users/eleanorpark/csclasses/cs1952b/CCCycle
CI=true pnpm install
pnpm dev
```

`pnpm dev` now starts both the Vite frontend and the local JSON-backed API server. Open the local URL printed by Vite, usually `http://localhost:5173`.

If you want to run just the backend:

```bash
pnpm server
```

## Production build

```bash
pnpm build
pnpm preview
```

The production output is written to `dist/`.

## Deploy

Any static host that supports Vite works:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

For most hosts, the settings are:

- Build command: `pnpm build`
- Output directory: `dist`

## Figma Make note

The custom `figma:` asset handling is already implemented in `vite.config.ts`, so this project does not need a special Figma runtime to build and deploy.
