import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { indices } from "../utils";
import { TRPCError } from "@trpc/server";
import { resultGroup } from "@/server/db/schema";
import { inArray } from "drizzle-orm";

export const searchResultRouter = createTRPCRouter({
  getAllResults: protectedProcedure.query(async ({ ctx }) => {
    try {
      const resultGroup = await ctx.db.query.resultGroup.findMany({
        where: (resultGroup, { eq }) =>
          eq(resultGroup.userId, ctx.session.user.id),
      });
      return resultGroup;
    } catch (error) {
      throw new TRPCError({
        message: "database operation failed",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  deleteSavedResults: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.delete(resultGroup).where(inArray(resultGroup.id, input));
      } catch (error) {
        throw new TRPCError({
          message: "database operation failed",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  saveResult: protectedProcedure
    .input(
      z.object({
        opensearchIndex: z.enum(indices),
        query: z.string(),
        opensearchDocumentId: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.insert(resultGroup).values({
          userId: ctx.session.user.id,
          opensearchIndex: input.opensearchIndex,
          query: input.query,
          opensearchIds: input.opensearchDocumentId,
        });
      } catch (error) {
        throw new TRPCError({
          message: "database operation failed",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
