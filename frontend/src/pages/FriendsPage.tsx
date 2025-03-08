import React, { useState, useEffect } from 'react';
import { Search, UserPlus, UserCheck, Clock, Award, BookOpen, Mail, TrendingUp } from 'lucide-react';
import Navbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';
import ButtonCustom from '../components/ui/button-custom';
import { useToast } from "@/hooks/use-toast";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('friends');
  const { toast } = useToast();

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const [friendsResponse, requestsResponse, suggestionsResponse] = await Promise.all([
          fetch(`http://localhost:3000/getFriends/${userId}`),
          fetch(`http://localhost:3000/getFriendRequests/${userId}`),
          fetch(`http://localhost:3000/getFriendSuggestions/${userId}`)
        ]);

        const friendsData = await friendsResponse.json();
        const requestsData = await requestsResponse.json();
        const suggestionsData = await suggestionsResponse.json();

        setFriends(friendsData);
        setFriendRequests(requestsData);
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error("Error fetching friends data:", error);
      }
    };

    fetchFriendsData();
  }, []);

  const filteredFriends = friends.filter(friend => 
    friend.fullname && friend.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptRequest = async (id: string) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:3000/acceptFriendRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, friendId: id }),
      });

      const data = await response.json();
      if (response.ok) {
        const acceptedRequest = friendRequests.find(request => request._id === id);
        setFriends([...friends, acceptedRequest]);
        setFriendRequests(friendRequests.filter(request => request._id !== id));

        toast({
          title: "Friend request accepted",
          description: `You are now friends with ${acceptedRequest.fullname}`,
        });
      } else {
        console.error("Error accepting friend request:", data.error);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDeclineRequest = (id: string) => {
    setFriendRequests(friendRequests.filter(request => request._id !== id));
    toast({
      title: "Friend request declined",
      description: `You declined the friend request`,
    });
  };

  const handleAddFriend = async (id: string) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:3000/sendFriendRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId: userId, receiverId: id }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuggestions(suggestions.filter(s => s._id !== id));
        toast({
          title: "Friend request sent",
          description: `Friend request sent to ${data.fullname}`,
        });
      } else {
        console.error("Error sending friend request:", data.error);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleAddFriendByUsername = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:3000/sendFriendRequestByUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId: userId, username }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Friend request sent",
          description: `Friend request sent to ${data.fullname}`,
        });
        setUsername('');
      } else {
        console.error("Error sending friend request:", data.error);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
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
            </div>
          </div>
          
          {/* Add Friend by Username */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy mb-4">Add Friend by Username</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
              />
              <ButtonCustom 
                variant="default" 
                size="sm"
                onClick={handleAddFriendByUsername}
              >
                Add Friend
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
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFriends.map(friend => (
                    <div key={friend._id} className="border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5 p-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img 
                            src="/avatar.jpg"
                            alt={friend.fullname} 
                            className="w-12 h-12 rounded-full"
                          />
                          
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-kyuzo-paper">{friend.fullname}</h3>
                            
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
                    <div key={request._id} className="flex items-center gap-4 p-4 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
                      <img 
                        src="/avatar.jpg"
                        alt={request.fullname} 
                        className="w-12 h-12 rounded-full"
                      />
                      
                      <div className="flex-1">
                        <p className="font-medium text-kyuzo-paper">{request.fullname}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <ButtonCustom 
                          variant="default" 
                          size="sm"
                          icon={<UserCheck size={16} />}
                          onClick={() => handleAcceptRequest(request._id)}
                        >
                          Accept
                        </ButtonCustom>
                        <ButtonCustom 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeclineRequest(request._id)}
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
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FriendsPage;