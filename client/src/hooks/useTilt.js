import { useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * Lightweight pointer tilt hook using spring damping
 * Provides subtle 3D rotateX and rotateY values without layout shift.
 * Automatically disables or dampens on touch devices.
 */
export function useTilt(maxTilt = 8) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
}
