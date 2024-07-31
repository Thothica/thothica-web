import React from "react";
import { Button } from "./ui/button";
import { Bookmark, ChevronRight } from "lucide-react";
import { Trash2 } from "lucide-react";

interface SavedCardProps {
  title: string;
  handleSave?: () => void;
  handleRemove?: () => void;
}

const SavedCard: React.FC<React.PropsWithChildren<SavedCardProps>> = ({
  title,
  handleSave,
  handleRemove,
}) => {
  return (
    <div className="mx-auto max-w-4xl my-6 rounded-lg hover:bg-foreground/10 border border-gray-400 p-6 shadow-xl transition-all">
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-lg font-bold sm:text-2xl">Query: {title}</h1>
          <ChevronRight className="w-6 h-6"/>
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

    </div>
  );
};

export default SavedCard;
