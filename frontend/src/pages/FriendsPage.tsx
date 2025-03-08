
import React, { useState } from 'react';
import { Search, UserPlus, UserCheck, Clock, Award, BookOpen, Mail, TrendingUp } from 'lucide-react';
import Navbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';
import ButtonCustom from '../components/ui/button-custom';
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockFriends = [
  {
    id: 1,
    name: "Kazuo Nakamura",
    avatar: "https://ui-avatars.com/api/?name=Kazuo+Nakamura&background=A63A50&color=F7F3E9",
    status: 'online',
    quizCount: 42,
    xp: 2350,
    streak: 7,
    lastActivity: 'Completed "Japanese History" quiz with 85%'
  },
  {
    id: 2,
    name: "Mei Lin",
    avatar: "https://ui-avatars.com/api/?name=Mei+Lin&background=A63A50&color=F7F3E9",
    status: 'offline',
    lastActive: '2 hours ago',
    quizCount: 36,
    xp: 1850,
    streak: 3,
    lastActivity: 'Earned "Quiz Master" achievement'
  },
  {
    id: 3,
    name: "Takashi Mori",
    avatar: "https://ui-avatars.com/api/?name=Takashi+Mori&background=A63A50&color=F7F3E9",
    status: 'online',
    quizCount: 28,
    xp: 1420,
    streak: 5,
    lastActivity: 'Created new quiz "Japanese Art History"'
  },
  {
    id: 4,
    name: "Akiko Tanaka",
    avatar: "https://ui-avatars.com/api/?name=Akiko+Tanaka&background=A63A50&color=F7F3E9",
    status: 'offline',
    lastActive: '1 day ago',
    quizCount: 15,
    xp: 980,
    streak: 0,
    lastActivity: 'Started 7-day streak'
  }
];

const mockFriendRequests = [
  {
    id: 5,
    name: "Hiroshi Sato",
    avatar: "https://ui-avatars.com/api/?name=Hiroshi+Sato&background=A63A50&color=F7F3E9",
    mutualFriends: 2
  },
  {
    id: 6,
    name: "Yuki Watanabe",
    avatar: "https://ui-avatars.com/api/?name=Yuki+Watanabe&background=A63A50&color=F7F3E9",
    mutualFriends: 1
  }
];

const mockSuggestions = [
  {
    id: 7,
    name: "Haruto Yamamoto",
    avatar: "https://ui-avatars.com/api/?name=Haruto+Yamamoto&background=A63A50&color=F7F3E9",
    mutualFriends: 3
  },
  {
    id: 8,
    name: "Sakura Ito",
    avatar: "https://ui-avatars.com/api/?name=Sakura+Ito&background=A63A50&color=F7F3E9",
    mutualFriends: 2
  },
  {
    id: 9,
    name: "Riku Kobayashi",
    avatar: "https://ui-avatars.com/api/?name=Riku+Kobayashi&background=A63A50&color=F7F3E9",
    mutualFriends: 1
  }
];

const FriendsPage = () => {
  const [friends, setFriends] = useState(mockFriends);
  const [friendRequests, setFriendRequests] = useState(mockFriendRequests);
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');
  const { toast } = useToast();
  
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAcceptRequest = (id: number) => {
    const acceptedRequest = friendRequests.find(request => request.id === id);
    if (acceptedRequest) {
      // Add to friends
      const newFriend = {
        ...acceptedRequest,
        status: 'online' as const,
        quizCount: 0,
        xp: 0,
        streak: 0,
        lastActivity: 'Joined your friends list'
      };
      
      setFriends([...friends, newFriend]);
      
      // Remove from requests
      setFriendRequests(friendRequests.filter(request => request.id !== id));
      
      toast({
        title: "Friend request accepted",
        description: `You are now friends with ${acceptedRequest.name}`,
      });
    }
  };
  
  const handleDeclineRequest = (id: number) => {
    const declinedRequest = friendRequests.find(request => request.id === id);
    setFriendRequests(friendRequests.filter(request => request.id !== id));
    
    if (declinedRequest) {
      toast({
        title: "Friend request declined",
        description: `You declined ${declinedRequest.name}'s request`,
      });
    }
  };
  
  const handleAddFriend = (id: number) => {
    const suggestion = suggestions.find(s => s.id === id);
    setSuggestions(suggestions.filter(s => s.id !== id));
    
    if (suggestion) {
      toast({
        title: "Friend request sent",
        description: `Friend request sent to ${suggestion.name}`,
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 bg-kyuzo-black">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kyuzo-paper mb-2">
              Friends & Community
            </h1>
            <p className="text-kyuzo-paper/70">
              Connect with others, track their progress, and grow together
            </p>
          </div>
          
          {/* Search and Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kyuzo-paper/60" />
            </div>
            
            <div className="flex gap-2">
              <ButtonCustom
                variant={activeTab === 'friends' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('friends')}
              >
                Friends ({friends.length})
              </ButtonCustom>
              <ButtonCustom
                variant={activeTab === 'requests' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('requests')}
              >
                Requests ({friendRequests.length})
              </ButtonCustom>
              <ButtonCustom
                variant={activeTab === 'suggestions' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('suggestions')}
              >
                Suggestions
              </ButtonCustom>
            </div>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'friends' && (
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy mb-6">Your Friends</h2>
              
              {filteredFriends.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-kyuzo-paper/70">
                    {searchQuery ? "No friends match your search" : "You don't have any friends yet"}
                  </p>
                  <ButtonCustom 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab('suggestions')}
                  >
                    Find Friends
                  </ButtonCustom>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFriends.map(friend => (
                    <div key={friend.id} className="border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5 p-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img 
                            src={friend.avatar} 
                            alt={friend.name} 
                            className="w-12 h-12 rounded-full"
                          />
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-kyuzo-paper">{friend.name}</h3>
                            
                            <ButtonCustom variant="ghost" size="sm" icon={<Mail size={16} />}>
                              {/* Adding empty children to fix the error */}
                              <span className="sr-only">Message</span>
                            </ButtonCustom>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 text-xs text-kyuzo-paper/60 mt-1">
                            <span className="flex items-center gap-1">
                              <BookOpen size={12} /> {friend.quizCount} quizzes
                            </span>
                            <span className="flex items-center gap-1">
                              <Award size={12} className="text-kyuzo-gold" /> {friend.xp} XP
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp size={12} /> {friend.streak} day streak
                            </span>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-kyuzo-gold/10">
                            <div className="flex items-center gap-1 text-xs text-kyuzo-paper/80">
                              <Clock size={12} className="text-kyuzo-gold" /> 
                              <span>Recent Activity: {friend.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'requests' && (
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy mb-6">Friend Requests</h2>
              
              {friendRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-kyuzo-paper/70">You don't have any pending friend requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {friendRequests.map(request => (
                    <div key={request.id} className="flex items-center gap-4 p-4 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
                      <img 
                        src={request.avatar} 
                        alt={request.name} 
                        className="w-12 h-12 rounded-full"
                      />
                      
                      <div className="flex-1">
                        <p className="font-medium text-kyuzo-paper">{request.name}</p>
                        <p className="text-xs text-kyuzo-paper/60">{request.mutualFriends} mutual friends</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <ButtonCustom 
                          variant="default" 
                          size="sm"
                          icon={<UserCheck size={16} />}
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          Accept
                        </ButtonCustom>
                        <ButtonCustom 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          Decline
                        </ButtonCustom>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'suggestions' && (
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy mb-6">Suggested Friends</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {suggestions.map(suggestion => (
                  <div key={suggestion.id} className="border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5 p-4">
                    <div className="flex flex-col items-center text-center">
                      <img 
                        src={suggestion.avatar} 
                        alt={suggestion.name} 
                        className="w-16 h-16 rounded-full mb-3"
                      />
                      
                      <h3 className="font-medium text-kyuzo-paper">{suggestion.name}</h3>
                      <p className="text-xs text-kyuzo-paper/60 mb-4">
                        {suggestion.mutualFriends} mutual friend{suggestion.mutualFriends !== 1 ? 's' : ''}
                      </p>
                      
                      <ButtonCustom 
                        variant="outline" 
                        size="sm"
                        icon={<UserPlus size={16} />}
                        onClick={() => handleAddFriend(suggestion.id)}
                      >
                        Add Friend
                      </ButtonCustom>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FriendsPage;
