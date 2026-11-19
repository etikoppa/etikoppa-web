import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "indigo" | "live" | "beta" | "dev" | "soon" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight",
        {
          "bg-slate-100 text-slate-700 dark:bg-slate-800/90 dark:text-slate-300":
            variant === "default",
          "border border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300":
            variant === "indigo",
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300":
            variant === "live",
          "border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300":
            variant === "beta",
          "border border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300":
            variant === "dev",
          "border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300":
            variant === "soon",
          "border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
