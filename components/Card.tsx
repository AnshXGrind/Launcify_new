import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-lg p-8 transition-transform duration-200 hover:-translate-y-1 hover:border-primary/30 ${className}`}
    >
      {children}
    </div>
  );
}
