# LUMINA — landing page + complete game

## Open and play

1. Extract the entire ZIP. Do not run HTML from inside an archive viewer.
2. Open `START-HERE.html` in a desktop browser and select **Open LUMINA**.
3. Choose **Play now**. The complete game is included inside the landing page.

You can also open `public/index.html` directly, or `public/game.html` for only the game. No installation, account, API key, or internet connection is required for the prebuilt files. Optional browser read-aloud may use an online speech service. Saved progress depends on browser storage and can differ between files and browsers.

## Included

- `public/index.html`: self-contained landing page with embedded game.
- `public/game.html`: standalone game.
- `src/landing/`: editable HTML template, CSS, behavior, and checks.
- `src/game/`: gameplay, comfort controls, scene layers, fallback, and Three.js world.
- `assets/`: original PNG artwork and production WebP versions.
- `build.mjs`: portable build for both deliverables.
- `package.json` and `package-lock.json`: pinned dependencies.
- `vercel.json`: static deployment configuration.
- `licenses/`: Three.js license, also embedded in the game.

## Edit in Cursor or another editor

Open the extracted LUMINA directory. Use Node.js 20 or newer.

```sh
npm ci
npm run build
npm test
```

The build regenerates `public/game.html`, then embeds that game into `public/index.html`. Edit the templates and source files; the next build replaces generated files. PNG originals are included for artwork editing. The build uses the matching WebP files.

## GitHub to Vercel

Create a Git repository from the extracted LUMINA directory and push it to your GitHub repository. Import that repository into Vercel. Select LUMINA as the root directory only if you committed it inside a parent folder.

The included configuration selects **Other**, installs with `npm ci`, runs `npm run build`, and publishes `public`. No environment variables are required. The landing page is `/`; the standalone game is `/game.html`. Deployment has not been performed or verified for this package.

Official configuration reference: https://vercel.com/docs/project-configuration/vercel-json

## Verification and limits

The portable source build and archive integrity are checked. Automated DOM checks cover section anchors, world tabs and keyboard controls, the flower preview, Play buttons, embedded-game identity, comfort transfer, pause/return/resume, and Escape. Gameplay checks cover the introduction, 12 lights, time actions, saved progress, river solutions, garden editing, and no-GPU startup. Three.js geometry construction uses a renderer stub.

These are not browser screenshots, real GPU tests, mobile performance tests, an accessibility audit, clinical validation, or child playtesting. Those remain outstanding. LUMINA is a play experience, not a treatment or assessment. Detailed scenes use pre-rendered artwork; optional WebGL provides interactive 3D. The time mechanic is not a physical 4D display.

## Privacy

The code requests no child names or diagnoses, accounts, ads, purchases, chat, or analytics. Progress and settings use browser storage when available. Hosting providers and optional speech services have their own processing practices. The landing welcome is a recording included in the page. Choosing the headset plays that recording in the browser and does not contact a speech service. No credentials or API keys are included.
