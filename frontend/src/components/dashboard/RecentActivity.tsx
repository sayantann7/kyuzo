
import React from 'react';
import { BookOpen, Award, Users, TrendingUp, Clock } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'quiz_completed',
      title: 'Japanese Feudal History',
      score: 85,
      time: '2 hours ago',
      xpEarned: 120
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Quiz Master',
      description: 'Completed 10 quizzes with scores above 80%',
      time: '1 day ago',
      xpEarned: 250
    },
    {
      id: 3,
      type: 'friend_activity',
      friendName: 'Kazuo Nakamura',
      action: 'completed a quiz',
      quizTitle: 'Samurai Weapons & Armor',
      score: 92,
      time: '2 days ago'
    },
    {
      id: 4,
      type: 'streak',
      days: 7,
      time: '2 days ago',
      xpEarned: 50
    },
    {
      id: 5,
      type: 'quiz_created',
      title: 'Edo Period Art & Culture',
      questions: 12,
      time: '3 days ago',
      xpEarned: 30
    }
  ];

  // Render activity item based on type
  const renderActivity = (activity: any) => {
    switch(activity.type) {
      case 'quiz_completed':
        return (
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-kyuzo-red/10 text-kyuzo-gold">
              <BookOpen size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-kyuzo-paper font-medium">Completed a quiz</p>
                  <p className="text-sm text-kyuzo-paper/70">{activity.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-kyuzo-gold font-medium">{activity.score}%</p>
                  <p className="text-xs text-kyuzo-paper/60">+{activity.xpEarned} XP</p>
                </div>
              </div>
              <p className="text-xs text-kyuzo-paper/60 mt-1 flex items-center gap-1">
                <Clock size={12} /> {activity.time}
              </p>
            </div>
          </div>
        );
        
      case 'achievement':
        return (
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-kyuzo-red/10 text-kyuzo-gold">
              <Award size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-kyuzo-paper font-medium">Achievement Unlocked</p>
                  <p className="text-sm text-kyuzo-paper/70">{activity.title}</p>
                  <p className="text-xs text-kyuzo-paper/60">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-kyuzo-paper/60">+{activity.xpEarned} XP</p>
                </div>
              </div>
              <p className="text-xs text-kyuzo-paper/60 mt-1 flex items-center gap-1">
                <Clock size={12} /> {activity.time}
              </p>
            </div>
          </div>
        );
        
      case 'friend_activity':
        return (
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-kyuzo-red/10 text-kyuzo-gold">
              <Users size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="text-kyuzo-paper font-medium">{activity.friendName} {activity.action}</p>
                  <p className="text-sm text-kyuzo-paper/70">{activity.quizTitle}</p>
                </div>
                {activity.score && (
                  <p className="text-kyuzo-gold font-medium">{activity.score}%</p>
                )}
              </div>
              <p className="text-xs text-kyuzo-paper/60 mt-1 flex items-center gap-1">
                <Clock size={12} /> {activity.time}
              </p>
            </div>
          </div>
        );
        
      case 'streak':
        return (
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-kyuzo-red/10 text-kyuzo-gold">
              <TrendingUp size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="text-kyuzo-paper font-medium">{activity.days}-Day Streak Achieved</p>
                  <p className="text-sm text-kyuzo-paper/70">Keep up the good work!</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-kyuzo-paper/60">+{activity.xpEarned} XP</p>
                </div>
              </div>
              <p className="text-xs text-kyuzo-paper/60 mt-1 flex items-center gap-1">
                <Clock size={12} /> {activity.time}
              </p>
            </div>
          </div>
        );
        
      case 'quiz_created':
        return (
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-kyuzo-red/10 text-kyuzo-gold">
              <BookOpen size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="text-kyuzo-paper font-medium">Created a new quiz</p>
                  <p className="text-sm text-kyuzo-paper/70">{activity.title}</p>
                  <p className="text-xs text-kyuzo-paper/60">{activity.questions} questions</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-kyuzo-paper/60">+{activity.xpEarned} XP</p>
                </div>
              </div>
              <p className="text-xs text-kyuzo-paper/60 mt-1 flex items-center gap-1">
                <Clock size={12} /> {activity.time}
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy">Recent Activity</h2>
      </div>
      
      <div className="space-y-6">
        {activities.map(activity => (
          <div key={activity.id} className="border-b border-kyuzo-gold/10 pb-4 last:border-0 last:pb-0">
            {renderActivity(activity)}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <ButtonCustom variant="ghost">
          View All Activity
        </ButtonCustom>
      </div>
    </div>
  );
};

export default RecentActivity;
