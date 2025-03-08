import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';
import Navbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';

const AttemptQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getQuiz/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setQuiz(data);
        setTimeRemaining(data.duration * 60); // convert to seconds
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

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
  }, [quiz]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: optionId
    }));
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

  const handleSubmitQuiz = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:3000/submitQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId: id,
          userId,
          answers: selectedAnswers,
          score: calculateScore(),
          timeSpent: quiz.duration * 60 - timeRemaining,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setQuizSubmitted(true);
        navigate(`/quiz-results/${data.resultId}`, {
          state: {
            answers: selectedAnswers,
            score: calculateScore(),
            totalQuestions: quiz.questions.length,
            correctAnswers: calculateCorrectAnswers(),
            quizTitle: quiz.title,
          },
        });
      } else {
        console.error("Error submitting quiz:", data.error);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const calculateScore = () => {
    const correctAnswers = calculateCorrectAnswers();
    return (correctAnswers / quiz.questions.length) * 100;
  };

  const calculateCorrectAnswers = () => {
    return quiz.questions.reduce((count: number, question: any) => {
      if (selectedAnswers[question.id] === question.correctOptionId) {
        return count + 1;
      }
      return count;
    }, 0);
  };

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
                style={{ width: `${(currentQuestionIndex / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question card */}
          <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium text-kyuzo-paper">
                <span className="text-kyuzo-gold">Q{currentQuestionIndex + 1}:</span> {currentQuestion.question}
              </h2>
            </div>
            
            <div className="space-y-3 mt-6">
              {currentQuestion.options.map((option: any) => (
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
                icon={<ChevronRight size={16} />}
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
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-md flex items-center justify-center text-sm transition-all ${
                    index === currentQuestionIndex
                      ? 'bg-kyuzo-gold text-kyuzo-black font-medium'
                      : selectedAnswers[q.id]
                        ? 'bg-kyuzo-gold/20 text-kyuzo-paper'
                        : 'bg-kyuzo-black/50 text-kyuzo-paper/70 border border-kyuzo-gold/20'
                  }`}
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