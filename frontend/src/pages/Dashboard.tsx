
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import QuizCreator from '../components/quiz/QuizCreator';
import QuizzesList from '../components/dashboard/QuizzesList';
import Friends from '../components/dashboard/Friends';
import Leaderboard from '../components/dashboard/Leaderboard';
import { Award, TrendingUp, BookOpen, Target } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const userData = {
    name: "Akira",
    level: 15,
    xp: 3750,
    xpToNextLevel: 4000,
    quizzesTaken: 42,
    averageScore: 78,
    streak: 7
  };
  
  // Stats cards data
  const statsCards = [
    {
      label: "Total XP",
      value: userData.xp.toLocaleString(),
      icon: Award,
      color: "bg-gradient-to-r from-amber-500 to-yellow-400"
    },
    {
      label: "Day Streak",
      value: userData.streak,
      icon: TrendingUp,
      color: "bg-gradient-to-r from-green-500 to-emerald-400"
    },
    {
      label: "Quizzes Taken",
      value: userData.quizzesTaken,
      icon: BookOpen,
      color: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      label: "Avg. Score",
      value: `${userData.averageScore}%`,
      icon: Target,
      color: "bg-gradient-to-r from-purple-500 to-violet-400"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 bg-kyuzo-black">
        <div className="max-w-7xl mx-auto">
          {/* Welcome and Stats Section */}
          <section className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-kyuzo-paper mb-2">
                  Welcome back, <span className="text-kyuzo-gold">{userData.name}</span>
                </h1>
                <p className="text-kyuzo-paper/70">
                  Continue your learning journey and challenge yourself with new quizzes.
                </p>
              </div>
              
              <div className="mt-4 lg:mt-0 flex items-center gap-3">
                <ButtonCustom 
                  variant="default" 
                  icon={<BookOpen size={18} />}
                  onClick={() => navigate('/create-quiz')}
                >
                  Create Quiz
                </ButtonCustom>
                <ButtonCustom 
                  variant="outline"
                  onClick={() => navigate('/quizzes')}
                >
                  Browse Quizzes
                </ButtonCustom>
              </div>
            </div>
            
            {/* XP Progress */}
            <div className="glass-card p-4 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-kyuzo-gold" />
                  <span className="text-kyuzo-paper font-medium">Level {userData.level}</span>
                </div>
                <div className="text-sm text-kyuzo-paper/70">
                  {userData.xp}/{userData.xpToNextLevel} XP to Level {userData.level + 1}
                </div>
              </div>
              <div className="w-full h-2 bg-kyuzo-black/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-kyuzo-gold rounded-full" 
                  style={{ width: `${(userData.xp / userData.xpToNextLevel) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statsCards.map((stat, index) => (
                <div key={index} className="glass-card p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-kyuzo-paper/70 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-kyuzo-paper mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
              <QuizCreator />
              <Friends />
            </div>
            
            {/* Middle Column */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              <QuizzesList />
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
