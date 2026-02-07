import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import heroImage from "../assets/images/Hero.png";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // ✅ Track scroll relative to the HERO section (so parallax is noticeable)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // 0 when hero hits top, 1 when hero leaves top
  });

  // 🎥 Parallax layers
  // Background image: slower (moves less)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Overlay gradient: faster (moves more) — this adds depth
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -520]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const fadeUp = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.65, ease: EASE_OUT },
      };

  const bgStyle: MotionStyle | undefined = reduce
    ? undefined
    : { y: bgY, scale: bgScale, opacity: bgOpacity };

  const overlayStyle: MotionStyle | undefined = reduce
    ? undefined
    : { y: overlayY, opacity: overlayOpacity };

  return (
    <section ref={ref} id="home" className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Slow layer: image */}
        <motion.img
          src={heroImage}
          alt="Coco Palace Hotel"
          className="h-full w-full object-cover will-change-transform"
          style={bgStyle}
        />

        {/* Base overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Fast layer: brand gradient (moves faster than image) */}
        <motion.div
          className="
            absolute inset-0
            will-change-transform
            bg-[radial-gradient(900px_520px_at_50%_20%,rgba(245,120,80,0.22),transparent_55%),linear-gradient(to_bottom,rgba(45,67,53,0.55)_0%,rgba(45,67,53,0.28)_35%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.78)_100%)]
          "
          style={overlayStyle}
        />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* ✅ Give the hero more scroll room so parallax is felt */}
          <div className="flex min-h-[110vh] items-end pb-14 pt-28 sm:pb-16">
            {/* Center wrapper */}
            <div className="mx-auto w-full max-w-3xl text-center">
              {/* Eyebrow */}
              <motion.p
                {...fadeUp}
                className="text-xs tracking-[0.32em] text-white/80"
              >
                THE COCO PALACE HOTEL
              </motion.p>

              {/* Heading */}
              <motion.h1
                {...fadeUp}
                transition={{
                  duration: 0.75,
                  ease: EASE_OUT,
                  delay: reduce ? 0 : 0.06,
                }}
                className="
                  mt-4
                  font-[var(--font-heading)]
                  text-4xl
                  leading-[1.04]
                  text-white
                  sm:text-5xl
                  md:text-6xl
                "
              >
                A place more than to stay.
              </motion.h1>

              {/* Description */}
              <motion.p
                {...fadeUp}
                transition={{
                  duration: 0.7,
                  ease: EASE_OUT,
                  delay: reduce ? 0 : 0.12,
                }}
                className="
                  mx-auto
                  mt-5
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-white/85
                  sm:text-lg
                "
              >
                Calm comfort, warm hospitality, and an easy stay experience—
                thoughtfully set in San Pablo City, Laguna.
              </motion.p>

              {/* CTAs */}
              <motion.div
                {...fadeUp}
                transition={{
                  duration: 0.65,
                  ease: EASE_OUT,
                  delay: reduce ? 0 : 0.18,
                }}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <a
                  href="#rooms"
                  className="
                    inline-flex w-full items-center justify-center
                    rounded-2xl
                    bg-[rgb(var(--coral,245,120,80))]
                    px-6 py-3
                    text-sm font-medium text-white
                    shadow-[0_16px_36px_rgba(0,0,0,0.25)]
                    transition hover:brightness-95
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                    sm:w-auto
                  "
                >
                  Explore Rooms
                </a>

                <a
                  href="#contact"
                  className="
                    inline-flex w-full items-center justify-center
                    rounded-2xl
                    border border-white/25
                    bg-white/10
                    px-6 py-3
                    text-sm font-medium text-white
                    backdrop-blur
                    transition hover:bg-white/15
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                    sm:w-auto
                  "
                >
                  Inquire / Contact
                </a>
              </motion.div>

              {/* Highlights (centered) */}
              <motion.div
                {...fadeUp}
                transition={{
                  duration: 0.65,
                  ease: EASE_OUT,
                  delay: reduce ? 0 : 0.24,
                }}
                className="
                  mx-auto
                  mt-10
                  grid
                  max-w-2xl
                  grid-cols-1
                  gap-3
                  sm:grid-cols-3
                "
              >
                {[
                  { label: "24 Rooms", sub: "Comfort stay" },
                  { label: "Swimming Pool", sub: "Relax & unwind" },
                  { label: "Events Space", sub: "Celebrate moments" },
                ].map((x) => (
                  <div
                    key={x.label}
                    className="
                      rounded-2xl
                      border border-white/20
                      bg-white/10
                      p-4
                      text-left
                      backdrop-blur
                      sm:text-center
                    "
                  >
                    <p className="text-sm font-semibold text-white">
                      {x.label}
                    </p>
                    <p className="mt-1 text-xs text-white/75">{x.sub}</p>
                  </div>
                ))}
              </motion.div>

              {/* Subtle brand divider */}
              <motion.div
                {...fadeUp}
                transition={{
                  duration: 0.65,
                  ease: EASE_OUT,
                  delay: reduce ? 0 : 0.3,
                }}
                className="mx-auto mt-10 h-px w-40 bg-[rgba(255,255,255,0.25)]"
              />
            </div>
          </div>
        </div>

        {/* Bottom fade into page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_bottom,rgba(252,250,247,0),rgba(252,250,247,1))]" />
      </div>
    </section>
  );
}
