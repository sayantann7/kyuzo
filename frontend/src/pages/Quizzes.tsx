import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Plus, BarChart4 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ButtonCustom from '@/components/ui/button-custom';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/DashboardNavbar';
import { useTheme } from '../components/theme/theme-provider';

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [quizzes, setQuizzes] = useState([]);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:3000/getQuizzes/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'completed') return matchesSearch && quiz.completed;
    if (activeTab === 'incomplete') return matchesSearch && !quiz.completed;
    
    return matchesSearch;
  });

  const handleStartQuiz = (quizId) => {
    navigate(`/attempt-quiz/${quizId}`);
  };

  return (
    <div className="container my-14 px-4 py-8 max-w-7xl">
      <Navbar />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 font-calligraphy">
          <span className="text-kyuzo-gold">My</span>{" "}
          <span className="text-kyuzo-paper dark:text-kyuzo-paper light:text-kyuzo-black">Quizzes</span>
        </h1>
        <p className="text-kyuzo-paper/70 dark:text-kyuzo-paper/70 light:text-kyuzo-black/70">
          Manage and track all your created and completed quizzes
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kyuzo-paper/50" size={18} />
          <Input
            placeholder="Search quizzes..."
            className="pl-10 bg-kyuzo-black/20 border-kyuzo-gold/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="border-kyuzo-gold/30 text-kyuzo-gold">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
          
          <Link to="/create-quiz">
            <ButtonCustom 
              variant="default" 
              icon={<Plus size={16} />}
              iconPosition="left"
            >
              Create New Quiz
            </ButtonCustom>
          </Link>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="bg-kyuzo-black/30 border border-kyuzo-gold/20">
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="incomplete">Not Attempted</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4 flex justify-center">
                <BarChart4 size={48} className="text-kyuzo-paper/30" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No quizzes found</h3>
              <p className="text-kyuzo-paper/60">
                {searchTerm ? "Try adjusting your search term" : "Start by creating your first quiz"}
              </p>
              {!searchTerm && (
                <div className="mt-4">
                  <Link to="/create-quiz">
                    <ButtonCustom 
                      variant="default" 
                      size="sm"
                      icon={<Plus size={16} />}
                    >
                      Create New Quiz
                    </ButtonCustom>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map(quiz => (
                <QuizCard
                  key={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  category={quiz.category}
                  difficulty={quiz.difficulty}
                  questionCount={quiz.questionCount}
                  completedCount={quiz.completedCount}
                  imageUrl={quiz.coverImage}
                  completed={quiz.completed}
                  score={quiz.score}
                  onStartQuiz={() => handleStartQuiz(quiz.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          {/* Similar content for completed quizzes tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                description={quiz.description}
                category={quiz.category}
                difficulty={quiz.difficulty}
                questionCount={quiz.questionCount}
                completedCount={quiz.completedCount}
                imageUrl={quiz.coverImage}
                completed={quiz.completed}
                score={quiz.score}
                onStartQuiz={() => handleStartQuiz(quiz.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="incomplete" className="mt-6">
          {/* Similar content for incomplete quizzes tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                description={quiz.description}
                category={quiz.category}
                difficulty={quiz.difficulty}
                questionCount={quiz.questionCount}
                completedCount={quiz.completedCount}
                imageUrl={quiz.coverImage}
                completed={quiz.completed}
                score={quiz.score}
                onStartQuiz={() => handleStartQuiz(quiz.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quizzes;