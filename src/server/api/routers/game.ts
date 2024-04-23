import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.game.create({
        data: {
          title: input.name,
        },
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.game.findUnique({
        where: { id: input.id },
        include: {
          Player: {
            include: {
              Points: true,
            },
          },
        },
      });
    }),

  join: publicProcedure
    .input(z.object({ id: z.string(), playerName: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const findGame = await ctx.db.game.findUnique({
        where: { id: input.id },
      });
      if (!findGame) {
        throw new Error("Game not found");
      }
      const player = await ctx.db.player.create({
        data: {
          name: input.playerName,
          gameId: input.id,
        },
      });
      return { player, game: findGame };
    }),

  addPoints: publicProcedure
    .input(z.object({ playerId: z.string().cuid(), points: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.points.create({
        data: {
          playerId: input.playerId,
          points: input.points,
        },
      });
    }),

  getPointsGroupedByPlayer: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.points.groupBy({
        by: ["playerId"],
        where: {
          player: {
            gameId: input.gameId,
          },
        },
        _sum: {
          points: true,
        },
      });
    }),
});
