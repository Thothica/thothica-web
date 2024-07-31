"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Index } from "@/server/api/utils";
import { api } from "@/trpc/react";
import { Search } from "lucide-react";
import { useState } from "react";
import Error from "@/components/Error";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";

interface indexSelection {
  id: number;
  name: string;
  opensearchIndex: Index;
}

const tags: indexSelection[] = [
  // { id: 1, name: "Library Of Congress", opensearchIndex: "loc-new-index" },
  { id: 2, name: "Arabic Books", opensearchIndex: "cleaned-arabicbooks-index" },
  { id: 3, name: "Legal", opensearchIndex: "legaltext-index" },
  { id: 4, name: "Indic Literature", opensearchIndex: "indic-lit-index" },
  {
    id: 5,
    name: "Grey Literature",
    opensearchIndex: "libertarian-chunks-index",
  },
  { id: 6, name: "Poetry", opensearchIndex: "arabic-poems-index" },
  { id: 7, name: "Dutch Text", opensearchIndex: "cleaned-dutchtext-index" },
  { id: 8, name: "Academic Papers", opensearchIndex: "openalex-index" },
];

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const searchMutation = api.searchRouter.searchOnIndex.useMutation({
    onSuccess: (resultId) => {
      setIsSearching(false);
      router.push(`/search/result/${resultId}`);
    },
    onError: () => {
      setIsSearching(false);
    },
  });

  const [selectedTag, setSelectedTag] = useState<indexSelection>({
    id: 2,
    name: "Arabic Books",
    opensearchIndex: "cleaned-arabicbooks-index",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (isSearching) {
      console.log("Stop spamming");
      return;
    }

    if (!searchQuery || !selectedTag) {
      console.log("No input in search or no tag selected");
      return;
    }

    setIsSearching(true);
    searchMutation.mutate({
      query: searchQuery,
      opensearchIndex: selectedTag.opensearchIndex,
    });
  };

  const handleTagClick = (tag: indexSelection) => {
    setSelectedTag(tag);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4 flex items-center rounded-lg bg-foreground px-4 py-2">
        <div className="relative flex-1 rounded-sm bg-background">
          <Input
            type="search"
            placeholder="Enter Your Research Question Here..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full bg-transparent focus:outline-none focus:ring-0"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4 bg-muted/50 text-background"
          onClick={handleSearch}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag.id}
            variant="outline"
            size="sm"
            className={`rounded-full border-muted-foreground shadow-md hover:bg-primary hover:text-primary-foreground ${
              selectedTag.id === tag.id
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag.name}
          </Button>
        ))}
      </div>
      <div className="my-4 rounded-lg bg-transparent">
        {searchMutation.isPending && (
          <div className="my-4 flex items-center justify-center gap-4 sm:gap-6">
            <Spinner size={30} />
            <span className="text-lefy text-lg font-bold sm:text-xl">
              Searching among the best documents for you
            </span>
          </div>
        )}

        {searchMutation.isError && (
          <Error message={searchMutation.error.message} />
        )}

        {/*searchMutation.isSuccess && (
                    <span>
                        {searchMutation.data.map((result) => (
                            <ResultCard
                                key={result._id}
                                title={
                                    result._source.Title
                                        ? result._source.Title
                                        : result._source.title
                                }
                                author={result._source.Author}
                                handleSave={() => {
                                    ("");
                                }}
                            />
                        ))}
                    </span>
                )*/}
      </div>
    </div>
  );
};

export default Searchbar;
