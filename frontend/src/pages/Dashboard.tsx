import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';
import QuizCreator from '../components/quiz/QuizCreator';
import QuizzesList from '../components/dashboard/QuizzesList';
import Friends from '../components/dashboard/Friends';
import Leaderboard from '../components/dashboard/Leaderboard';
import { Award, TrendingUp, BookOpen, Target } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [quizzesTaken, setQuizzesTaken] = useState(0);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      console.log(userId);
      const response = await fetch(`http://localhost:3000/getUserDetails/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      console.log(data);
      setUserData(data);
    }
    catch (error) {
      console.error(error);
    }
  };
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchQuizzesTaken = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getQuizzesTaken/${userId}`);
        const data = await response.json();
        setQuizzesTaken(data.quizzesTaken);
      } catch (error) {
        console.error("Error fetching quizzes taken count:", error);
      }
    };

    fetchQuizzesTaken();
  }, [userId]);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/leaderboard`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchLeaderboardData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const extractFirstName = (fullname: string): string => {
    return fullname.split(' ')[0];  // Extract the first name from the full name
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
      label: "Daily Streak",
      value: userData.dailyStreak,
      icon: TrendingUp,
      color: "bg-gradient-to-r from-green-500 to-emerald-400"
    },
    {
      label: "Quizzes",
      value: quizzesTaken,
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
                  Welcome back, <span className="text-kyuzo-gold">{extractFirstName(userData.fullname)}</span>
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
              {/* <QuizCreator /> */}
              <Friends />
            </div>
            
             {/* Middle Column */}
             <div className="flex flex-col gap-8 lg:col-span-2">
              <QuizzesList />
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy mb-4">Leaderboard</h2>
                {leaderboardData.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-kyuzo-paper/70">No leaderboard data available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leaderboardData.map((user, index) => (
                      <div 
                        key={user.id} 
                        className={`flex items-center gap-4 p-4 rounded-md ${
                          index === 0 
                            ? 'bg-gradient-to-r from-amber-500/20 to-yellow-400/10 border border-yellow-400/30' 
                            : index === 1 
                              ? 'bg-gradient-to-r from-gray-400/20 to-gray-300/10 border border-gray-400/30' 
                              : index === 2 
                                ? 'bg-gradient-to-r from-amber-700/20 to-amber-600/10 border border-amber-700/30' 
                                : 'bg-kyuzo-red/5 border border-kyuzo-gold/10'
                        }`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-kyuzo-black text-kyuzo-gold font-bold">
                          {index + 1}
                        </div>
                        <img 
                          src="/avatar.jpg" 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-kyuzo-paper">{user.name}</p>
                          <div className="flex gap-3 text-xs text-kyuzo-paper/60 mt-1">
                            <span className="flex items-center gap-1">
                              <Award size={12} className="text-kyuzo-gold" /> {user.xp} XP
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp size={12} /> {user.dailyStreak} day streak
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;