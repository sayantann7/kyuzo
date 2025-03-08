
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';
import { Link } from 'react-router-dom';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-kyuzo-black opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-asanoha-pattern bg-repeat opacity-5 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col items-center lg:items-start">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-block px-3 py-1 mb-6 border border-kyuzo-gold/20 rounded-full bg-kyuzo-red/10 backdrop-blur-sm">
              <span className="text-kyuzo-gold text-sm font-medium">
                The Path to Mastery
              </span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-calligraphy mb-6 opacity-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: 0 }}
            >
              <span className="block text-kyuzo-paper">Master Your Knowledge</span>
              <span className="block text-kyuzo-gold mt-2">Challenge Your Mind</span>
            </h1>
            
            <p className="text-kyuzo-paper/90 text-lg mb-8 max-w-xl">
              Create personalized quizzes, connect with friends, and climb the ranks. 
              Kyuzo's intelligent platform adapts to your learning style for continuous improvement.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/dashboard">
                <ButtonCustom 
                  variant="default" 
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Get Started
                </ButtonCustom>
              </Link>
              <Link to="/dashboard">
                <ButtonCustom variant="outline">Explore Quizzes</ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
