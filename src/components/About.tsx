import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
  type MotionStyle,
} from "framer-motion";
import aboutImage from "../assets/images/Hero.png";

export default function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // ✅ Your existing reveal animation
  const stagger: Variants = reduce
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE_OUT },
        },
      };

  // ✅ Parallax: section-based (so it feels strong + consistent)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // starts moving as section enters, finishes as it leaves
  });

  // Slow layer: image
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);

  // Fast layer: overlays (moves more = "faster")
  const overlayY = useTransform(scrollYProgress, [0, 1], [60, -220]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const imgStyle: MotionStyle | undefined = reduce
    ? undefined
    : { y: imgY, scale: imgScale };

  const overlayStyle: MotionStyle | undefined = reduce
    ? undefined
    : { y: overlayY, opacity: overlayOpacity };

  return (
    <section ref={ref} id="about" className="py-14 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
          className="grid gap-10 md:grid-cols-2 md:items-center"
        >
          {/* Left: Text */}
          <motion.div variants={fadeUp}>
            <p className="text-xs tracking-[0.28em] text-[rgb(var(--coral,245,120,80))]">
              ABOUT US
            </p>

            <h2 className="mt-3 font-[var(--font-heading)] text-3xl leading-[1.08] text-[rgb(var(--forest,45,67,53))] sm:text-4xl">
              Traditional hospitality,
              <span className="block">modern comfort.</span>
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed text-black/70 sm:text-base">
              The Coco Palace Hotel offers a clean, comfortable stay in San
              Pablo City, Laguna—paired with warm Filipino hospitality and
              first-class service.
            </p>

            <p className="mt-3 text-[15px] leading-relaxed text-black/65 sm:text-base">
              Set along Maharlika Highway, guests enjoy easy access to key
              destinations—ideal for leisure trips, business travel, and special
              occasions.
            </p>

            <p className="mt-3 text-[15px] leading-relaxed text-black/65 sm:text-base">
              With 24 inviting rooms, property-wide WiFi, and relaxing
              facilities such as an outdoor pool and gym, Coco Palace Hotel is a
              refined base for your time in Laguna.
            </p>

            {/* Highlights */}
            <motion.div
              variants={stagger}
              className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {[
                { label: "24 Rooms", sub: "Clean & inviting" },
                { label: "Outdoor Pool", sub: "Unwind & relax" },
                { label: "Gym", sub: "Stay active" },
              ].map((x) => (
                <motion.div
                  key={x.label}
                  variants={fadeUp}
                  className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
                >
                  <p className="text-sm font-semibold text-[rgb(var(--forest,45,67,53))]">
                    {x.label}
                  </p>
                  <p className="mt-1 text-xs text-black/55">{x.sub}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              variants={fadeUp}
              href="#contact"
              className="
                mt-8 inline-flex items-center justify-center
                rounded-2xl
                bg-[rgb(var(--coral,245,120,80))]
                px-6 py-3
                text-sm font-medium text-white
                shadow-[0_12px_28px_rgba(0,0,0,0.14)]
                transition hover:brightness-95
                focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15
              "
            >
              Contact the Hotel
            </motion.a>
          </motion.div>

          {/* Right: Image (with parallax layers) */}
          <motion.div variants={fadeUp}>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
              <div className="h-1 w-full bg-[rgb(var(--forest,45,67,53))]" />

              <div className="relative h-80 sm:h-[440px]">
                {/* Slow layer: image */}
                <motion.img
                  src={aboutImage}
                  alt="Coco Palace Hotel"
                  className="h-full w-full object-cover will-change-transform"
                  loading="lazy"
                  style={imgStyle}
                />

                {/* Fast layers: overlays */}
                <motion.div
                  className="absolute inset-0 will-change-transform bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.08))]"
                  style={overlayStyle}
                />
                <motion.div
                  className="absolute inset-0 will-change-transform bg-[linear-gradient(to_bottom,rgba(45,67,53,0.32),transparent_40%)]"
                  style={overlayStyle}
                />

                {/* Brand card stays normal (so it feels anchored) */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-[340px]">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur">
                    <p className="text-sm font-semibold">Coco Palace Hotel</p>
                    <p className="mt-1 text-xs text-white/75">
                      Clean rooms • Pool • Gym • Warm hospitality
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[rgb(var(--coral,245,120,80))]" />
                      <p className="text-xs text-white/85">
                        San Pablo City, Laguna
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
