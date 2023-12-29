import { authRouter } from "~/server/api/routers/auth";
import { createTRPCRouter } from "~/server/api/trpc";
import { tunnelIpsRouter } from "./routers/tunnel-ips";
import { lanIpsRouter } from "./routers/lan-ips";
import { lanRangeRouter } from "./routers/lan-range";
import { TunnelRangeRouter } from "./routers/tunnel-ranges";
import { branchRouter } from "./routers/branch";
import { districtRouter } from "./routers/district";
import { clusterRouter } from "./routers/cluster";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  tunnelIps: tunnelIpsRouter,
  lanIps: lanIpsRouter,
  lanRange: lanRangeRouter,
  tunnelRange: TunnelRangeRouter,
  branch: branchRouter,
  district: districtRouter,
  cluster: clusterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
