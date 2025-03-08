
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Clock } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';

interface FriendProps {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastActive?: string;
  lastActivity: string;
}

const Friends = () => {
  // Mock data for friends
  const friends: FriendProps[] = [
    {
      id: 1,
      name: "Kazuo Nakamura",
      avatar: "https://ui-avatars.com/api/?name=Kazuo+Nakamura&background=A63A50&color=F7F3E9",
      status: 'online',
      lastActivity: 'Completed "Japanese History" quiz with 85%'
    },
    {
      id: 2,
      name: "Mei Lin",
      avatar: "https://ui-avatars.com/api/?name=Mei+Lin&background=A63A50&color=F7F3E9",
      status: 'offline',
      lastActive: '2 hours ago',
      lastActivity: 'Earned "Quiz Master" achievement'
    },
    {
      id: 3,
      name: "Takashi Mori",
      avatar: "https://ui-avatars.com/api/?name=Takashi+Mori&background=A63A50&color=F7F3E9",
      status: 'online',
      lastActivity: 'Created new quiz "Japanese Art History"'
    }
  ];
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy">Friend Activity</h2>
        <Link to="/friends">
          <ButtonCustom 
            variant="outline" 
            size="sm"
            icon={<UserPlus size={16} />}
          >
            View All
          </ButtonCustom>
        </Link>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kyuzo-paper/60" />
      </div>
      
      {/* Friend Activity List */}
      <div className="space-y-5">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-start gap-4 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5 hover:bg-kyuzo-red/10 transition-colors">
            <div className="relative">
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className="w-10 h-10 rounded-full"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-kyuzo-paper">{friend.name}</p>
                {friend.status === 'offline' && friend.lastActive && (
                  <p className="text-xs text-kyuzo-paper/60 flex items-center gap-1">
                    <Clock size={12} /> {friend.lastActive}
                  </p>
                )}
              </div>
              <p className="text-sm text-kyuzo-paper/70 mt-1">
                {friend.lastActivity}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Link to Friends Page */}
      <div className="mt-6 text-center">
        <Link to="/friends">
          <ButtonCustom variant="ghost">
            See All Friends
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default Friends;
