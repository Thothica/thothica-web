import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import {
  indices,
  opensearchClient,
  type OpensearchDocument,
  removeDuplicatesByScore,
} from "../utils";
import { TRPCError } from "@trpc/server";
import { resultGroup } from "@/server/db/schema";

const searchQuery = (vectorField: string, query: string) => {
  return {
    _source: {
      excludes: ["*_embedding"],
    },
    query: {
      neural: {
        [vectorField]: {
          query_text: query,
          model_id: "AbDZGo8BB3UUeZ_94CHA",
          k: 5,
        },
      },
    },
    size: 5,
  };
};

export const searchRouter = createTRPCRouter({
  searchOnIndex: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1),
        opensearchIndex: z.enum(indices),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let query = {};

      switch (input.opensearchIndex) {
        case "cleaned-dutchtext-index":
        case "legaltext-index":
        case "cleaned-arabicbooks-index":
          query = searchQuery("Raw_Response_embedding", input.query);
          break;
        case "openalex-index":
        case "loc-new-index":
        case "libertarian-chunks-index":
          query = searchQuery("Text_embedding", input.query);
          break;
        case "arabic-poems-index":
          query = searchQuery("interpretation_embedding", input.query);
          break;
        case "indic-lit-index":
          query = searchQuery("Raw_response_embedding", input.query);
          break;
        case "american-data-index": 
            query = searchQuery("text_embedding", input.query)
            break;
      }
      try {
        const response = await opensearchClient.search({
          index: input.opensearchIndex,
          body: query,
        });
        const results = response.body.hits.hits as OpensearchDocument[]; // eslint-disable-line
        const filteredResults = removeDuplicatesByScore(results);

        const opensearchIds: string[] = [];

        for (const result of filteredResults) {
          opensearchIds.push(result._id);
        }

        const newResultGroup = await ctx.db
          .insert(resultGroup)
          .values({
            userId: ctx.session.user.id,
            opensearchIndex: input.opensearchIndex,
            query: input.query,
            opensearchIds,
          })
          .returning();

        if (!newResultGroup[0]) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        return newResultGroup[0].id;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Connection to internal search engine failed. Please send a mail to tejas@thothica.com",
        });
      }
    }),
});
