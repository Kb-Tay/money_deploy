import { createTRPCRouter } from "~/server/api/trpc";
import { spendingsRouter } from "./routers/spendings";
import { paymentRouter } from "./routers/payment";
import { usersRouter } from "./routers/users";
import { targetRouter } from "./routers/target";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  spending: spendingsRouter,
  payment: paymentRouter,
  user: usersRouter,
  target: targetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
