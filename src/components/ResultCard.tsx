import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Trash2 } from "lucide-react";

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
    <div className=" my-6 rounded-lg bg-foreground/10 border border-gray-400 p-6 shadow-xl transition-all">
      <div className="flex justify-between pb-4">
        <div>
          <h1 className="font-serif text-lg font-bold sm:text-2xl">{title}</h1>
          {author && <p className="sm:text-normal text-sm">{author}</p>}
        </div>

        <div className="ml-4 flex">
          {handleSave && (
            <Button onClick={handleSave} className="ml-4">
              <div className="flex-center flex">
                Save
                <Bookmark className="ml-2 h-4 w-4" />
              </div>
            </Button>
          )}
          {handleRemove && (
            <Button onClick={handleRemove} className="ml-4">
              <div className="flex-center flex">
                Remove
                <Trash2 className="ml-2 h-4 w-4" />
              </div>
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-6 bg-background border border-gray-300 rounded-lg">
        {children}
      </div>

    </div>
  );
};

export default ResultCard;
