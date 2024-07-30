import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from 'lucide-react';
import { Trash2 } from 'lucide-react';

interface ResultCardProps {
  title: string;
  author?: string;
  handleSave?: () => void;
  handleRemove?: () => void;
}

const ResultCard: React.FC<React.PropsWithChildren<ResultCardProps>> = ({
  title,
  author,
  handleSave,
  handleRemove,
  children,
}) => {
  return (
    <div className=" p-6 my-6 border border-gray-300 shadow-xl rounded-lg hover:bg-foreground/10 transition-all">
      <div className="flex justify-between pb-4">

        <div>
          <h1 className="font-serif font-bold text-lg sm:text-2xl">{title}</h1>
          { author && <p className="text-sm sm:text-normal">{author}</p>}
        </div>

        <div className="flex ml-4">
          { handleSave && 
            <Button onClick={handleSave} className="ml-4">
              <div className="flex flex-center">
              Save
              <Bookmark className="ml-2 w-4 h-4"/>
              </div>
            </Button>
          }
          { handleRemove && 
            <Button onClick={handleRemove} className="ml-4">
              <div className="flex flex-center">
              Remove
              <Trash2 className="ml-2 w-4 h-4"/>
              </div>
            </Button>
          }
        </div>

      </div>
    
      {children}
    </div>
  );
};

export default ResultCard;
