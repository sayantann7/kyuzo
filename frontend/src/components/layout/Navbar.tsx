
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogIn, Sun, Moon } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';
import { cn } from "../../lib/utils"
import { useTheme } from '../theme/theme-provider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    console.log('Theme changed to:', newTheme);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12',
        isScrolled 
          ? 'py-2 bg-kyuzo-black/90 backdrop-blur-md shadow-md' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold font-calligraphy tracking-wider text-kyuzo-gold">
            kyuzo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative text-kyuzo-paper hover:text-kyuzo-gold transition-colors duration-300 accent-border py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          
          <Link to="/login">
            <ButtonCustom 
              variant="ghost" 
              size="sm"
              icon={<LogIn size={18} />}
            >
              Login
            </ButtonCustom>
          </Link>
          
          <Link to="/signup">
            <ButtonCustom 
              variant="default" 
              size="sm"
              icon={<User size={18} />}
            >
              Sign Up
            </ButtonCustom>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="p-2 rounded-full text-kyuzo-paper hover:bg-kyuzo-red/10 transition-colors"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            className="md:hidden text-kyuzo-paper focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-kyuzo-black/95 backdrop-blur-md transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } pt-20`}
      >
        <div className="flex flex-col items-center space-y-6 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-xl text-kyuzo-paper hover:text-kyuzo-gold transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 flex flex-col space-y-4 w-full">
            <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <ButtonCustom variant="outline" className="w-full" icon={<LogIn size={18} />}>
                Login
              </ButtonCustom>
            </Link>
            <Link to="/signup" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <ButtonCustom variant="default" className="w-full" icon={<User size={18} />}>
                Sign Up
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
