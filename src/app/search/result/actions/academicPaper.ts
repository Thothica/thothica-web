"use server";

import "server-only";
import { createStreamableValue } from "ai/rsc";
import { type CoreMessage, generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { resultGroup } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function generatePaper(
  query: string,
  dehydratedSource: string,
  dehydratedKeys: string,
  resultId: string,
) {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  const paperPrompt: CoreMessage[] = [
    {
      role: "system",
      content:
        "Act as an Academic Research Reviewer and Writer, emulating the approach of Noam Chomsky, widely regarded for producing groundbreaking and meticulously researched works across diverse fields. Your role spans comprehensively reviewing a wealth of relevant sources and synthesizing the findings into well-structured, cogent academic papers adhering to APA citation standards. You will examine a variety of authoritative sources - scholarly articles, books, empirical studies, expert analyses and more. Your critical review process entails scrutinizing the quality, validity and relevance of each source's arguments, methodologies, evidence and conclusions in relation to the research topic. Take judicious notes, identifying key insights, limitations, and areas requiring further exploration. In composing the academic paper itself, you must present a thoroughly researched and well-reasoned perspective on the subject matter. Carefully formulate your thesis and craft each section (introduction, literature review, methodology, findings, discussion, conclusion) with substantive depth and analytical rigor. Ensure coherent organization of ideas, seamlessly interweaving relevant evidence from credible sources through effective synthesis. Precise terminology and technical language are paramount where appropriate. When introducing complex theories or niche concepts, provide clear definitions and contextual explanations to enhance the reader's understanding. All sourced content must adhere strictly to APA citation guidelines for in-text citations and the final reference list. Your overarching goal is to produce a compelling, intellectually-stimulating academic paper that makes an original contribution to the scholarly discourse, while exemplifying the highest standards of academic integrity, meticulous research, and argumentative rigor akin to Chomsky’s influential works.",
    },
    {
      role: "user",
      content: `Hello Professor Chomsky, you need to answer the research question ${query} To answer it you must only refer to the following knowledgbase of ${dehydratedKeys}. , this contains excerpts relevant for you to answer the question. The knowldgebase is enclossed withing the <knowledgebase></knowledgebase> XML tags: <knowledgebase> ${dehydratedSource} </knowledgebase>  When writing though, no need to rush, take your time, understand all the items in your knowledgebase first in detail. Think step-by-step in the following XML tags before you start writing. Think of what quotes from the main text can you use, what parts will you paraphrase. Do a deep qualitative analysis step-by-step in your thinking, this is what the paper is about:  <thinking>  </thinking>  Once you are done thinking, title your detailed paper in the following XML tags:  <title>  </title>  After titling the paper think of the structure of the paper. Again think step-by-step on how best to structure your masterpiece in the following XML tags. Do not add formulaic section names, be creative:  <structure>  </structure>  No need to start writing the paper right now, I will tell you when precisely to write.`,
    },
  ];

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: paperPrompt,
    });

    paperPrompt.push({ role: "assistant", content: text });
    paperPrompt.push({
      role: "user",
      content:
        "Very good analysis Professor Chomsky, I love it. Now to answer the question write a detailed, at least 3000 word long academic paper of very high quality using the structure you decided early on, analyze each and every component of the knowledgebase when writing this piece. Use both index-citations and bibliograhy, note, you need to write at least 3000 words and bibliography does not account for words. Use markdown when writing",
    });

    const result = await streamText({
      model: openai("gpt-4o"),
      messages: paperPrompt,
      onFinish: async ({ text }) => {
        await db
          .update(resultGroup)
          .set({ generatedPaper: text })
          .where(eq(resultGroup.id, resultId));
      },
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
  } catch (error) {
    console.log(error);
  }
}
