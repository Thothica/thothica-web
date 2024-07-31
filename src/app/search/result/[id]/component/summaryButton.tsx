"use client";
import { Button } from "@/components/ui/button";
import { type ChangeEvent, useState } from "react";
import { generateSummary } from "../../actions/summarization";
import { type Index } from "@/server/api/utils";
import { readStreamableValue } from "ai/rsc";

export default function SummaryButton({
  opensearchIndex,
  dehydratedSource,
  resultId,
}: {
  opensearchIndex: Index;
  dehydratedSource: string;
  resultId: string;
}) {
  const [summary, setSummary] = useState("");

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSummary("Generating Summary please wait a moment...");
    const result = await generateSummary(
      opensearchIndex,
      dehydratedSource,
      resultId,
    );

    setSummary("");
    // @ts-expect-error Docs say to do this
    for await (const content of readStreamableValue(result)) {
      if (!content) {
        continue;
      }
      setSummary(content);
    }
  };
  return (
    <>
      {summary}
      {summary.length == 0 && (
        <form onSubmit={HandleSubmit}>
          <Button type="submit">Generate Summary</Button>
        </form>
      )}
    </>
  );
}
