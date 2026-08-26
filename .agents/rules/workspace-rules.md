# Workspace Rules for The Window Doctor Project

1. **Design DNA Constitution**: All UI designs, portfolio showcases, and client interfaces must inherit the **ARM PREMIUM PRODUCT DESIGN DNA** (Premium Soft SaaS + Editorial Bento + Product Visualization + Soft Gradient + Minimal UI + Business-first UX) documented in `AGENTS.md`.
2. **Client System Integrity**: The Public Website (`/`, `/quote`, `/services`, etc.) and Admin Suite (`/admin`) belong strictly to the client. Keep them intact.
3. **Developer Showcase Isolation (`/showcase`)**: The `/showcase` route is a private, isolated developer portfolio page with zero database write operations (100% demo/simulation sandbox). It must not be linked from the client's public footer.
4. **Code Quality & Type Safety**: Zero dead code, clean TypeScript type definitions (`tsc --noEmit`), and strict Git commit hygiene.
