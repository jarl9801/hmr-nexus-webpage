import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeInUp, safeVariants } from '@/lib/motion';
import type { Variants } from 'framer-motion';

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function MotionSection({ children, className, variants, delay = 0 }: MotionSectionProps) {
  const reducedMotion = useReducedMotion();
  const v = safeVariants(variants ?? fadeInUp, !!reducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={v}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
