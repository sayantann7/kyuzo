
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Filter, Clock } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';

interface QuizItem {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  questions: number;
  createdAt: string;
  tags: string[];
}

const QuizzesList = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Sample quiz data
  const quizzes: QuizItem[] = [
    {
      id: 'q1',
      title: 'Japanese Feudal History',
      difficulty: 'intermediate',
      questions: 15,
      createdAt: '2023-10-12',
      tags: ['history', 'japan', 'feudal']
    },
    {
      id: 'q2',
      title: 'Samurai Weapons & Armor',
      difficulty: 'advanced',
      questions: 20,
      createdAt: '2023-10-08',
      tags: ['weapons', 'samurai', 'martial arts']
    },
    {
      id: 'q3',
      title: 'Edo Period Art & Culture',
      difficulty: 'intermediate',
      questions: 12,
      createdAt: '2023-10-02',
      tags: ['art', 'culture', 'edo']
    },
    {
      id: 'q4',
      title: 'Basic Japanese Phrases',
      difficulty: 'beginner',
      questions: 10,
      createdAt: '2023-09-25',
      tags: ['language', 'basics', 'phrases']
    }
  ];

  // Filter quizzes based on selected filter
  const filteredQuizzes = filter === 'all' 
    ? quizzes 
    : quizzes.filter(quiz => {
        if (filter === 'beginner') return quiz.difficulty === 'beginner';
        if (filter === 'intermediate') return quiz.difficulty === 'intermediate';
        if (filter === 'advanced') return quiz.difficulty === 'advanced';
        return true;
      });

  // Map difficulty to color
  const difficultyColor = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-orange-500/20 text-orange-400',
    master: 'bg-red-500/20 text-red-400'
  };

  const handleTakeQuiz = (quizId: string) => {
    navigate(`/attempt-quiz/${quizId}`);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy">Your Quizzes</h2>
        <Link to="/create-quiz">
          <ButtonCustom 
            variant="default" 
            size="sm"
            icon={<BookOpen size={16} />}
          >
            Create New Quiz
          </ButtonCustom>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <ButtonCustom 
          variant={filter === 'all' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </ButtonCustom>
        <ButtonCustom 
          variant={filter === 'beginner' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setFilter('beginner')}
        >
          Beginner
        </ButtonCustom>
        <ButtonCustom 
          variant={filter === 'intermediate' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setFilter('intermediate')}
        >
          Intermediate
        </ButtonCustom>
        <ButtonCustom 
          variant={filter === 'advanced' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setFilter('advanced')}
        >
          Advanced
        </ButtonCustom>
        <ButtonCustom 
          variant="ghost" 
          size="sm"
          icon={<Filter size={14} />}
        >
          More Filters
        </ButtonCustom>
      </div>

      {/* Quizzes List */}
      <div className="space-y-4">
        {filteredQuizzes.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-kyuzo-paper/60">No quizzes match your filter criteria.</p>
          </div>
        ) : (
          filteredQuizzes.map(quiz => (
            <div key={quiz.id} className="border border-kyuzo-gold/20 rounded-md overflow-hidden">
              <div className="p-4 bg-kyuzo-red/5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-kyuzo-paper">{quiz.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[quiz.difficulty]}`}>
                        {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                      </span>
                      <span className="text-xs text-kyuzo-paper/60 flex items-center gap-1">
                        <BookOpen size={12} /> {quiz.questions} questions
                      </span>
                      <span className="text-xs text-kyuzo-paper/60 flex items-center gap-1">
                        <Clock size={12} /> {new Date(quiz.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <ButtonCustom 
                      variant="default" 
                      size="sm"
                      className="flex-1 sm:flex-initial"
                      onClick={() => handleTakeQuiz(quiz.id)}
                    >
                      Take Quiz
                    </ButtonCustom>
                    <ButtonCustom 
                      variant="outline" 
                      size="sm"
                      className="flex-1 sm:flex-initial"
                    >
                      Edit
                    </ButtonCustom>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {filteredQuizzes.length > 0 && (
        <div className="mt-6 text-center">
          <ButtonCustom 
            variant="ghost"
            onClick={() => navigate('/quizzes')}
          >
            View All Quizzes
          </ButtonCustom>
        </div>
      )}
    </div>
  );
};

export default QuizzesList;
