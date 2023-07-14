import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


// declare the base procedure with validation here 
const spendingProcedure = protectedProcedure.input(z.object({ 
    money: z.number(), 
    category: z.string(), 
    content: z.string(), 
    date: z.string().transform(str => new Date(str)),
  }))

export const spendingsRouter = createTRPCRouter({

  getAll: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
      const data = await ctx.prisma.spending.findMany({
        where: {
          userId: input
        },
        orderBy: [{ createdAt: "desc"}, {id: "desc"}],
      })
      
      return { spending: data.map(spend => {
        return {
          id: spend.id,
          money: spend.money, 
          category: spend.category, 
          content: spend.content,
          createdAt: spend.createdAt,
          userId: spend.userId
        }
      })} 
  }),

  get: protectedProcedure // defining the field string using the name content
    .input(z.object({
      userId: z.string(),
      limit: z.number().optional(), 
      cursor: z.object({ id: z.string(), createdAt: z.date()}).optional(), // use post id as a cursor
    }))  
    .query(async ({ input: {userId, limit = 3, cursor}, ctx }) => { //input refers to input that was validated by zodd

      const data = await ctx.prisma.spending.findMany({
        where: {
          userId: userId
        },
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

  getUnique: protectedProcedure.input(z.object({ userid: z.string() })).query(
    async ({ input: { userid }, ctx }) => {
      return await ctx.prisma.spending.findUnique({
        where: {
          id: userid
        }
      })
    }

  ),

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
    }),


    edit: protectedProcedure.input( z.object({ 
      userid: z.string(),
      money: z.number().optional(), 
      category: z.string().optional(), 
      content: z.string().optional(), 
      date: z.string().optional()})).mutation(
      async({ input: { userid, money, category, content, date }, ctx }) => {
        
        const createdAt = date !== undefined ? new Date(date) : undefined

        return await ctx.prisma.spending.update({
          where: {
            id: userid
          },
          data: {
            money: money,
            category: category, 
            content: content,
            createdAt: createdAt
          }
        })
      }  
    ), 

    delete: protectedProcedure.input(z.string()).mutation(async ({input, ctx}) => {
      return await ctx.prisma.spending.delete({
        where: {
          id: input
        }
      })
    })

}); 
