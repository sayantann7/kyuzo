
import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Award, TrendingUp, CheckCircle, XCircle, ArrowRight, RotateCcw, List, Share2 } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';
import Navbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';

interface LocationState {
  answers: Record<string, string>;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  quizTitle: string;
}

// Mock quiz data with questions and correct answers
const mockQuiz = {
  id: '1',
  title: 'Japanese History: Edo Period',
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
      correctOptionId: 'a',
      explanation: 'Tokugawa Ieyasu became the first shogun of the Tokugawa shogunate in 1603, after his victory at the Battle of Sekigahara in 1600.'
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
      correctOptionId: 'b',
      explanation: 'Sakoku, meaning "closed country," was the isolationist foreign policy of the Japanese Tokugawa shogunate under which relations and trade between Japan and other countries were severely limited.'
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
      correctOptionId: 'd',
      explanation: 'During the Sakoku period, firearms were strictly controlled and not imported. The Tokugawa shogunate wanted to maintain its monopoly on weapons technology.'
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
      correctOptionId: 'c',
      explanation: 'Edo (modern-day Tokyo) was the seat of the Tokugawa shogunate and the de facto capital of Japan during this period, while Kyoto remained the formal capital where the Emperor resided.'
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
      correctOptionId: 'd',
      explanation: 'The Edo period maintained a strict class hierarchy called "shinokosho" with samurai at the top, followed by farmers, artisans, and merchants at the bottom.'
    }
  ]
};

const QuizResults = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  
  useEffect(() => {
    // If there's no state (user directly accessed this page), redirect to dashboard
    if (!state) {
      navigate('/dashboard');
    }
  }, [state, navigate]);
  
  if (!state) return null;
  
  const { answers, score, totalQuestions, correctAnswers, quizTitle } = state;
  
  // Generate feedback based on score
  const getFeedback = () => {
    if (score >= 90) {
      return {
        message: "Excellent! You have a strong understanding of this subject.",
        improvement: "To perfect your knowledge, explore more advanced topics in Japanese history. Try taking quiz series on specific Edo period events.",
        icon: <Award size={40} className="text-kyuzo-gold" />
      };
    } else if (score >= 70) {
      return {
        message: "Great job! You have a good grasp of the material.",
        improvement: "To improve further, focus on the specific questions you missed and study those areas more closely. Try reviewing the Sakoku policies and social structure of Edo Japan.",
        icon: <TrendingUp size={40} className="text-kyuzo-gold" />
      };
    } else if (score >= 50) {
      return {
        message: "Good effort! You're on the right track.",
        improvement: "Consider spending more time on the fundamentals of Edo period history. Focus on key historical figures and important policies of the Tokugawa shogunate.",
        icon: <TrendingUp size={40} className="text-kyuzo-paper" />
      };
    } else {
      return {
        message: "This was challenging, but it's a great learning opportunity!",
        improvement: "Start with the basics of Japanese feudal history before tackling the Edo period again. Try our beginner quizzes on Japanese historical periods and important figures.",
        icon: <RotateCcw size={40} className="text-kyuzo-paper" />
      };
    }
  };
  
  const feedback = getFeedback();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 bg-kyuzo-black">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-6 mb-8">
            <h1 className="text-2xl font-bold text-kyuzo-gold mb-2 font-calligraphy">Quiz Results</h1>
            <p className="text-kyuzo-paper/80 text-sm">{quizTitle}</p>
            
            {/* Score display */}
            <div className="mt-6 mb-8 flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="rgba(223, 194, 130, 0.2)" 
                    strokeWidth="8"
                  />
                  {/* Score circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="rgba(223, 194, 130, 1)" 
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * score) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold text-kyuzo-gold">{Math.round(score)}<span className="text-2xl">%</span></span>
                  <span className="text-sm text-kyuzo-paper/70 mt-1">Score</span>
                </div>
              </div>
              
              <div className="flex gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-kyuzo-gold">{correctAnswers}</p>
                  <p className="text-sm text-kyuzo-paper/70">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-kyuzo-paper">{totalQuestions - correctAnswers}</p>
                  <p className="text-sm text-kyuzo-paper/70">Incorrect</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-kyuzo-paper">{totalQuestions}</p>
                  <p className="text-sm text-kyuzo-paper/70">Total</p>
                </div>
              </div>
            </div>
            
            {/* Feedback section */}
            <div className="p-5 border border-kyuzo-gold/20 rounded-lg bg-kyuzo-red/5">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {feedback.icon}
                </div>
                <div>
                  <h2 className="text-xl font-medium text-kyuzo-gold mb-2">Your Performance</h2>
                  <p className="text-kyuzo-paper mb-3">{feedback.message}</p>
                  <p className="text-kyuzo-paper/80 text-sm">{feedback.improvement}</p>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <ButtonCustom 
                variant="default" 
                icon={<RotateCcw size={18} />}
                onClick={() => navigate(`/attempt-quiz/${id}`)}
              >
                Retry Quiz
              </ButtonCustom>
              
              <ButtonCustom 
                variant="outline" 
                icon={<List size={18} />}
                onClick={() => navigate('/dashboard')}
              >
                All Quizzes
              </ButtonCustom>
              
              <ButtonCustom 
                variant="outline" 
                icon={<Share2 size={18} />}
                onClick={() => {
                  // Mock share functionality
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
              >
                Share Results
              </ButtonCustom>
            </div>
          </div>
          
          {/* Answers review */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-medium text-kyuzo-gold mb-4">Question Review</h2>
            
            <div className="space-y-8">
              {mockQuiz.questions.map((question, index) => {
                const userAnswerId = answers[question.id];
                const isCorrect = userAnswerId === question.correctOptionId;
                const userAnswer = question.options.find(o => o.id === userAnswerId);
                const correctAnswer = question.options.find(o => o.id === question.correctOptionId);
                
                return (
                  <div key={question.id} className="border border-kyuzo-gold/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <XCircle size={18} className="text-kyuzo-red" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-kyuzo-paper font-medium mb-2">
                          <span className="text-kyuzo-gold">{index + 1}.</span> {question.question}
                        </h3>
                        
                        {userAnswer && (
                          <div className="mb-2">
                            <p className="text-sm text-kyuzo-paper/70">Your answer:</p>
                            <p className={`text-sm ${isCorrect ? 'text-green-500' : 'text-kyuzo-red'}`}>
                              {userAnswer.text}
                            </p>
                          </div>
                        )}
                        
                        {!isCorrect && correctAnswer && (
                          <div className="mb-2">
                            <p className="text-sm text-kyuzo-paper/70">Correct answer:</p>
                            <p className="text-sm text-green-500">{correctAnswer.text}</p>
                          </div>
                        )}
                        
                        {question.explanation && (
                          <div className="mt-3 pt-3 border-t border-kyuzo-gold/10">
                            <p className="text-sm text-kyuzo-paper/70">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizResults;
