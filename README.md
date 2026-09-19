<div align="center">
  <img src="docs/readme/velorix-command-banner.png" alt="VeloRix — mobile esports tournaments and rewards" width="100%" />

  <br />

  <a href="https://velorix-hub.vercel.app"><img src="https://img.shields.io/badge/ENTER_THE_ARENA-LIVE-ff214f?style=for-the-badge&labelColor=050505" alt="Open VeloRix" /></a>
  <a href="https://velorix-hub.vercel.app/download"><img src="https://img.shields.io/badge/ANDROID-DOWNLOAD_APK-ff214f?style=for-the-badge&logo=android&logoColor=white&labelColor=050505" alt="Download VeloRix for Android" /></a>
  <a href="https://velorix-hub.vercel.app/status"><img src="https://img.shields.io/badge/SYSTEM-LIVE_STATUS-e8e8ec?style=for-the-badge&labelColor=050505" alt="VeloRix system status" /></a>

  <h3>India's competitive mobile gaming arena.</h3>
  <p>
    Daily Free Fire and BGMI tournaments, structured competition,<br />
    fair-play review, and real rewards for verified winners.
  </p>

  <p>
    <a href="https://velorix-hub.vercel.app"><strong>Website</strong></a>
    &nbsp;•&nbsp;
    <a href="https://velorix-hub.vercel.app/download"><strong>Get the app</strong></a>
    &nbsp;•&nbsp;
    <a href="https://velorix-hub.vercel.app/blog"><strong>Esports guides</strong></a>
    &nbsp;•&nbsp;
    <a href="https://velorix-hub.vercel.app/help"><strong>Help center</strong></a>
  </p>
</div>

<img src="docs/readme/signal-divider.png" alt="" width="100%" />

## The arena, rebuilt for mobile

Most grassroots tournaments still run through scattered chat groups—schedules slip, room credentials leak, results become disputes, and rewards feel uncertain. **VeloRix** brings the complete tournament journey into one focused experience built for Indian mobile gamers.

<table>
  <tr>
    <td width="25%" align="center"><strong>DAILY MATCHES</strong><br /><sub>Free Fire, BGMI, COD Mobile and more</sub></td>
    <td width="25%" align="center"><strong>FAIR PLAY</strong><br /><sub>Automated signals plus human review</sub></td>
    <td width="25%" align="center"><strong>REAL REWARDS</strong><br /><sub>Payouts after result verification</sub></td>
    <td width="25%" align="center"><strong>BUILT LIGHT</strong><br /><sub>Designed for real Android devices</sub></td>
  </tr>
</table>

## Inside VeloRix

<table>
  <tr>
    <td width="33.33%"><img src="src/assets/gallery-1.png" alt="VeloRix tournament discovery screen" width="100%" /></td>
    <td width="33.33%"><img src="src/assets/gallery-2.png" alt="VeloRix match registration screen" width="100%" /></td>
    <td width="33.33%"><img src="src/assets/gallery-3.png" alt="VeloRix competitive results screen" width="100%" /></td>
  </tr>
</table>

### Match flow

```text
DISCOVER  ──▶  REGISTER  ──▶  GET ROOM  ──▶  COMPETE  ──▶  REVIEW  ──▶  REWARD
```

1. Pick a tournament from the daily schedule.
2. Register and receive the private room details near match time.
3. Compete in a structured lobby with clear rules and prize splits.
4. Results pass automated checks and manual review when flagged.
5. Verified winners receive their rewards.

## Competitive systems

- **Tournament formats** — points tables, brackets, round robin, Clash Squad and custom rooms.
- **Protected room access** — IDs and passwords are delivered only to registered players.
- **Fair-play review** — impossible statistics, account anomalies and repeated patterns can trigger manual review.
- **Transparent outcomes** — result decisions and tournament details remain reviewable.
- **Low-bandwidth focus** — the experience is designed for slow connections and budget-to-mid-range phones.
- **Public web hub** — downloads, policies, guides and live status remain available without a website account.

## App profile

| Signal | Specification |
|---|---|
| Platform | Android |
| Minimum version | Android 7.0+ |
| Approximate size | ~25 MB |
| Region | India |
| Languages | English and Hindi |
| Price | Free to download; many tournaments are free-entry |
| Category | Skill-based esports — **not betting or gambling** |

## Built for speed

<div align="center">

![React](https://img.shields.io/badge/React_19-050505?style=flat-square&logo=react&logoColor=61DAFB)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-050505?style=flat-square&logo=reactquery&logoColor=FF4154)
![TypeScript](https://img.shields.io/badge/TypeScript-050505?style=flat-square&logo=typescript&logoColor=3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-050505?style=flat-square&logo=tailwindcss&logoColor=06B6D4)
![Vite](https://img.shields.io/badge/Vite_8-050505?style=flat-square&logo=vite&logoColor=FF214F)
![Lovable Cloud](https://img.shields.io/badge/Lovable_Cloud-050505?style=flat-square&logo=cloudflare&logoColor=F48120)
![Three.js](https://img.shields.io/badge/Three.js-050505?style=flat-square&logo=threedotjs&logoColor=white)
![Anime.js](https://img.shields.io/badge/Anime.js-050505?style=flat-square&logo=javascript&logoColor=FF214F)

</div>

The web hub uses server-rendered React, a typed route system, an AMOLED-first design system, lightweight GPU-friendly motion, installable offline support, and public developer surfaces for search engines and software agents.

## Run the web hub locally

**Requirements:** Node.js 20+ and [Bun](https://bun.sh/).

```bash
git clone <repository-url>
cd <repository-folder>
bun install
bun run dev
```

The local site is served at `http://localhost:8080`.

```bash
bun run test     # Run the test suite
bun run build    # Create a production build
bun run lint     # Check code quality
```

> Private keys and production credentials must stay in environment secrets. Never commit them to the repository.

## Open developer surface

VeloRix publishes read-only resources for developers, search engines, and compatible agents.

| Resource | Link |
|---|---|
| Developer center | [`/developers`](https://velorix-hub.vercel.app/developers) |
| OpenAPI 3.1 | [`/openapi.json`](https://velorix-hub.vercel.app/openapi.json) |
| MCP endpoint | [`/.well-known/mcp`](https://velorix-hub.vercel.app/.well-known/mcp) |
| Agent index | [`/llms.txt`](https://velorix-hub.vercel.app/llms.txt) |
| Service status | [`/status`](https://velorix-hub.vercel.app/status) |
| Security policy | [`/.well-known/security.txt`](https://velorix-hub.vercel.app/.well-known/security.txt) |

## Project principles

```text
01  COMPETITION OVER CHAOS
02  VERIFICATION BEFORE REWARD
03  PERFORMANCE ON REAL DEVICES
04  CLEAR RULES. REVIEWABLE RESULTS.
```

## Connect

- **Website:** [velorix-hub.vercel.app](https://velorix-hub.vercel.app)
- **Instagram:** [@velorix_tournaments](https://www.instagram.com/velorix_tournaments)
- **Support:** [service.veloxyra@gmail.com](mailto:service.veloxyra@gmail.com)
- **Creator:** [VX-ANANT](https://github.com/VX-ANANT)

<div align="center">
  <img src="src/assets/velorix-logo.png" alt="VeloRix Tournaments" width="150" />
  <br />
  <sub>Built in India for the next generation of mobile competitors.</sub>
</div>
