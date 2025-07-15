import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, useTheme } from '@mui/material';

// Types for different animation components
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

interface SlideInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

interface StaggeredItemProps {
  children: ReactNode;
  index: number;
  staggerDelay?: number;
}

interface StaggeredContainerProps {
  children: ReactNode;
  staggerDelay?: number;
}

interface PulseProps {
  children: ReactNode;
  isActive?: boolean;
  duration?: number;
  scale?: number;
}

// FadeIn Animation
export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  direction,
  distance = 20
}) => {
  let initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  
  if (direction === 'up') {
    initial = { ...initial, y: distance };
  } else if (direction === 'down') {
    initial = { ...initial, y: -distance };
  } else if (direction === 'left') {
    initial = { ...initial, x: distance };
  } else if (direction === 'right') {
    initial = { ...initial, x: -distance };
  }
  
  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// ScaleIn Animation
export const ScaleIn: React.FC<ScaleInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.5 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// SlideIn Animation
export const SlideIn: React.FC<SlideInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  direction,
  distance = 100
}) => {
  let initial: { x?: number; y?: number } = {};
  
  if (direction === 'up') {
    initial = { y: distance };
  } else if (direction === 'down') {
    initial = { y: -distance };
  } else if (direction === 'left') {
    initial = { x: distance };
  } else if (direction === 'right') {
    initial = { x: -distance };
  }
  
  return (
    <motion.div
      initial={initial}
      animate={{ x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// StaggeredItem for creating staggered animations
export const StaggeredItem: React.FC<StaggeredItemProps> = ({ 
  children, 
  index, 
  staggerDelay = 0.1 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * staggerDelay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// StaggeredContainer for wrapping staggered items
export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({ 
  children, 
  staggerDelay = 0.1 
}) => {
  return (
    <Box>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            index,
            staggerDelay,
          });
        }
        return child;
      })}
    </Box>
  );
};

// Pulse Animation
export const Pulse: React.FC<PulseProps> = ({ 
  children, 
  isActive = true, 
  duration = 1.5,
  scale = 1.05
}) => {
  return (
    <motion.div
      animate={isActive ? {
        scale: [1, scale, 1],
      } : { scale: 1 }}
      transition={isActive ? {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    >
      {children}
    </motion.div>
  );
};

// Page Transition
export const PageTransition: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Button Click Animation
export const ButtonAnimation: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// Card Hover Animation
export const CardAnimation: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 10px 25px ${theme.palette.mode === 'dark' 
          ? 'rgba(0,0,0,0.3)' 
          : 'rgba(0,0,0,0.1)'}`
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Micro-interaction for correct/wrong answers
export const AnswerAnimation: React.FC<{ 
  children: ReactNode;
  isCorrect?: boolean | null;
}> = ({ children, isCorrect }) => {
  let animation = {};
  
  if (isCorrect === true) {
    animation = {
      scale: [1, 1.05, 1],
      borderColor: ['rgba(76, 175, 80, 0)', 'rgba(76, 175, 80, 1)', 'rgba(76, 175, 80, 1)'],
      backgroundColor: ['rgba(76, 175, 80, 0)', 'rgba(76, 175, 80, 0.1)', 'rgba(76, 175, 80, 0.05)'],
    };
  } else if (isCorrect === false) {
    animation = {
      scale: [1, 1.05, 1],
      borderColor: ['rgba(244, 67, 54, 0)', 'rgba(244, 67, 54, 1)', 'rgba(244, 67, 54, 1)'],
      backgroundColor: ['rgba(244, 67, 54, 0)', 'rgba(244, 67, 54, 0.1)', 'rgba(244, 67, 54, 0.05)'],
    };
  }
  
  return (
    <motion.div
      animate={isCorrect !== null ? animation : {}}
      transition={{ duration: 0.5 }}
      style={{ borderRadius: '4px', border: '1px solid transparent' }}
    >
      {children}
    </motion.div>
  );
};

export default {
  FadeIn,
  ScaleIn,
  SlideIn,
  StaggeredItem,
  StaggeredContainer,
  Pulse,
  PageTransition,
  ButtonAnimation,
  CardAnimation,
  AnswerAnimation
}; 