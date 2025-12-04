import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  className = '', 
  onClick, 
  type = 'button',
  variant = 'primary'
}) => {
  const variants = {
    primary: {
      initial: { 
        backgroundColor: '#3b82f6', // blue-500
        color: 'white'
      },
      hover: { 
        backgroundColor: '#2563eb', // blue-600
        scale: 1.03,
        transition: { duration: 0.2 }
      },
      tap: { 
        scale: 0.98,
        transition: { duration: 0.1 }
      }
    },
    secondary: {
      initial: { 
        backgroundColor: 'white',
        color: '#1e40af', // blue-800
        border: '1px solid #1e40af'
      },
      hover: { 
        backgroundColor: '#eff6ff', // blue-50
        scale: 1.03,
        transition: { duration: 0.2 }
      },
      tap: { 
        scale: 0.98,
        transition: { duration: 0.1 }
      }
    },
    outline: {
      initial: { 
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid white'
      },
      hover: { 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        scale: 1.03,
        transition: { duration: 0.2 }
      },
      tap: { 
        scale: 0.98,
        transition: { duration: 0.1 }
      }
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium shadow-sm ${className}`}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={variants[variant]}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton; 