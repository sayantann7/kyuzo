
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle, Flag } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';
import Navbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

// Mock quiz data - in a real app, this would come from an API
const mockQuiz = {
  id: '1',
  title: 'Japanese History: Edo Period',
  description: 'Test your knowledge about Japan\'s Edo period (1603-1868).',
  questions: [
    {
      id: '1',
      question: 'Who was the first shogun of the Tokugawa shogunate?',
      options: [
        { id: 'a', text: 'Tokugawa Ieyasu' },
        { id: 'b', text: 'Toyotomi Hideyoshi' },
        { id: 'c', text: 'Oda Nobunaga' },
        { id: 'd', text: 'Tokugawa Hidetada' }
      ],
      correctOptionId: 'a'
    },
    {
      id: '2',
      question: 'What was the policy of national isolation called in Japanese?',
      options: [
        { id: 'a', text: 'Bakufu' },
        { id: 'b', text: 'Sakoku' },
        { id: 'c', text: 'Daimyo' },
        { id: 'd', text: 'Sankin-kotai' }
      ],
      correctOptionId: 'b'
    },
    {
      id: '3',
      question: 'Which commodity was NOT imported to Japan during the Sakoku period?',
      options: [
        { id: 'a', text: 'Silk' },
        { id: 'b', text: 'Sugar' },
        { id: 'c', text: 'Medicine' },
        { id: 'd', text: 'Firearms' }
      ],
      correctOptionId: 'd'
    },
    {
      id: '4',
      question: 'What was the capital city called during the Edo period?',
      options: [
        { id: 'a', text: 'Kyoto' },
        { id: 'b', text: 'Osaka' },
        { id: 'c', text: 'Edo' },
        { id: 'd', text: 'Nagasaki' }
      ],
      correctOptionId: 'c'
    },
    {
      id: '5',
      question: 'Which social class was at the top of the hierarchy in Edo period Japan?',
      options: [
        { id: 'a', text: 'Merchants' },
        { id: 'b', text: 'Farmers' },
        { id: 'c', text: 'Artisans' },
        { id: 'd', text: 'Samurai' }
      ],
      correctOptionId: 'd'
    }
  ],
  timeLimit: 10 // minutes
};

const AttemptQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, we would fetch the quiz data based on the ID
  const quiz = mockQuiz;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // convert to seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId
    });
  };
  
  const handleFlagQuestion = (questionId: string) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    if (!quizSubmitted) {
      // Check if all questions are answered
      const unansweredCount = quiz.questions.filter(q => !selectedAnswers[q.id]).length;
      
      if (unansweredCount > 0 && timeRemaining > 5) {
        toast({
          title: `${unansweredCount} question${unansweredCount > 1 ? 's' : ''} unanswered`,
          description: "Are you sure you want to submit?",
          variant: "destructive",
        });
        return;
      }
      
      setQuizSubmitted(true);
      
      // Calculate score
      const correctAnswers = quiz.questions.filter(q => 
        selectedAnswers[q.id] === q.correctOptionId
      ).length;
      
      const score = (correctAnswers / quiz.questions.length) * 100;
      
      // In a real app, we would submit the quiz to the server
      console.log({ 
        quizId: quiz.id, 
        answers: selectedAnswers, 
        score,
        timeSpent: quiz.timeLimit * 60 - timeRemaining
      });
      
      // Navigate to results page
      navigate(`/quiz-results/${quiz.id}`, { 
        state: { 
          answers: selectedAnswers,
          score,
          totalQuestions: quiz.questions.length,
          correctAnswers,
          quizTitle: quiz.title
        } 
      });
    }
  };
  
  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  const progress = (currentQuestionIndex + 1) / quiz.questions.length * 100;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 bg-kyuzo-black">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-6 mb-6">
            <h1 className="text-2xl font-bold text-kyuzo-gold mb-2 font-calligraphy">{quiz.title}</h1>
            <p className="text-kyuzo-paper/80 text-sm mb-4">{quiz.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-kyuzo-paper/70">
                <Clock size={16} />
                <span>{formatTime(timeRemaining)}</span>
              </div>
              
              <div className="text-sm text-kyuzo-paper/70">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-kyuzo-black/50 rounded-full mt-4 overflow-hidden">
              <div 
                className="h-full bg-kyuzo-gold rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question card */}
          <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium text-kyuzo-paper">
                <span className="text-kyuzo-gold">{currentQuestionIndex + 1}.</span> {currentQuestion.question}
              </h2>
              
              <button 
                onClick={() => handleFlagQuestion(currentQuestion.id)}
                className={`p-1.5 rounded-full ${flaggedQuestions.includes(currentQuestion.id) ? 'text-kyuzo-red bg-kyuzo-red/10' : 'text-kyuzo-paper/50 hover:text-kyuzo-gold hover:bg-kyuzo-gold/10'}`}
                title={flaggedQuestions.includes(currentQuestion.id) ? "Unflag question" : "Flag for review"}
              >
                <Flag size={16} />
              </button>
            </div>
            
            <div className="space-y-3 mt-6">
              {currentQuestion.options.map(option => (
                <div 
                  key={option.id}
                  onClick={() => handleSelectAnswer(currentQuestion.id, option.id)}
                  className={`p-4 border rounded-md cursor-pointer transition-all ${
                    selectedAnswers[currentQuestion.id] === option.id
                      ? 'border-kyuzo-gold bg-kyuzo-gold/10 text-kyuzo-paper'
                      : 'border-kyuzo-gold/20 bg-kyuzo-black/50 text-kyuzo-paper/80 hover:bg-kyuzo-red/5'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQuestion.id] === option.id
                        ? 'border-kyuzo-gold bg-kyuzo-gold text-kyuzo-black'
                        : 'border-kyuzo-gold/50'
                    }`}>
                      {selectedAnswers[currentQuestion.id] === option.id && '✓'}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between">
            <ButtonCustom 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              icon={<ChevronLeft size={16} />}
            >
              Previous
            </ButtonCustom>
            
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <ButtonCustom 
                variant="default" 
                onClick={handleNextQuestion}
                icon={<ChevronRight size={16} />}
                iconPosition="right"
              >
                Next
              </ButtonCustom>
            ) : (
              <ButtonCustom 
                variant="default" 
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </ButtonCustom>
            )}
          </div>
          
          {/* Question navigation */}
          <div className="mt-8">
            <p className="text-sm text-kyuzo-paper/70 mb-2">Question Navigation:</p>
            <div className="flex flex-wrap gap-2">
              {quiz.questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(index)}
                  className={`w-10 h-10 rounded-md flex items-center justify-center text-sm transition-all ${
                    index === currentQuestionIndex
                      ? 'bg-kyuzo-gold text-kyuzo-black font-medium'
                      : selectedAnswers[q.id]
                        ? 'bg-kyuzo-gold/20 text-kyuzo-paper'
                        : 'bg-kyuzo-black/50 text-kyuzo-paper/70 border border-kyuzo-gold/20'
                  } ${flaggedQuestions.includes(q.id) ? 'ring-2 ring-kyuzo-red' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          {!selectedAnswers[currentQuestion.id] && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-kyuzo-red/10 border border-kyuzo-red/20 rounded-md">
              <AlertTriangle size={16} className="text-kyuzo-gold flex-shrink-0" />
              <p className="text-xs text-kyuzo-paper/80">
                You haven't answered this question yet.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AttemptQuiz;
