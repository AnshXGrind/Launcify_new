"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

export const easings = {
  default: [0.2, 0.9, 0.25, 1],
  hover: [0.32, 0.72, 0.24, 1],
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: easings.default as any } },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.36, ease: easings.default as any } },
};

export const staggerContainer = (stagger = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

export function MotionContainer({ children, className, stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer(stagger)} className={className}>
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className, variant = fadeUpVariant }: { children: ReactNode; className?: string; variant?: Variants }) {
  return (
    <motion.div variants={variant} className={className}>
      {children}
    </motion.div>
  );
}

export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.24, ease: easings.hover as any }} className={className}>
      {children}
    </motion.div>
  );
}

export function PageTransition({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }} className={className}>
      {children}
    </motion.div>
  );
}
