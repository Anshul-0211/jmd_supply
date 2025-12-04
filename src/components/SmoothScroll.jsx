import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const SmoothScroll = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleX = useSpring(scrollYProgress, springConfig);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />
      {children}
    </>
  );
};

export default SmoothScroll; 