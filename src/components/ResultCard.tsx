import React from 'react';

interface ResultCardProps {
  title: string;
  id: string;
  handleSave: (id: string) => void;
  handleHistory: (id: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, id, handleSave, handleHistory }) => {
  return (
    <div className="result-card">
      <h2>{title}</h2>
      
      </div>
    </div>
  );
};

export default ResultCard;
