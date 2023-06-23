import { Input } from "@chakra-ui/react";
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

  getUnique: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const data = await ctx.prisma.user.findUnique({
      where: {
        id: input
      }
    }) 

    return {
      id: data?.id,
      name: data?.name, 
      image: data?.image 
    }
    
  }),

  getFriends: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const data = await ctx.prisma.follows.findMany({
      where: {
        followerId: input
      }
    }) 
    
    return data.map(post => {
      return { followerId: post.followerId }
    })
  }),

  createFriend: protectedProcedure.input(z.object({
    followerId: z.string(), 
    followingId: z.string() 
  })).mutation(async ({ input: {followerId, followingId}, ctx }) => {
    
    return await ctx.prisma.follows.create({
      data: {
        followerId: followerId, 
        followingId: followingId
      },
    })
  }), 



})