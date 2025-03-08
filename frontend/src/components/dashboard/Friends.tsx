
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
  const [searchQuery, setSearchQuery] = React.useState('');
  const [friends, setFriends] = React.useState([])
  React.useEffect(() => {
      const fetchFriendsData = async () => {
        try {
          const userId = localStorage.getItem('userId');
          const [friendsResponse, requestsResponse, suggestionsResponse] = await Promise.all([
            fetch(`http://localhost:3000/getFriends/${userId}`),
            fetch(`http://localhost:3000/getFriendRequests/${userId}`),
            fetch(`http://localhost:3000/getFriendSuggestions/${userId}`)
          ]);
  
          const friendsData = await friendsResponse.json();
  
          setFriends(friendsData);
        } catch (error) {
          console.error("Error fetching friends data:", error);
        }
      };
  
      fetchFriendsData();
    }, []);
  
    const filteredFriends = friends.filter(friend => 
      friend.fullname && friend.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
        {filteredFriends.map((friend) => (
          <div key={friend.id} className="flex items-start gap-4 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5 hover:bg-kyuzo-red/10 transition-colors">
            <div className="relative">
              <img 
                src="/avatar.jpg" 
                alt={friend.fullname} 
                className="w-10 h-10 rounded-full"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-kyuzo-paper">{friend.fullname}</p>
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
