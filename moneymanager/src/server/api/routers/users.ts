import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const usersRouter = createTRPCRouter({

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.user.findMany() 

    return data.map(post => {
      return {
        id: post.id,
        name: post.name, 
        image: post.image 
      }
    })
  }),

})