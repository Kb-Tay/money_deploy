import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const paymentRouter = createTRPCRouter({



  getPayments: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const data1 = await ctx.prisma.payment.findMany({
      where: {
        userId: input
      }
    })

    const data2 = await ctx.prisma.payment.findMany({
      where: {
        payeeId: input 
      }
    })

    return {
      owe: data2.map(post => ({
        amount: post.amount,
        resolved: post.resolved, 
        userId: post.userId, 
        payeeId: post.payeeId,
        note: post.note
      })),

      collect: data1.map(post => ({
        amount: post.amount,
        resolved: post.resolved, 
        userId: post.userId, 
        payeeId: post.payeeId,
        note: post.note
      }))
    }

  }),

  create: protectedProcedure.input(z.object({
    amount: z.number(),
    resolved: z.boolean(), 
    userId: z.string(), 
    payeeId: z.string(), 
    spendingID: z.string(),
    note: z.string()
  })).mutation(async ({input: {amount, resolved, spendingID, userId, payeeId, note}, ctx}) => {
    
    return await ctx.prisma.payment.create({
      data: {
        userId: userId,
        payeeId: payeeId,
        amount: amount,
        resolved: resolved,
        spendingId: spendingID,
        note: note
      }
    })
  }),
  

})