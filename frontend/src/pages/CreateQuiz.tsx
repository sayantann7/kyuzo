
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, BookOpen, Save } from 'lucide-react';
import Navbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';
import ButtonCustom from '../components/ui/button-custom';
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | 'master'>('intermediate');
  const [tags, setTags] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: '1',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now().toString(),
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    if (questions.length === 1) {
      toast({
        title: "Cannot remove question",
        description: "You need at least one question in your quiz",
        variant: "destructive"
      });
      return;
    }
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, question: value } : q))
    );
  };

  const handleOptionChange = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          const updatedOptions = [...q.options];
          updatedOptions[optionIndex] = value;
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    );
  };

  const handleCorrectAnswerChange = (questionId: string, optionIndex: number) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return { ...q, correctAnswer: optionIndex };
        }
        return q;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your quiz",
        variant: "destructive"
      });
      return;
    }
    
    // Validate all questions have content
    for (const question of questions) {
      if (!question.question.trim()) {
        toast({
          title: "Incomplete question",
          description: "Please fill in all question fields",
          variant: "destructive"
        });
        return;
      }
      
      // Check that all options have content
      if (question.options.some(option => !option.trim())) {
        toast({
          title: "Incomplete options",
          description: "Please fill in all answer options",
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsLoading(true);
    
    // Mock quiz creation for frontend only - in real implementation this would connect to Supabase
    setTimeout(() => {
      toast({
        title: "Quiz created successfully",
        description: `Your quiz "${title}" has been created!`,
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 bg-kyuzo-black">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kyuzo-paper mb-2">
              Create New Quiz
            </h1>
            <p className="text-kyuzo-paper/70">
              Design your custom quiz by adding questions and answers
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="glass-card p-6 mb-8">
              <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy mb-4">Quiz Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-kyuzo-paper mb-1">
                    Quiz Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="E.g., Japanese History Quiz"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-kyuzo-paper mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Brief description of your quiz"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30 resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-kyuzo-paper mb-1">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="master">Master</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-kyuzo-paper mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      id="tags"
                      type="text"
                      placeholder="E.g., history, japan, culture"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy">Questions</h2>
                <ButtonCustom 
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Plus size={16} />}
                  onClick={handleAddQuestion}
                >
                  Add Question
                </ButtonCustom>
              </div>
              
              <div className="space-y-8">
                {questions.map((question, qIndex) => (
                  <div key={question.id} className="p-4 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-kyuzo-paper">
                        Question {qIndex + 1}
                      </h3>
                      <ButtonCustom
                        type="button"
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        Remove
                      </ButtonCustom>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Question text"
                          value={question.question}
                          onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                          className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-kyuzo-paper">Answer Options</h4>
                        
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center gap-3">
                            <input
                              type="radio"
                              id={`q${question.id}_option${oIndex}`}
                              name={`correctAnswer_${question.id}`}
                              checked={question.correctAnswer === oIndex}
                              onChange={() => handleCorrectAnswerChange(question.id, oIndex)}
                              className="h-4 w-4 text-kyuzo-gold focus:ring-kyuzo-gold/30"
                            />
                            <input
                              type="text"
                              placeholder={`Option ${oIndex + 1}`}
                              value={option}
                              onChange={(e) => handleOptionChange(question.id, oIndex, e.target.value)}
                              className="flex-1 px-4 py-2 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                            />
                          </div>
                        ))}
                        <p className="text-xs text-kyuzo-paper/60 mt-1">
                          * Select the radio button next to the correct answer
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <ButtonCustom
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </ButtonCustom>
              <ButtonCustom
                type="submit"
                variant="default"
                icon={<Save size={18} />}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Create Quiz"}
              </ButtonCustom>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateQuiz;
