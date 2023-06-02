import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const spendingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string() })) // defining the field string using the name content
    .mutation(async ({ input: { content }, ctx }) => { //input refers to input that was validated by zodd
      return await ctx.prisma.spending.create({
        data: { content, userId: ctx.session.user.id }
      })
    })

});
