
import React from 'react';
import { BookOpen, Award, Clock } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';

interface FriendActivityProps {
  activities: {
    id: number;
    friendName: string;
    avatar: string;
    action: string;
    quizTitle?: string;
    score?: number;
    xpEarned?: number;
    achievement?: string;
    time: string;
  }[];
}

const FriendActivity = ({ activities }: FriendActivityProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy">Friend Activity</h2>
        <ButtonCustom variant="ghost" size="sm">
          View All
        </ButtonCustom>
      </div>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-kyuzo-paper/70">No recent activity from your friends</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 border border-kyuzo-gold/10 rounded-md bg-kyuzo-red/5">
              <img 
                src={activity.avatar} 
                alt={activity.friendName} 
                className="w-10 h-10 rounded-full"
              />
              
              <div className="flex-1">
                <p className="text-kyuzo-paper font-medium">
                  {activity.friendName} {activity.action}
                </p>
                
                {activity.quizTitle && (
                  <p className="text-sm text-kyuzo-paper/70">
                    {activity.quizTitle}
                    {activity.score !== undefined && <span className="text-kyuzo-gold ml-1">({activity.score}%)</span>}
                  </p>
                )}
                
                {activity.achievement && (
                  <p className="text-sm flex items-center gap-1 text-kyuzo-gold">
                    <Award size={14} /> {activity.achievement}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-kyuzo-paper/60 flex items-center gap-1">
                    <Clock size={12} /> {activity.time}
                  </p>
                  
                  {activity.xpEarned && (
                    <p className="text-xs text-kyuzo-gold">+{activity.xpEarned} XP</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendActivity;
