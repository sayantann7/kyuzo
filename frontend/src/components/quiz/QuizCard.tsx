
import React from 'react';
import { cn } from '@/lib/utils';
import { BookOpen, Clock, Star } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';

interface QuizCardProps {
  id: string;
  title: string;
  description?: string;
  questions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  timeEstimate?: string;
  tags?: string[];
  onSelect?: () => void;
}

const QuizCard = ({
  id,
  title,
  description,
  questions,
  difficulty,
  timeEstimate = '10-15 min',
  tags = [],
  onSelect
}: QuizCardProps) => {
  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-500',
    intermediate: 'bg-yellow-500/20 text-yellow-500',
    advanced: 'bg-orange-500/20 text-orange-500',
    master: 'bg-red-500/20 text-red-500'
  };

  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02]">
      <div className="p-6">
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-kyuzo-paper mb-1">{title}</h3>
            {description && (
              <p className="text-sm text-kyuzo-paper/70 mb-2">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={cn("text-xs px-2 py-1 rounded-full", difficultyColors[difficulty])}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span className="text-xs bg-kyuzo-indigo/20 text-kyuzo-paper px-2 py-1 rounded-full flex items-center gap-1">
            <BookOpen size={12} /> {questions} questions
          </span>
          <span className="text-xs bg-kyuzo-indigo/20 text-kyuzo-paper px-2 py-1 rounded-full flex items-center gap-1">
            <Clock size={12} /> {timeEstimate}
          </span>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-kyuzo-black/30 text-kyuzo-paper/70 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <ButtonCustom 
          variant="default" 
          className="w-full"
          onClick={onSelect}
        >
          Start Quiz
        </ButtonCustom>
      </div>
    </div>
  );
};

export default QuizCard;
