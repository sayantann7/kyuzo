
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonCustom from '../ui/button-custom';
import { AlertTriangle, BookOpen, PlusCircle } from 'lucide-react';

const QuizCreator = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to quiz page or show preview would happen here
      console.log({ topic, difficulty, questionCount, timeLimit });
    }, 1500);
  };
  
  return (
    <div className="glass-card p-6 md:p-8 max-w-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-kyuzo-gold mb-2 font-calligraphy">Create New Quiz</h2>
        <p className="text-kyuzo-paper/80 text-sm">
          Specify your topic and preferences to generate a personalized quiz
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="topic" className="block text-sm font-medium text-kyuzo-paper/80">
              Topic
            </label>
            <input 
              id="topic"
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Japanese History" 
              className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="difficulty" className="block text-sm font-medium text-kyuzo-paper/80">
              Difficulty
            </label>
            <select 
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="master">Master</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="questionCount" className="block text-sm font-medium text-kyuzo-paper/80">
                Questions
              </label>
              <input 
                id="questionCount"
                type="number" 
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                min="1"
                max="50"
                className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="timeLimit" className="block text-sm font-medium text-kyuzo-paper/80">
                Time (minutes)
              </label>
              <input 
                id="timeLimit"
                type="number" 
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                min="1"
                max="60"
                className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex items-center gap-2 p-3 bg-kyuzo-red/10 border border-kyuzo-red/20 rounded-md mb-6">
            <AlertTriangle size={16} className="text-kyuzo-gold flex-shrink-0" />
            <p className="text-xs text-kyuzo-paper/80">
              Providing specific topics yields better results. For example, "Edo Period Japan" instead of just "Japan".
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ButtonCustom 
              type="submit"
              variant="default" 
              className="w-full md:w-auto"
              icon={<BookOpen size={18} />}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Quiz'}
            </ButtonCustom>
            
            <ButtonCustom 
              type="button"
              variant="outline" 
              className="w-full md:w-auto"
              icon={<PlusCircle size={18} />}
              onClick={() => navigate('/create-quiz')}
            >
              Create Manually
            </ButtonCustom>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuizCreator;
