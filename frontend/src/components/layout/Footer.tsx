
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kyuzo-black/90 border-t border-kyuzo-gold/10 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-3xl font-bold font-calligraphy tracking-wider text-kyuzo-gold">
                kyuzo
              </span>
            </Link>
            <p className="text-kyuzo-paper/80 mb-4 max-w-xs">
              A next-generation EdTech platform designed to revolutionize the way students learn, share, and motivate each other.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-kyuzo-gold font-medium mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-kyuzo-gold font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-kyuzo-gold font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-kyuzo-paper/70 hover:text-kyuzo-gold transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-kyuzo-gold/10 pt-8 mt-8 text-center text-kyuzo-paper/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Kyuzo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
