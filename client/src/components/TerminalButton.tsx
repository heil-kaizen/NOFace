import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
}

export function TerminalButton({ 
  children, 
  className = "", 
  variant = "primary",
  disabled,
  ...props 
}: TerminalButtonProps) {
  const baseStyles = "relative px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200 border-2 border-primary overflow-hidden group";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-background hover:text-primary",
    outline: "bg-transparent text-primary hover:bg-primary hover:text-background",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
