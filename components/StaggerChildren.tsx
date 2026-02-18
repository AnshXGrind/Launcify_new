"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MotionContainer, fadeUpVariant } from "@/components/motion/motion";

type StaggerChildrenProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

export function StaggerChildren({ children, className, stagger = 0.1 }: StaggerChildrenProps) {
  return (
    <MotionContainer className={className} stagger={stagger}>
      {children}
    </MotionContainer>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { ...fadeUpVariant.visible },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
