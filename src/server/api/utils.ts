import { env } from "@/env";
import { Client } from "@opensearch-project/opensearch";
import { z } from "zod";

export const indices = [
  "indic-lit-index",
  "arabic-poems-index",
  "libertarian-chunks-index",
  "loc-new-index",
  "legaltext-index",
  "cleaned-dutchtext-index",
  "openalex-index",
  "cleaned-arabicbooks-index",
] as const;

export type Index = (typeof indices)[number];

export const opensearchClient = new Client({
  node: `https://${env.OPENSEARCH_USER}:${env.OPENSEARCH_PASSWORD}@${env.OPENSEARCH_HOST}`,
  ssl: {
    rejectUnauthorized: false,
  },
});

export interface DocumentSource {
  Title: string;
  [key: string]: any; // eslint-disable-line
}

export interface OpensearchDocument {
  _id: string;
  _index: string;
  _score: number;
  _source: any;
}

export const removeDuplicatesByScore = (
  searchResponses: OpensearchDocument[],
) => {
  const unique = new Set<number>();
  const filteredResponses: OpensearchDocument[] = [];

  for (const response of searchResponses) {
    if (!unique.has(response._score)) {
      unique.add(response._score);
      filteredResponses.push(response);
    }
  }

  return filteredResponses;
};

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const OpensearchDocumentSchema = z.object({
  _id: z.string(),
  _index: z.string(),
  _score: z.number(),
  _source: jsonSchema,
});