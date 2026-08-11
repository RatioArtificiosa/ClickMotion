'use client';

import { motion } from 'framer-motion';

export function StaggerChildren({ children, staggerDelay = 0.1 }: { children: React.ReactNode; staggerDelay?: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
