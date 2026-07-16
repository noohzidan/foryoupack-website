import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedSection — scroll-triggered fade + slide up animation.
 * Respects prefers-reduced-motion.
 *
 * Props:
 *   as        – HTML element tag (default: 'div')
 *   delay     – stagger delay in seconds (default: 0)
 *   y         – initial vertical offset in px (default: 36)
 *   className – forwarded to the motion element
 *   children  – content
 */
export default function AnimatedSection({
  as = 'div',
  delay = 0,
  y = 36,
  className = '',
  children,
  ...rest
}) {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : 0.60,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* ────────────────────────────────────────────────────────────
   StaggerContainer — wraps a grid and staggers its children.
   Children should use cardVariants as their `variants` prop.
   ──────────────────────────────────────────────────────────── */
export const staggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/**
 * Returns per-card variants (fade + slide) respecting reduced motion.
 */
export const cardVariants = (reduceMotion = false) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduceMotion ? 0 : 0.52,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

export function StaggerContainer({ children, className = '', as = 'div', ...rest }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
