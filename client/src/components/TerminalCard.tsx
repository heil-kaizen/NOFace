import { ReactNode } from "react";

interface TerminalCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function TerminalCard({ children, title, className = "" }: TerminalCardProps) {
  return (
    <div className={`border border-border bg-background/90 backdrop-blur-sm relative p-6 ${className}`}>
      {/* Header Line */}
      <div className="absolute top-0 left-0 w-full h-8 border-b border-border flex items-center justify-between px-2 bg-muted/20">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-destructive rounded-none" />
          <div className="w-2 h-2 bg-accent rounded-none" />
          <div className="w-2 h-2 bg-primary rounded-none" />
        </div>
        {title && (
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
            {title}
          </span>
        )}
        <div className="w-10 h-[1px] bg-border" />
      </div>

      <div className="mt-6">
        {children}
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
    </div>
  );
}
