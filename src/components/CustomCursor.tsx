import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Custom cursor with:
 * - Small inner dot (follows instantly)
 * - Outer ring (follows with spring delay)
 * - Grows on hovering interactive elements
 * - Hidden on mobile / touch devices
 */
export function CustomCursor() {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springy ring that follows with delay
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.2 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.2 });

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!visible) setVisible(true);
      });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Track hovering over interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isMobile, mouseX, mouseY, visible]);

  // Hide on mobile / touch
  if (isMobile) return null;

  const ringSize = isHovering ? 48 : 32;
  const dotSize = isClicking ? 6 : 4;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      {/* Inner dot — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          width: dotSize,
          height: dotSize,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </motion.div>

      {/* Outer ring — follows with spring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? (isHovering ? 0.6 : 0.3) : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-full h-full rounded-full border border-[#3d8bff]"
          style={{
            boxShadow: isHovering
              ? '0 0 15px rgba(61,139,255,0.3), inset 0 0 15px rgba(61,139,255,0.1)'
              : '0 0 8px rgba(61,139,255,0.15)',
          }}
        />
      </motion.div>
    </>
  );
}
