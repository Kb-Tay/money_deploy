import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { formatISO } from "date-fns";
import { contextProps } from "@trpc/react-query/shared";


// declare the base procedure with validation here 
const spendingProcedure = protectedProcedure.input(z.object({ 
    money: z.number(), 
    category: z.string(), 
    content: z.string(), 
    date: z.string().transform(str => new Date(str)),
  }))

export const spendingsRouter = createTRPCRouter({
  get: protectedProcedure // defining the field string using the name content
    .input(z.object({
      limit: z.number().optional(), 
      cursor: z.object({ id: z.string(), createdAt: z.date()}).optional(), // use post id as a cursor
    }))  
    .query(async ({ input: {limit = 3, cursor}, ctx }) => { //input refers to input that was validated by zodd

      const data = await ctx.prisma.spending.findMany({
        take: limit + 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined, 
        orderBy: [{ createdAt: "desc"}, {id: "desc"}],
      })

      let nextCursor : typeof cursor | undefined
      if (data.length > limit) {
        const nextItem = data.pop()
        if (nextItem != null) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt }
        }
      }
      
      return { spending: data.map( spend => {
        return {
          id: spend.id,
          money: spend.money, 
          category: spend.category, 
          content: spend.content,
          createdAt: spend.createdAt,
          userId: spend.userId
        }
      }), nextCursor }
  }),

  create: spendingProcedure // defining the field string using the name content
    .mutation(async ({ input: { money, category, date, content }, ctx }) => { //input refers to input that was validated by zodd
  
      return await ctx.prisma.spending.create({
        data: { userId: ctx.session.user.id, 
                money, 
                category,  
                content,
                createdAt: date,
              }
      })
    })

}); 
