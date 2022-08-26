# Deno + React Template

Use the power of SSR React in Deno.

## Scripts

Deno doesn't have a package manager with scripts like NPM so I've supplied some common scripts below.

```bash
# build
deno build client/main.tsx --config deno.tsconfig.json client/public/main.bundle.js

# run
deno run --allow-run --allow-read --allow-net server.tsx
```
