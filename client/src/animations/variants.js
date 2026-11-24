/**
 * Standardized Motion Design System for Ali Raza Portfolio
 * Calibrated with smooth cubic-bezier easing curves, cohesive durations,
 * and support for staggered reveals and interactive gestures.
 */

// Custom cubic-bezier deceleration curves
export const easeOutCustom = [0.22, 1, 0.36, 1];
export const easeInOutCustom = [0.4, 0, 0.2, 1];

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutCustom },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutCustom },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutCustom },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutCustom },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutCustom },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.015,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export const badgeVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.06,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export const floatSlight = {
  animate: {
    y: [-3, 4, -3],
    transition: {
      duration: 3.8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
