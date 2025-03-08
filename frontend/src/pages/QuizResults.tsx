import React, { useEffect, useState } from 'react';
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

const QuizResults = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getQuizResult/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching quiz result:", error);
      }
    };

    fetchResult();
  }, [id]);

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
        icon: <CheckCircle size={40} className="text-kyuzo-gold" />
      };
    } else {
      return {
        message: "This was challenging, but it's a great learning opportunity!",
        improvement: "Start with the basics of Japanese feudal history before tackling the Edo period again. Try our beginner quizzes on Japanese historical periods and important figures.",
        icon: <RotateCcw size={40} className="text-kyuzo-gold" />
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
                    strokeDasharray={`${score}, 100`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-kyuzo-gold">{Math.round(score)}%</span>
                </div>
              </div>
              <p className="text-kyuzo-paper/80 text-sm">You answered {correctAnswers} out of {totalQuestions} questions correctly.</p>
            </div>
            
            {/* Feedback */}
            <div className="flex items-center gap-4 p-4 bg-kyuzo-black/50 rounded-md">
              {feedback.icon}
              <div>
                <p className="text-lg font-medium text-kyuzo-paper">{feedback.message}</p>
                <p className="text-sm text-kyuzo-paper/70">{feedback.improvement}</p>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex justify-between">
            <ButtonCustom 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              icon={<List size={16} />}
            >
              Back to Dashboard
            </ButtonCustom>
            <ButtonCustom 
              variant="default" 
              onClick={() => navigate('/quizzes')}
              icon={<ArrowRight size={16} />}
            >
              View All Quizzes
            </ButtonCustom>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizResults;