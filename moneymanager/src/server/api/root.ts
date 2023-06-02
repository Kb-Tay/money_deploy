import { createTRPCRouter } from "~/server/api/trpc";
import { spendingsRouter } from "./routers/spendings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  spending: spendingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
