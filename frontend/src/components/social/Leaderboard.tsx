
import React from 'react';
import { Award, TrendingUp, BookOpen } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';

interface LeaderboardProps {
  leaderboard: {
    id: number;
    rank: number;
    name: string;
    avatar: string;
    score: number;
    quizzesTaken: number;
    streak: number;
  }[];
  title?: string;
}

const Leaderboard = ({ leaderboard, title = "Leaderboard" }: LeaderboardProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy">{title}</h2>
        <ButtonCustom variant="ghost" size="sm">
          View All
        </ButtonCustom>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-kyuzo-paper/70">No leaderboard data available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leaderboard.map((user) => (
            <div 
              key={user.id} 
              className={`flex items-center gap-4 p-4 rounded-md ${
                user.rank === 1 
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-400/10 border border-yellow-400/30' 
                  : user.rank === 2 
                    ? 'bg-gradient-to-r from-gray-400/20 to-gray-300/10 border border-gray-400/30' 
                    : user.rank === 3 
                      ? 'bg-gradient-to-r from-amber-700/20 to-amber-600/10 border border-amber-700/30' 
                      : 'bg-kyuzo-red/5 border border-kyuzo-gold/10'
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-kyuzo-black text-kyuzo-gold font-bold">
                {user.rank}
              </div>
              
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full"
              />
              
              <div className="flex-1">
                <p className="font-medium text-kyuzo-paper">{user.name}</p>
                <div className="flex gap-3 text-xs text-kyuzo-paper/60 mt-1">
                  <span className="flex items-center gap-1">
                    <Award size={12} className="text-kyuzo-gold" /> {user.score} XP
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} /> {user.quizzesTaken} quizzes
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp size={12} /> {user.streak} day streak
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
