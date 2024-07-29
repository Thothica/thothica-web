'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { error } from 'console';
import SearchIcon from 'public/assets/SearchIcon';
import React, { useState } from 'react';

const tags = [
  { id: 1, name: "Academic" },
  { id: 2, name: "Library Of Congress" },
  { id: 3, name: "Arabic Books" },
  { id: 4, name: "Legal" },
  { id: 5, name: "Manuscripts" },
  { id: 6, name: "Indic Literature" },
  { id: 7, name: "Grey Literature" },
  { id: 8, name: "Poetry" },
];

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const [selectedTag, setSelectedTag] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    if (searchQuery && selectedTag) {
      setResults(['result1', 'result2']);
    } else {
      alert('Select a Tag first!');
    }
  };

  const handleTagClick = (tagId: number) => {
    setSelectedTag(tagId);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4 flex items-center rounded-lg border bg-foreground px-4 py-2">
        <div className="relative flex-1 rounded-sm bg-background">
          <Input
            type="search"
            placeholder="Enter Your Research Question Here..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full border-none bg-transparent focus:outline-none focus:ring-0"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4 bg-muted/50 text-background"
          onClick={handleSearch}
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Button
            key={tag.id}
            variant='outline'
            size="sm"
            className={`border-muted-foreground shadow-md hover:bg-primary hover:text-primary-foreground rounded-full ${
              selectedTag === tag.id ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </Button>
        ))}
      </div>

      <div className="rounded-lg bg-background py-4">
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index} className="py-4">
                {result}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground"></p>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
};

export default Searchbar;
