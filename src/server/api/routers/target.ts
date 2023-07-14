import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const targetRouter = createTRPCRouter({

  getTarget: protectedProcedure.query(async ({ ctx }) => {
    
    const data = await ctx.prisma.target.findMany({
      where: {
        userId: ctx.session.user.id 
      }
    }) 

    return (data.map(post => {
        return {
          id: post.id,
          bank: post.bank,
          income: post.income, 
          monthly: post.monthly
        }
      })
    )
    
  }),

  createTarget: protectedProcedure.mutation(async ({ ctx }) => {
    
    return ctx.prisma.target.create({
      data: {
        userId: ctx.session.user.id,
        bank: 0,
        income: 0,
        monthly: 0
      }
    })
  }),

  editTarget: protectedProcedure.input(z.object({
    id: z.string(),
    bank: z.number(),
    income: z.number(),
    monthly: z.number()
  })).mutation(async ({ input: {id, bank, income, monthly}, ctx }) => {

    return ctx.prisma.target.update({
      where: {
        id: id
      }, 
      data: {
        bank: bank,
        income: income,
        monthly: monthly
      }
    })
  })


})