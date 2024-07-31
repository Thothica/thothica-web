"use client";

import { Button } from "@/components/ui/button";
import { type ChangeEvent, useState } from "react";
import { generatePaper } from "../../actions/academicPaper";
import { readStreamableValue } from "ai/rsc";
import LargeInformation from "./largeInformation";

export default function PaperButton({
  dehydratedKeys,
  dehydratedSource,
  resultId,
  query,
}: {
  dehydratedKeys: string;
  dehydratedSource: string;
  resultId: string;
  query: string;
}) {
  const [paper, setPaper] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPaper("Generating Paper, please wait a moment...");
    const result = await generatePaper(
      dehydratedSource,
      dehydratedKeys,
      resultId,
      query,
    );

    setPaper("");
    // @ts-expect-error docs said to use this
    for await (const content of readStreamableValue(result)) {
      if (!content) continue;
      setPaper(content);
    }
    setLoading(false);
  };

  return (
    <>
      {paper.length === 0 ? (
        <form onSubmit={HandleSubmit}>
          <Button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Paper"}
          </Button>
        </form>
      ) : (
        <LargeInformation title="Generated Paper" value={paper} />
      )}
    </>
  );
}
