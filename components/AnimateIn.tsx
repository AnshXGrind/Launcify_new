"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/components/motion/motion";

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

type AnimateInProps = {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
};

export default function AnimateIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const offset = offsets[direction];

  return (
    <motion.div ref={ref} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUpVariant} transition={{ duration, delay }} className={className} style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
      {children}
    </motion.div>
  );
}
