
import React, { useState } from 'react';
import { Trophy, Users, Globe, CalendarDays } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';

interface LeaderboardItem {
  id: number;
  name: string;
  avatar: string;
  rank: number;
  xp: number;
  quizCount: number;
  streak: number;
  change?: 'up' | 'down' | 'same';
  changeAmount?: number;
}

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [scope, setScope] = useState('friends');
  
  // Mock leaderboard data
  const leaderboardData: LeaderboardItem[] = [
    {
      id: 1,
      name: "Yuki Tanaka",
      avatar: "https://ui-avatars.com/api/?name=Yuki+Tanaka&background=A63A50&color=F7F3E9",
      rank: 1,
      xp: 4280,
      quizCount: 65,
      streak: 12,
      change: 'up',
      changeAmount: 2
    },
    {
      id: 2,
      name: "Kazuo Nakamura",
      avatar: "https://ui-avatars.com/api/?name=Kazuo+Nakamura&background=A63A50&color=F7F3E9",
      rank: 2,
      xp: 3750,
      quizCount: 58,
      streak: 8,
      change: 'down',
      changeAmount: 1
    },
    {
      id: 3,
      name: "Mei Lin",
      avatar: "https://ui-avatars.com/api/?name=Mei+Lin&background=A63A50&color=F7F3E9",
      rank: 3,
      xp: 3520,
      quizCount: 52,
      streak: 6,
      change: 'same'
    },
    {
      id: 4,
      name: "Takashi Mori",
      avatar: "https://ui-avatars.com/api/?name=Takashi+Mori&background=A63A50&color=F7F3E9",
      rank: 4,
      xp: 3150,
      quizCount: 46,
      streak: 5,
      change: 'up',
      changeAmount: 1
    },
    {
      id: 5,
      name: "Haruki Sato",
      avatar: "https://ui-avatars.com/api/?name=Haruki+Sato&background=A63A50&color=F7F3E9",
      rank: 5,
      xp: 2820,
      quizCount: 41,
      streak: 3,
      change: 'down',
      changeAmount: 2
    }
  ];
  
  // Your rank data
  const yourRank = {
    rank: 8,
    xp: 2350,
    quizCount: 36,
    streak: 5
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy">Leaderboard</h2>
        
        <div className="flex gap-2">
          <ButtonCustom 
            variant={scope === 'friends' ? 'default' : 'ghost'} 
            size="sm"
            icon={<Users size={16} />}
            onClick={() => setScope('friends')}
          >
            Friends
          </ButtonCustom>
          <ButtonCustom 
            variant={scope === 'global' ? 'default' : 'ghost'} 
            size="sm"
            icon={<Globe size={16} />}
            onClick={() => setScope('global')}
          >
            Global
          </ButtonCustom>
        </div>
      </div>
      
      {/* Time range filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <ButtonCustom 
          variant={timeRange === 'day' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setTimeRange('day')}
        >
          Today
        </ButtonCustom>
        <ButtonCustom 
          variant={timeRange === 'week' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setTimeRange('week')}
        >
          This Week
        </ButtonCustom>
        <ButtonCustom 
          variant={timeRange === 'month' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setTimeRange('month')}
        >
          This Month
        </ButtonCustom>
        <ButtonCustom 
          variant={timeRange === 'all' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setTimeRange('all')}
        >
          All Time
        </ButtonCustom>
      </div>
      
      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-kyuzo-gold/20">
              <th className="text-left py-3 px-2 text-kyuzo-paper/60 text-sm font-medium">Rank</th>
              <th className="text-left py-3 px-2 text-kyuzo-paper/60 text-sm font-medium">User</th>
              <th className="text-center py-3 px-2 text-kyuzo-paper/60 text-sm font-medium">XP</th>
              <th className="text-center py-3 px-2 text-kyuzo-paper/60 text-sm font-medium">Quizzes</th>
              <th className="text-center py-3 px-2 text-kyuzo-paper/60 text-sm font-medium">Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user) => (
              <tr key={user.id} className="border-b border-kyuzo-gold/10 hover:bg-kyuzo-red/5">
                <td className="py-3 px-2 w-14">
                  <div className="flex items-center gap-1">
                    {user.rank <= 3 ? (
                      <Trophy size={16} className={user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-400' : 'text-amber-600'} />
                    ) : (
                      <span className="text-kyuzo-paper/60">{user.rank}</span>
                    )}
                    
                    {user.change && (
                      <span className={`text-xs ${user.change === 'up' ? 'text-green-400' : user.change === 'down' ? 'text-red-400' : 'text-kyuzo-paper/40'}`}>
                        {user.change === 'up' && '▲'}
                        {user.change === 'down' && '▼'}
                        {user.change === 'same' && '–'}
                        {user.changeAmount && user.changeAmount}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-kyuzo-paper font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center font-medium text-kyuzo-gold">{user.xp.toLocaleString()}</td>
                <td className="py-3 px-2 text-center text-kyuzo-paper/80">{user.quizCount}</td>
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <CalendarDays size={14} className="text-kyuzo-gold" />
                    <span className="text-kyuzo-paper/80">{user.streak}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Your Rank */}
      <div className="mt-6 p-4 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-kyuzo-paper/60">Your Rank: <span className="text-kyuzo-gold font-medium">#{yourRank.rank}</span></span>
            <span className="text-kyuzo-paper/60">|</span>
            <span className="text-kyuzo-paper/60">XP: <span className="text-kyuzo-gold font-medium">{yourRank.xp.toLocaleString()}</span></span>
            <span className="text-kyuzo-paper/60">|</span>
            <span className="text-kyuzo-paper/60">Streak: <span className="text-kyuzo-gold font-medium">{yourRank.streak} days</span></span>
          </div>
          <div>
            <ButtonCustom variant="outline" size="sm">View Stats</ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
