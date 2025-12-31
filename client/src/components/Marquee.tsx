import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({ text, direction = "left", className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap bg-primary text-background py-1 ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: direction === "left" ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <span className="font-bold tracking-widest text-sm md:text-base mr-8">
          {text.repeat(10)}
        </span>
      </motion.div>
    </div>
  );
}
