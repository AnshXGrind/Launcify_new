import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  /** Pass true when the action is in-flight (shows as disabled but keeps layout) */
  loading?: boolean;
  "aria-label"?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  loading = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white",
    secondary:
      "bg-transparent border border-border text-text hover:border-primary hover:text-primary",
  };

  const disabledClasses = isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  const classes = `${base} ${variants[variant]} ${disabledClasses} ${className}`.trim();

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href && isDisabled) {
    return (
      <span className={classes} aria-disabled="true" role="link" aria-label={ariaLabel}>
        {children}
      </span>
    );
  }

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
