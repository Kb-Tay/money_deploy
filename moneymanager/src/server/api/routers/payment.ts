import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const paymentRouter = createTRPCRouter({

  create: protectedProcedure.input(z.object({
    email: z.string(), 
    amount: z.number(),
    resolved: z.boolean(), 
    spendingID: z.string()
  })).mutation(async ({input: {email, amount, resolved, spendingID}, ctx}) => {
    
    return await ctx.prisma.payment.create({
      data: {
        userEmail: email, 
        amount: amount,
        resolved: resolved,
        spendingId: spendingID
      }
    })
  }),

})