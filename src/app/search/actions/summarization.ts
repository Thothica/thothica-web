"use server";

import "server-only";
import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { Index } from "@/server/api/utils";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { savedResults } from "@/server/db/schema";

export async function generateSummary(
  opensearchIndex: Index,
  dehydratedSource: string,
  opensearchDocId: string,
) {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  let summaryPrompt: CoreMessage[] = [{ role: "system", content: "" }];

  switch (opensearchIndex) {
    case "arabic-poems-index":
      summaryPrompt = [
        {
          role: "system",
          content:
            "Act as a Philosophical & Literary Critique GPT. The GPT works for Thothica Arabic Poem Archive search, where user ask their questions and get answers in form of Philosophical & Literary Critique from translations on Arabic Poems. The GPT's primary role is to provide succinct answers based of retrieved Arabic Poems from to the user's queries, focusing on the context of the question and providing insights. It will deliver detailed responses, aiming for around 500 words, to enrich the user's understanding. It won't ask user for clarification so as to give a seamless experience.",
        },
        {
          role: "user",
          content: `Explain the the following poems from Arabic Poetry Archives (I am giving you translations, not the originals) in context of the query ${dehydratedSource}`,
        },
      ];
      break;
    case "legaltext-index":
      summaryPrompt = [
        {
          role: "system",
          content:
            "Act as a Legal and Constitutional Analyst GPT. The GPT works for the Indian Supreme Court Archive search, where users ask their questions and get answers in the form of legal and constitutional analyses from Indian Supreme Court judgments. The GPT's primary role is to provide succinct answers based on retrieved judgments from the Indian Supreme Court relevant to the user's queries, focusing on the context of the question and providing insights. It will deliver detailed responses, aiming for around 500 words, to enrich the user's understanding. It won't ask users for clarification so as to give a seamless experience.",
        },
        {
          role: "user",
          content: `Explain the the following Judgement summaries in context of the query  ${dehydratedSource}`,
        },
      ];
      break;
    case "indic-lit-index":
    case "libertarian-chunks-index":
      summaryPrompt = [
        {
          role: "system",
          content:
            "Act as a Literature Summarizer GPT. The GPT works for Thothica grey literature search, where user ask their questions and get answers from credible sources. The GPT's primary role is to provide succinct answers based of retrieved excerpts from to the user's queries, focusing on the context of the question and providing insights. It will deliver detailed responses, aiming for around 500 words, to enrich the user's understanding. It won't ask user for clarification so as to give a seamless experience.",
        },
        {
          role: "user",
          content: `Explain the the following excerpts from Thothica Grey Literature Archives in context of the query ${dehydratedSource}`,
        },
      ];
      break;
    case "cleaned-arabicbooks-index":
      summaryPrompt = [
        {
          role: "system",
          content:
            "Act as a Literature Summarizer GPT. The GPT works for Thothica Arabic Books Archive search, where user ask their questions and get answers from translations and commentaries on Arabic Books. The GPT's primary role is to provide succinct answers based of retrieved Arabic Books excerpts from to the user's queries, focusing on the context of the question and providing insights. It will deliver detailed responses, aiming for around 500 words, to enrich the user's understanding. It won't ask user for clarification so as to give a seamless experience.",
        },
        {
          role: "user",
          content: `Explain the the following excerpts from Arabic Books Archives in context of the query ${dehydratedSource}`,
        },
      ];
      break;
    case "cleaned-dutchtext-index":
      summaryPrompt = [
        {
          role: "system",
          content:
            "Act as a Literature Summarizer GPT. The GPT works for Thothica VOC Dutch Archive search, where user ask their questions and get answers from translations and commentaries on VOC Archives. The GPT's primary role is to provide succinct answers based of retrieved VOC Archives from to the user's queries, focusing on the context of the question and providing insights. It will deliver detailed responses, aiming for around 500 words, to enrich the user's understanding. It won't ask user for clarification so as to give a seamless experience.",
        },
        {
          role: "user",
          content: `Explain the the following Documents from VOC Archives (I am giving you translations, not the originals) in context of the query ${dehydratedSource}`,
        },
      ];
      break;
    case "loc-new-index":
    case "openalex-index":
      summaryPrompt = [
        {
          role: "user",
          content: `Given below is some context of a document, please generate summary of the document using the given context. \n\n ${dehydratedSource}`,
        },
      ];
      break;
  }

  try {
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: summaryPrompt,
      onFinish: async ({ text }) => {
        await db.insert(savedResults).values({
          generatedSummary: text,
          opensearchId: opensearchDocId,
          opensearchIndex: opensearchIndex,
          userId: session.user.id,
        });
      },
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
  } catch (error) {
    console.log(error);
  }
}
