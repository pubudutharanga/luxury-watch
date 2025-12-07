# Dark Mode Luxury Watch Unboxing — Vite + React + Tailwind + Framer Motion

## Quick Start

1. Install dependencies
```bash
npm install
```

2. Run development server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
npm run preview
```

## What this project includes
- React 18 with Vite
- TailwindCSS configured
- Framer Motion for micro-interactions and section animations
- Placeholder assets in `src/assets/`
- Smooth / parallax scroll logic in `src/hooks/useSmoothScroll.jsx` using a lightweight approach (optional locomotive-scroll integration is preconfigured via package.json)
- Components for each section of the cinematic unboxing experience

## How to enhance animations & integration notes
- For heavier, production-grade parallax, swap the lightweight scroll logic with `locomotive-scroll` initialization in `useSmoothScroll.jsx`. See comments in that file.
- GSAP is included as optional. Use `gsap` timelines for the 3D reveal or the exploded view when you need advanced control.
- To add 3D models: replace the SVG placeholders with exported GLTF/GLB and integrate with `three` and `@react-three/fiber`.
- For audio cues (metallic clicks), use `<audio>` elements and trigger them at animation keyframes.
- For mobile performance: throttle scroll listeners, reduce particle count, and prefer CSS transforms over layout changes.

## Fonts
This project references Google Fonts in CSS (`DM Serif Display` and `Inter`). You can swap to self-hosted fonts by placing font files into `public/fonts` and updating `@font-face` in `src/styles/index.css`.

## Deployment
This is a static frontend. Deploy to Vercel, Netlify, or any static hosting. Ensure base path settings if you deploy to a subpath.

## Files to inspect
- `src/App.jsx` — main layout and routes
- `src/components/` — all major UI components
- `src/hooks/useSmoothScroll.jsx` — parallax and smooth scroll glue
- `src/styles/index.css` — Tailwind + custom styles

Enjoy — the project is a full scaffold ready for further creative polish.
