import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { indices, OpensearchDocumentSchema } from "../utils";
import { TRPCError } from "@trpc/server";
import { savedResults } from "@/server/db/schema";
import { inArray } from "drizzle-orm";

export const searchResultRouter = createTRPCRouter({
  getAllResults: protectedProcedure.query(async ({ ctx }) => {
    try {
      const savedResults = await ctx.db.query.savedResults.findMany({
        where: (savedResults, { eq }) =>
          eq(savedResults.userId, ctx.session.user.id),
      });
      return savedResults;
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
        await ctx.db
          .delete(savedResults)
          .where(inArray(savedResults.id, input));
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
        query: z.string().optional(),
        opensearchDocumentId: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.insert(savedResults).values({
          userId: ctx.session.user.id,
          opensearchIndex: input.opensearchIndex,
          query: input.query ?? "",
          opensearchId: input.opensearchDocumentId,
        });
      } catch (error) {
        throw new TRPCError({
          message: "database operation failed",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
