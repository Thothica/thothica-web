'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchIcon from 'public/assets/SearchIcon';

const tags = [
  { id: 1, name: 'Academic' },
  { id: 2, name: 'Library Of Congress' },
  { id: 3, name: 'Arabic Books' },
  { id: 4, name: 'Legal' },
  { id: 5, name: 'Manuscripts' },
  { id: 6, name: 'Indic Literature' },
  { id: 7, name: 'Grey Literature' },
  { id: 8, name: 'Poetry' },
];

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Store the input value or perform search logic
    console.log('Search query:', searchQuery);
    if(searchQuery){
        setResults([`result`,`result3`]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-foreground border rounded-lg px-4 py-2 mb-4">
        <div className="flex-1 relative bg-background rounded-sm">
          <Input
            type="search"
            placeholder="Enter Your Research Question Here..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4 text-background bg-muted/50"
          onClick={handleSearch}
        >
          <SearchIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Button key={tag.id} variant="outline" size="sm" className="rounded-full border-foreground hover:bg-yellow-200 ">
            {tag.name}
          </Button>
        ))}
      </div>

      <div className="bg-background py-4 rounded-lg">
        {results.length > 0 ? (
          <ul>
            <span className='text-2xl sm:text-4xl text-foreground'>Results for {searchQuery}</span>
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
}

export default Searchbar