
import React, { useState, useEffect } from 'react';
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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const QuizzesList = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
      const fetchQuizzes = async () => {
        try {
          const userId = localStorage.getItem('userId');
          const response = await fetch(`http://localhost:3000/getQuizzes/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
          const data = await response.json();
          console.log(data);
          let quizzesData = [];
          data.forEach(quiz => {
            quizzesData.push({
              id: quiz._id,
              title: quiz.title,
              difficulty: quiz.difficulty,
              questions: quiz.questions.length,
              tags: quiz.tags
            });
          })
          setQuizzes(quizzesData);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
      };
  
      fetchQuizzes();
    }, []);

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
