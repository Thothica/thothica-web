import { env } from '@/env';
import { Client } from '@opensearch-project/opensearch';
import { type Client as OpensearchClient } from '@opensearch-project/opensearch';

export const indices = ["indic-lit-index", "arabic-poems-index", "libertarian-chunks-index", "loc-new-index",
    "legaltext-index", "cleaned-dutchtext-index", "openalex-index", "cleaned-arabicbooks-index"] as const

export type Index = typeof indices[number]

const globalForOpensearch = globalThis as unknown as {
    client: OpensearchClient | undefined;
};

const client =
    globalForOpensearch.client ?? new Client({
        node: `https://${env.OPENSEARCH_USER}:${env.OPENSEARCH_PASSWORD}@${env.OPENSEARCH_HOST}`,
        ssl: {
            rejectUnauthorized: false
        }
    })
if (env.NODE_ENV !== "production") globalForOpensearch.client = client;

export const opensearchClient = client;
