
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import { ArrowRight, BookOpen, Users, Trophy } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample stats for demonstration
  const stats = [
    { label: 'Active Learners', value: '10,000+' },
    { label: 'Quizzes Created', value: '50,000+' },
    { label: 'Questions Answered', value: '1M+' },
    { label: 'Daily Active Users', value: '2,500+' }
  ];
  
  const testimonials = [
    {
      id: 1,
      content: "Kyuzo has transformed how I study. The personalized quizzes and social features keep me motivated every day.",
      author: "Alex Chen",
      role: "Computer Science Student"
    },
    {
      id: 2,
      content: "I love how Kyuzo adapts to my learning style. The contextual quiz generation is incredibly helpful for reinforcing concepts.",
      author: "Mei Tanaka",
      role: "Medical Student"
    },
    {
      id: 3,
      content: "The friendly competition with classmates on Kyuzo has made studying fun again. I've improved my grades significantly!",
      author: "James Wilson",
      role: "History Major"
    }
  ];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <Features />
        
        {/* Stats Section */}
        <section className="py-20 px-6 md:px-12 relative overflow-hidden bg-kyuzo-red/10">
          <div className="absolute inset-0 bg-asanoha-pattern bg-repeat opacity-5 z-0"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6">
                  <p className="text-3xl md:text-4xl font-bold text-kyuzo-gold mb-2">{stat.value}</p>
                  <p className="text-sm text-kyuzo-paper/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-20 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 border border-kyuzo-gold/20 rounded-full bg-kyuzo-red/10">
                <span className="text-kyuzo-gold text-sm font-medium">How It Works</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-calligraphy">
                <span className="text-kyuzo-paper">Simple Steps to</span>{" "}
                <span className="text-kyuzo-gold">Knowledge Mastery</span>
              </h2>
              <p className="text-kyuzo-paper/80 max-w-2xl mx-auto">
                Kyuzo makes learning efficient and engaging with just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="glass-card p-6 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 h-12 w-12 rounded-full bg-kyuzo-red flex items-center justify-center">
                  <span className="text-xl font-bold text-kyuzo-paper">1</span>
                </div>
                <div className="mt-8 mb-4">
                  <BookOpen size={48} className="mx-auto text-kyuzo-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-kyuzo-gold">Create Your Quiz</h3>
                <p className="text-kyuzo-paper/80">
                  Enter a topic, select your difficulty level, and specify the number of questions. Our AI generates personalized quizzes instantly.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 h-12 w-12 rounded-full bg-kyuzo-red flex items-center justify-center">
                  <span className="text-xl font-bold text-kyuzo-paper">2</span>
                </div>
                <div className="mt-8 mb-4">
                  <Users size={48} className="mx-auto text-kyuzo-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-kyuzo-gold">Connect with Friends</h3>
                <p className="text-kyuzo-paper/80">
                  Add friends, share your progress, and challenge each other to create a supportive, competitive learning environment.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 h-12 w-12 rounded-full bg-kyuzo-red flex items-center justify-center">
                  <span className="text-xl font-bold text-kyuzo-paper">3</span>
                </div>
                <div className="mt-8 mb-4">
                  <Trophy size={48} className="mx-auto text-kyuzo-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-kyuzo-gold">Track Your Progress</h3>
                <p className="text-kyuzo-paper/80">
                  Monitor your performance, earn XP, unlock achievements, and climb the leaderboards as you continue to learn and improve.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/dashboard">
                <ButtonCustom 
                  variant="default" 
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Get Started Now
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 px-6 md:px-12 relative overflow-hidden bg-kyuzo-black">
          <div className="absolute inset-0 bg-seigaiha-pattern bg-repeat opacity-5 z-0"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 border border-kyuzo-gold/20 rounded-full bg-kyuzo-red/10">
                <span className="text-kyuzo-gold text-sm font-medium">Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-calligraphy">
                <span className="text-kyuzo-paper">What Our</span>{" "}
                <span className="text-kyuzo-gold">Users Say</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="glass-card p-6">
                  <svg width="30" height="24" className="mb-4 text-kyuzo-gold" viewBox="0 0 30 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9648 9.1371V15.749C13.9648 18.8016 12.2554 21.3125 8.83662 22.3613L7.02808 20.3125C8.6396 19.6855 9.58486 18.5762 9.86521 17.041H6.72925C4.49315 17.041 3.375 15.9023 3.375 13.6953V9.1371C3.375 6.93018 4.49315 5.79199 6.72925 5.79199H10.6105C12.8466 5.79199 13.9648 6.93018 13.9648 9.1371ZM26.625 9.1371V15.749C26.625 18.8016 24.9156 21.3125 21.4968 22.3613L19.6883 20.3125C21.2998 19.6855 22.2451 18.5762 22.5254 17.041H19.3894C17.1533 17.041 16.0352 15.9023 16.0352 13.6953V9.1371C16.0352 6.93018 17.1533 5.79199 19.3894 5.79199H23.2707C25.5068 5.79199 26.625 6.93018 26.625 9.1371Z" />
                  </svg>
                  <p className="text-kyuzo-paper/90 mb-4">{testimonial.content}</p>
                  <div>
                    <p className="font-medium text-kyuzo-gold">{testimonial.author}</p>
                    <p className="text-sm text-kyuzo-paper/60">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 relative overflow-hidden bg-kyuzo-red">
          <div className="absolute inset-0 bg-asanoha-pattern bg-repeat opacity-10 z-0"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-kyuzo-paper font-calligraphy">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-kyuzo-paper/90 max-w-2xl mx-auto mb-8">
                Join thousands of students who are already mastering new skills and knowledge with Kyuzo's innovative learning platform.
              </p>
              <Link to="/dashboard">
                <ButtonCustom 
                  variant="outline" 
                  className="border-kyuzo-paper/70 text-kyuzo-paper hover:bg-kyuzo-paper/10"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Get Started for Free
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
