"use client";
import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent } from "react";
import { generateSummary } from "../../actions/summarization";
import { type Index } from "@/server/api/utils";
import { readStreamableValue } from "ai/rsc";
import LargeInformation from "./largeInformation";

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
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSummary("Generating Summary, please wait a moment...");
    const result = await generateSummary(
      opensearchIndex,
      dehydratedSource,
      resultId,
    );

    setSummary("");
    for await (const content of readStreamableValue(result)) {
      if (!content) continue;
      setSummary(content);
    }
    setLoading(false);
  };

  return (
    <>
      {summary.length === 0 ? (
        <form onSubmit={HandleSubmit}>
          <Button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Summary"}
          </Button>
        </form>
      ) : (
        <LargeInformation title="Generated Summary" value={summary} />
      )}
    </>
  );
}
