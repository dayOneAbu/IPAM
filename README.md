# IP Watcher

A Next.js internal dashboard for managing LAN and tunnel IP allocations across clusters, districts, branches, and ATMs.

## Overview
- Tracks IP ranges (`LANRange`, `TunnelRange`) and individual IP pools (`AllLANIps`, `AllTunnelIps`).
- Manages leases for branches and ATMs (`LeasedBranchIps`, `LeasedATMIps`).
- Users and role-based operations are stored in the database (`User`).

## Tech stack
- Next.js (App Router)
- tRPC (server and client)
- Prisma (Postgres) as ORM
- NextAuth for authentication
- Tailwind CSS for styling
- Zod for validation

## Quickstart (development)
Install dependencies and run the dev server:

```bash
pnpm install
pnpm run dev
```

Default useful scripts (see `package.json`):

- `pnpm run dev` — start Next.js in development mode
- `pnpm run build` — production build
- `pnpm start` — start production server
- `pnpm run db:push` — push Prisma schema to DB
- `pnpm run db:migrate` — create/apply migrations (dev)
- `pnpm run db:studio` — launch Prisma Studio
- `pnpm run seed:dev` — run dev seeder (if present)

## Environment variables
The app validates server-side env vars using `@t3-oss/env-nextjs` (see [src/env.mjs](src/env.mjs#L1-L200)). At minimum provide:

- `DATABASE_URL` — Postgres connection string
- `NEXTAUTH_SECRET` — secret for NextAuth in production
- `NEXTAUTH_URL` — base URL for NextAuth callbacks

Run dev with env validation skipped (useful for Docker builds):

```bash
SKIP_ENV_VALIDATION=1 pnpm run dev
```

## Database / Prisma
- Schema: [prisma/schema.prisma](prisma/schema.prisma#L1-L200)
- Generate client on install (`postinstall` runs `prisma generate`)
- Typical workflow when changing models:

```bash
# update prisma/schema.prisma
pnpm run db:migrate
pnpm run db:studio
```

## Where the code lives
- App pages and components: `src/app` and `src/app/_components`
- Server APIs: `src/server/api/routers/*` and aggregated at [src/server/api/root.ts](src/server/api/root.ts#L1-L80)
- tRPC client/server helpers: `src/trpc`
- Auth helpers: `src/server/auth.ts` (used in pages)

Example: the `auth` router is at [src/server/api/routers/auth.ts](src/server/api/routers/auth.ts#L1-L200).

## How requests flow
1. UI calls the tRPC client in `src/trpc`.
2. tRPC routes map to `appRouter` in `src/server/api/root.ts`.
3. Routers use `ctx.db` (Prisma client) to query the Postgres DB.

## Next steps / common tasks
- Add a new API endpoint: create router in `src/server/api/routers` and register it in `src/server/api/root.ts`.
- Modify DB model: edit `prisma/schema.prisma`, run migrations, and regenerate Prisma Client.
- UI development: add or edit pages under `src/app` and components under `src/app/_components`.
