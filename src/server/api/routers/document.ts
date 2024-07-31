import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { indices, opensearchClient, OpensearchDocument } from "../utils";
import { TRPCError } from "@trpc/server";

export const documentRouter = createTRPCRouter({
  getDocById: protectedProcedure
    .input(
      z.object({
        opensearchIndex: z.enum(indices),
        documentId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const query = {
        _source: {
          excludes: [
            "*_embedding",
            "Raw_*",
            "*Thinking*",
            "*thinking*",
            "*token",
            "primary_topic",
            "open_access",
          ],
        },
        query: {
          ids: {
            values: [input.documentId],
          },
        },
      };

      try {
        const response = await opensearchClient.search({
          index: input.opensearchIndex,
          body: query,
        });
        if (response.body.hits.total.value !== 1) {
          throw new TRPCError({
            message: "No document exsists for the given id.",
            code: "NOT_FOUND",
          });
        }
        if (!response.body.hits.hits[0]) {
          throw new TRPCError({
            message: "No document exsists for the given id.",
            code: "NOT_FOUND",
          });
        }
        const doc = response.body.hits.hits[0] as OpensearchDocument;
        return doc;
      } catch (error) {
        console.error(error);
      }
    }),
});
