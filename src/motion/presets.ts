import { useReducedMotion, type Variants } from "framer-motion";

/**
 * Centralized motion presets
 * - Subtle only (luxury feel)
 * - Reusable across sections
 * - Respects prefers-reduced-motion
 */
export function useMotion() {
  const reduce = useReducedMotion();

  /**
   * Fade up on enter (default section animation)
   */
  const fadeUp: Variants = reduce
    ? {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: "easeOut",
          },
        },
      };

  /**
   * Stagger children (use on grids / lists)
   */
  const stagger: Variants = reduce
    ? {
        hidden: {},
        show: {},
      }
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      };

  /**
   * Fade in only (text / subtle UI)
   */
  const fade: Variants = reduce
    ? {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            duration: 0.45,
            ease: "easeOut",
          },
        },
      };

  /**
   * Card hover lift (VERY subtle)
   */
  const hoverLift = reduce
    ? {}
    : {
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      };

  /**
   * Section reveal settings (recommended defaults)
   */
  const viewport = {
    once: true,
    margin: "-20% 0px",
  };

  return {
    reduce,
    fadeUp,
    fade,
    stagger,
    hoverLift,
    viewport,
  };
}
