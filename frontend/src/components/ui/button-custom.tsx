
import React from 'react';
import { cn } from "../../lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const ButtonCustom = ({
  variant = 'default',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all rounded-md focus:outline-none";
  
  const variantClasses = {
    default: "btn-kyuzo",
    outline: "btn-outline",
    ghost: "bg-transparent hover:bg-kyuzo-gold/10 text-kyuzo-paper"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default ButtonCustom;
