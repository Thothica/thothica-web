import { env } from "@/env";
import { Client } from "@opensearch-project/opensearch";

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
  [key: string]: any;
}

export interface OpensearchDocument {
  _id: string;
  _index: string;
  _score: number;
  _source: DocumentSource;
}
