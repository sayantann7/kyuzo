import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Minus, Save, Trash2, X, PlusCircle, Info } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';
import Navbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';

interface QuestionType {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string | null;
  explanation: string;
}

const CreateQuizManual = () => {
  const navigate = useNavigate();
  
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizCategory, setQuizCategory] = useState('');
  const [quizDifficulty, setQuizDifficulty] = useState('intermediate');
  const [quizDuration, setQuizDuration] = useState(15);
  const [quizTags, setQuizTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  const [questions, setQuestions] = useState<QuestionType[]>([
    {
      id: crypto.randomUUID(),
      question: '',
      options: [
        { id: crypto.randomUUID(), text: '' },
        { id: crypto.randomUUID(), text: '' },
        { id: crypto.randomUUID(), text: '' },
        { id: crypto.randomUUID(), text: '' }
      ],
      correctOptionId: null,
      explanation: ''
    }
  ]);
  
  const handleQuestionChange = (id: string, value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, question: value } : q
    ));
  };
  
  const handleOptionChange = (questionId: string, optionId: string, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: q.options.map(o => 
              o.id === optionId ? { ...o, text: value } : o
            ) 
          } 
        : q
    ));
  };
  
  const handleCorrectOptionChange = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, correctOptionId: optionId } : q
    ));
  };
  
  const handleExplanationChange = (id: string, value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, explanation: value } : q
    ));
  };
  
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: crypto.randomUUID(),
        question: '',
        options: [
          { id: crypto.randomUUID(), text: '' },
          { id: crypto.randomUUID(), text: '' },
          { id: crypto.randomUUID(), text: '' },
          { id: crypto.randomUUID(), text: '' }
        ],
        correctOptionId: null,
        explanation: ''
      }
    ]);
  };
  
  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: [...q.options, { id: crypto.randomUUID(), text: '' }]
          } 
        : q
    ));
  };
  
  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: q.options.filter(o => o.id !== optionId),
            correctOptionId: q.correctOptionId === optionId ? null : q.correctOptionId
          } 
        : q
    ));
  };
  
  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    } else {
      alert("You need at least one question in your quiz.");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!quizTitle.trim()) {
      alert("Please provide a title for your quiz.");
      return;
    }
    
    const invalidQuestions = questions.filter(q => 
      !q.question.trim() || 
      !q.correctOptionId ||
      q.options.some(o => !o.text.trim())
    );
    
    if (invalidQuestions.length > 0) {
      alert("Please complete all questions, options, and select correct answers.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/createQuiz/${localStorage.getItem('userId')}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // Assuming you use JWT for authentication
        },
        body: JSON.stringify({
          title: quizTitle,
          description: quizDescription,
          category: quizCategory,
          difficulty: quizDifficulty,
          duration: quizDuration,
          tags: quizTags.split(',').map(tag => tag.trim()),
          isPublic,
          questions
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert("An error occurred while creating your quiz");
        return;
      }

      alert("Your quiz has been created successfully.");
      navigate("/dashboard");
    } catch (error) {
      alert("An error occurred while creating your quiz");
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 bg-kyuzo-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-kyuzo-gold font-calligraphy">Create New Quiz</h1>
            <ButtonCustom 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              icon={<X size={18} />}
            >
              Cancel
            </ButtonCustom>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Quiz Details */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-medium text-kyuzo-paper mb-4">Quiz Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="quizTitle" className="block text-sm font-medium text-kyuzo-paper/80 mb-1">
                    Title *
                  </label>
                  <input 
                    id="quizTitle"
                    type="text" 
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title" 
                    className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="quizDescription" className="block text-sm font-medium text-kyuzo-paper/80 mb-1">
                    Description
                  </label>
                  <textarea 
                    id="quizDescription"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Enter quiz description" 
                    className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quizCategory" className="block text-sm font-medium text-kyuzo-paper/80 mb-1">
                      Category
                    </label>
                    <input 
                      id="quizCategory"
                      type="text" 
                      value={quizCategory}
                      onChange={(e) => setQuizCategory(e.target.value)}
                      placeholder="e.g. History, Science" 
                      className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="quizDifficulty" className="block text-sm font-medium text-kyuzo-paper/80 mb-1">
                      Difficulty
                    </label>
                    <select 
                      id="quizDifficulty"
                      value={quizDifficulty}
                      onChange={(e) => setQuizDifficulty(e.target.value)}
                      className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quizDuration" className="block text-sm font-medium text-kyuzo-paper/80 mb-1">
                      Duration (minutes)
                    </label>
                    <input 
                      id="quizDuration"
                      type="number" 
                      min="1"
                      max="60"
                      value={quizDuration}
                      onChange={(e) => setQuizDuration(parseInt(e.target.value))}
                      className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="quizTags" className="block text-sm font-medium text-kyuzo-paper/80 mb-1">
                      Tags (comma separated)
                    </label>
                    <input 
                      id="quizTags"
                      type="text" 
                      value={quizTags}
                      onChange={(e) => setQuizTags(e.target.value)}
                      placeholder="e.g. japan, history, edo" 
                      className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input 
                    id="isPublic"
                    type="checkbox" 
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="h-4 w-4 text-kyuzo-gold bg-kyuzo-black/50 border-kyuzo-gold/20 rounded focus:ring-kyuzo-gold/30"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-kyuzo-paper/80">
                    Make quiz public (visible to all users)
                  </label>
                </div>
              </div>
            </div>
            
            {/* Questions Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-kyuzo-paper">Questions</h2>
                <ButtonCustom 
                  type="button"
                  variant="outline" 
                  onClick={addQuestion}
                  icon={<Plus size={16} />}
                  size="sm"
                >
                  Add Question
                </ButtonCustom>
              </div>
              
              {questions.map((question, qIndex) => (
                <div key={question.id} className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-kyuzo-gold">Question {qIndex + 1}</h3>
                    <ButtonCustom 
                      type="button"
                      variant="ghost" 
                      onClick={() => removeQuestion(question.id)}
                      icon={<Trash2 size={16} />}
                      size="sm"
                    >
                      Remove
                    </ButtonCustom>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`question-${question.id}`} className="block text-sm font-medium text-kyuzo-paper/80 mb-1">
                        Question text *
                      </label>
                      <textarea 
                        id={`question-${question.id}`}
                        value={question.question}
                        onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                        placeholder="Enter question" 
                        className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                        required
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-kyuzo-paper/80">
                          Options *
                        </label>
                        <ButtonCustom 
                          type="button"
                          variant="ghost" 
                          onClick={() => addOption(question.id)}
                          icon={<PlusCircle size={14} />}
                          size="sm"
                        >
                          Add Option
                        </ButtonCustom>
                      </div>
                      
                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => (
                          <div key={option.id} className="flex items-center gap-2">
                            <input 
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctOptionId === option.id}
                              onChange={() => handleCorrectOptionChange(question.id, option.id)}
                              className="h-4 w-4 text-kyuzo-gold bg-kyuzo-black/50 border-kyuzo-gold/20 focus:ring-kyuzo-gold/30"
                            />
                            <input 
                              type="text"
                              value={option.text}
                              onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                              placeholder={`Option ${oIndex + 1}`}
                              className="flex-1 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                              required
                            />
                            {question.options.length > 2 && (
                              <button 
                                type="button"
                                onClick={() => removeOption(question.id, option.id)}
                                className="text-kyuzo-paper/60 hover:text-kyuzo-red"
                              >
                                <Minus size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-kyuzo-paper/60 mt-1 flex items-center gap-1">
                        <Info size={12} />
                        Select the radio button next to the correct answer
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor={`explanation-${question.id}`} className="block text-sm font-medium text-kyuzo-paper/80 mb-1">
                        Explanation (shown after answer)
                      </label>
                      <textarea 
                        id={`explanation-${question.id}`}
                        value={question.explanation}
                        onChange={(e) => handleExplanationChange(question.id, e.target.value)}
                        placeholder="Explain why the answer is correct" 
                        className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
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
              >
                Save Quiz
              </ButtonCustom>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateQuizManual;