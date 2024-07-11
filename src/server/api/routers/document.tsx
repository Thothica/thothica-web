import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { indices, opensearchClient } from "../utils";
import { TRPCError } from "@trpc/server";

export const documentRouter = createTRPCRouter({
    getDocById: publicProcedure
        .input(z.object({
            opensearchIndex: z.enum(indices),
            documentId: z.string()
        }))
        .query(async ({ input }) => {

            const query = {
                _source: {
                    excludes: [
                        "*_embedding"
                    ]
                },
                query: {
                    ids: {
                        values: [input.documentId]
                    }
                }
            }

            try {
                const response = await opensearchClient.search({
                    index: input.opensearchIndex,
                    body: query
                })
                if (response.body.hits.total.value !== 1) {
                    throw new TRPCError({
                        message: "No document exsists for the given id.",
                        code: "NOT_FOUND"
                    })
                }
                return response.body.hits.hits[0]
            } catch (error) {
                console.error(error)
            }
        })
})
