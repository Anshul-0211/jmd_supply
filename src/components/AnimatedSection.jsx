import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  threshold = 0.1,
  yOffset = 30
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: threshold
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: yOffset 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 