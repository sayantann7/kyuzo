
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { BookOpen, Users, Trophy, Brain, Rocket, Shield } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "AI-Powered Quizzes",
      description: "Our intelligent system creates personalized quizzes tailored to your knowledge level and learning goals."
    },
    {
      icon: <Users size={24} />,
      title: "Social Learning",
      description: "Connect with friends, share progress, and challenge each other to foster friendly competition."
    },
    {
      icon: <Trophy size={24} />,
      title: "Achievement System",
      description: "Earn badges, climb leaderboards, and track your progress with detailed analytics."
    },
    {
      icon: <Brain size={24} />,
      title: "Adaptive Learning",
      description: "Our platform adapts to your performance, focusing on areas that need improvement."
    },
    {
      icon: <Rocket size={24} />,
      title: "Contextual Quiz Creation",
      description: "Generate new quizzes based on your past performance for continuous growth."
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy First",
      description: "Your data remains secure and private, with transparent controls over what you share."
    }
  ];
  
  const team = [
    {
      name: "Hiro Nakamura",
      role: "Founder & CEO",
      bio: "Former education technology researcher with a passion for modernizing learning methodologies.",
      avatar: "https://ui-avatars.com/api/?name=Hiro+Nakamura&background=A63A50&color=F7F3E9"
    },
    {
      name: "Mei Zhang",
      role: "Chief Technology Officer",
      bio: "AI specialist focused on creating adaptive learning algorithms that evolve with each user.",
      avatar: "https://ui-avatars.com/api/?name=Mei+Zhang&background=A63A50&color=F7F3E9"
    },
    {
      name: "Takeshi Yamamoto",
      role: "Lead Designer",
      bio: "UX/UI expert dedicated to creating intuitive, beautiful interfaces that enhance learning.",
      avatar: "https://ui-avatars.com/api/?name=Takeshi+Yamamoto&background=A63A50&color=F7F3E9"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-asanoha-pattern bg-repeat opacity-5 z-0"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-block px-3 py-1 mb-6 border border-kyuzo-gold/20 rounded-full bg-kyuzo-red/10">
              <span className="text-kyuzo-gold text-sm font-medium">About Kyuzo</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-calligraphy">
              <span className="text-kyuzo-paper">Revolutionizing</span>{" "}
              <span className="text-kyuzo-gold">Learning</span>
            </h1>
            
            <p className="text-kyuzo-paper/90 text-lg mb-8 max-w-3xl mx-auto">
              Kyuzo is inspired by the stoic, masterful swordsman from Seven Samurai—renowned for his precision, 
              unwavering discipline, and relentless pursuit of excellence. Our platform embodies these values, 
              helping users hone their skills through focused practice and consistent improvement.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 px-6 md:px-12 bg-kyuzo-red/5">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 font-calligraphy">
                    <span className="text-kyuzo-paper">Our</span>{" "}
                    <span className="text-kyuzo-gold">Mission</span>
                  </h2>
                  
                  <p className="text-kyuzo-paper/90 mb-6">
                    At Kyuzo, we believe learning should be engaging, personalized, and social. 
                    Traditional education often falls short in keeping students motivated and adapting 
                    to individual learning styles.
                  </p>
                  
                  <p className="text-kyuzo-paper/90 mb-6">
                    We're building an ecosystem where AI-powered quizzes adapt to your knowledge level, 
                    social features keep you motivated, and detailed analytics help you track your progress.
                  </p>
                  
                  <p className="text-kyuzo-paper/90">
                    Our goal is to transform learning from a solitary, often tedious task into an 
                    engaging, social experience that keeps you coming back for more.
                  </p>
                </div>
                
                <div className="glass-card p-6 bg-kyuzo-red/10 border border-kyuzo-gold/20">
                  <h3 className="text-xl font-bold mb-4 text-kyuzo-gold font-calligraphy">The Kyuzo Principles</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-kyuzo-red/20 rounded-full mt-0.5">
                        <span className="text-kyuzo-gold">•</span>
                      </div>
                      <div>
                        <p className="font-medium text-kyuzo-paper">Precision</p>
                        <p className="text-sm text-kyuzo-paper/70">Targeted learning that focuses on what you need most</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-kyuzo-red/20 rounded-full mt-0.5">
                        <span className="text-kyuzo-gold">•</span>
                      </div>
                      <div>
                        <p className="font-medium text-kyuzo-paper">Discipline</p>
                        <p className="text-sm text-kyuzo-paper/70">Features that encourage consistent practice and habit-building</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-kyuzo-red/20 rounded-full mt-0.5">
                        <span className="text-kyuzo-gold">•</span>
                      </div>
                      <div>
                        <p className="font-medium text-kyuzo-paper">Excellence</p>
                        <p className="text-sm text-kyuzo-paper/70">Continuous improvement through adaptive challenges</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-kyuzo-red/20 rounded-full mt-0.5">
                        <span className="text-kyuzo-gold">•</span>
                      </div>
                      <div>
                        <p className="font-medium text-kyuzo-paper">Community</p>
                        <p className="text-sm text-kyuzo-paper/70">Social learning that motivates and inspires</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 mb-6 border border-kyuzo-gold/20 rounded-full bg-kyuzo-red/10">
              <span className="text-kyuzo-gold text-sm font-medium">Features</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-calligraphy">
              <span className="text-kyuzo-paper">How Kyuzo</span>{" "}
              <span className="text-kyuzo-gold">Works</span>
            </h2>
            
            <p className="text-kyuzo-paper/90 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with social motivation to create 
              a learning experience that adapts to your needs and keeps you engaged.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6">
                <div className="bg-kyuzo-red/20 p-3 rounded-lg inline-block mb-4">
                  <div className="text-kyuzo-gold">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-kyuzo-gold">
                  {feature.title}
                </h3>
                <p className="text-kyuzo-paper/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 px-6 md:px-12 bg-kyuzo-black">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 mb-6 border border-kyuzo-gold/20 rounded-full bg-kyuzo-red/10">
              <span className="text-kyuzo-gold text-sm font-medium">Our Team</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-calligraphy">
              <span className="text-kyuzo-paper">Meet the</span>{" "}
              <span className="text-kyuzo-gold">Creators</span>
            </h2>
            
            <p className="text-kyuzo-paper/90 max-w-2xl mx-auto">
              A passionate team of educators, technologists, and designers dedicated to transforming how we learn.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-kyuzo-gold/30"
                />
                <h3 className="text-xl font-bold text-kyuzo-gold mb-1">{member.name}</h3>
                <p className="text-sm text-kyuzo-paper/80 mb-3">{member.role}</p>
                <p className="text-kyuzo-paper/70">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6 md:px-12 bg-kyuzo-red">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-kyuzo-paper font-calligraphy">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-kyuzo-paper/90 max-w-2xl mx-auto mb-8">
              Join thousands of students who are already mastering new skills and knowledge with Kyuzo's innovative platform.
            </p>
            <Link to="/dashboard">
              <ButtonCustom 
                variant="outline" 
                className="border-kyuzo-paper/70 text-kyuzo-paper hover:bg-kyuzo-paper/10"
                size="lg"
              >
                Get Started for Free
              </ButtonCustom>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
