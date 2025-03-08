
import React, { useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Trophy, 
  Brain, 
  Rocket
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  const featureRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (featureRef.current) {
            featureRef.current.style.opacity = '1';
            featureRef.current.style.transform = 'translateY(0)';
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    if (featureRef.current) {
      observer.observe(featureRef.current);
    }
    
    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={featureRef}
      className="glass-card p-6 transition-all duration-700 ease-in-out"
      style={{ 
        opacity: 0, 
        transform: 'translateY(20px)',
        transitionDelay: delay 
      }}
    >
      <div className="bg-kyuzo-red/20 p-3 rounded-lg inline-block mb-4">
        <div className="text-kyuzo-gold">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-kyuzo-gold">
        {title}
      </h3>
      <p className="text-kyuzo-paper/80">
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.style.opacity = '1';
          }
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
  
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "AI-Powered Quizzes",
      description: "Generate personalized quizzes on any topic with just a few clicks. Our AI creates engaging questions tailored to your level.",
      delay: "100ms"
    },
    {
      icon: <Users size={24} />,
      title: "Social Learning",
      description: "Connect with friends, share your progress, and challenge each other to create a supportive, competitive learning environment.",
      delay: "200ms"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Performance Tracking",
      description: "Monitor your progress over time with detailed analytics, identifying strengths and areas for improvement.",
      delay: "300ms"
    },
    {
      icon: <Trophy size={24} />,
      title: "Leaderboards",
      description: "Climb the ranks and compare your performance with friends and the global community through our dynamic leaderboard system.",
      delay: "100ms"
    },
    {
      icon: <Brain size={24} />,
      title: "Contextual Learning",
      description: "Create new quizzes based on your past performance, ensuring each new challenge builds on your existing knowledge.",
      delay: "200ms"
    },
    {
      icon: <Rocket size={24} />,
      title: "Achievement System",
      description: "Earn badges and rewards as you progress, maintaining motivation and celebrating your learning milestones.",
      delay: "300ms"
    }
  ];
  
  return (
    <section className="py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-seigaiha-pattern bg-repeat opacity-5 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 border border-kyuzo-gold/20 rounded-full bg-kyuzo-red/10">
            <span className="text-kyuzo-gold text-sm font-medium">Core Features</span>
          </div>
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-6 font-calligraphy transition-opacity duration-700 ease-in-out"
            style={{ opacity: 0 }}
          >
            <span className="text-kyuzo-paper">Forge Your Path to</span>{" "}
            <span className="text-kyuzo-gold">Knowledge Mastery</span>
          </h2>
          <p className="text-kyuzo-paper/80 max-w-2xl mx-auto">
            Kyuzo combines cutting-edge AI technology with social motivation to create a learning experience 
            that adapts to your needs and keeps you engaged.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
