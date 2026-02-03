import { motion, useReducedMotion, type Variants } from "framer-motion";
import aboutImage from "../assets/images/Hero.png";

export default function About() {
  const reduce = useReducedMotion();
  const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

  return (
    <section id="about" className="py-14 sm:py-16 md:py-20">
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

            {/* Premium, branded copy */}
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

          {/* Right: Image */}
          <motion.div variants={fadeUp}>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
              {/* Single signature line: forest */}
              <div className="h-1 w-full bg-[rgb(var(--forest,45,67,53))]" />

              <div className="relative h-80 sm:h-[440px]">
                <img
                  src={aboutImage}
                  alt="Coco Palace Hotel"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Cleaner overlay: forest tint + readable bottom fade */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.08))]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(45,67,53,0.32),transparent_40%)]" />

                {/* Minimal brand card (not too busy) */}
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

            {/* Optional small note */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
