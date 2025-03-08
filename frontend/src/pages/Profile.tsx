import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/DashboardNavbar";
import Footer from "../components/layout/Footer";
import { User, Mail, Calendar, BookOpen, TrendingUp } from "lucide-react";
import ButtonCustom from "../components/ui/button-custom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [quizResults, setQuizResults] = useState([]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:3000/getUserDetails/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuizResults = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:3000/getQuizResults/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setQuizResults(data);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchQuizResults();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="relative glass-card p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative">
                <img
                  src="/avatar.jpg"
                  alt={user.fullname}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-kyuzo-gold/30"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-kyuzo-paper mb-1">
                      {user.fullname}
                    </h1>
                    <p className="text-kyuzo-paper/60">@{user.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-kyuzo-paper/70">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-kyuzo-paper/70">
                    <Calendar size={16} />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-kyuzo-gold">
                    <User size={16} />
                    <span>Level {user.level}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-kyuzo-paper/70">
                  XP: {user.xp}
                </span>
                <span className="text-sm text-kyuzo-paper/70">
                  Next Level: {user.xpToNextLevel} XP remaining
                </span>
              </div>
              <div className="w-full h-2 bg-kyuzo-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-kyuzo-gold rounded-full"
                  style={{ width: `${(user.xp % 1000) / 10}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stats */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-kyuzo-gold mb-6 font-calligraphy">
                Stats
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {quizResults.map((result, index) => (
                  <div key={index} className="glass-card p-4 text-center">
                    <div className="mx-auto mb-2 p-2 rounded-full bg-kyuzo-red/10 w-10 h-10 flex items-center justify-center">
                      <BookOpen size={18} className="text-kyuzo-gold" />
                    </div>
                    <p className="text-2xl font-bold text-kyuzo-paper">
                      {result.quizId.title}
                    </p>
                    <p className="text-sm text-kyuzo-paper/60">Score: {result.score}%</p>
                    <p className="text-sm text-kyuzo-paper/60">Date: {formatDate(result.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            {quizResults && quizResults.length > 0 && (
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-kyuzo-gold mb-6 font-calligraphy">
                  Recent Activity
                </h2>

                <div className="space-y-4">
                  {quizResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5"
                    >
                      <BookOpen size={16} className="text-kyuzo-gold" />
                      <div className="flex-1">
                        <p className="text-sm text-kyuzo-paper">
                          Completed "{result.quizId.title}" quiz
                        </p>
                        <p className="text-xs text-kyuzo-paper/60">
                          {formatDate(result.createdAt)} • Score: {result.score}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;