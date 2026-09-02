import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
};

/** A rounded, softly-bordered surface used across the CrediFi UI. */
export function Card({ children, className = "", highlight = false }: CardProps) {
  return (
    <div className={`card ${highlight ? "card-highlight" : ""} ${className}`}>
      {children}
    </div>
  );
}
