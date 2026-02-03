import { motion, useReducedMotion, type Variants } from "framer-motion";

type Review = {
  name: string;
  label: string;
  text: string;
  rating?: number;
};

const REVIEWS: Review[] = [
  {
    name: "Guest Name",
    label: "Stayed recently",
    text: "Clean rooms and a calm atmosphere. The staff were accommodating and the stay felt smooth from check-in to check-out.",
    rating: 5,
  },
  {
    name: "Guest Name",
    label: "Weekend stay",
    text: "Great place to rest and recharge. The overall experience was comfortable, and the facilities were a nice bonus.",
    rating: 5,
  },
  {
    name: "Guest Name",
    label: "Business trip",
    text: "Simple, convenient, and easy. The location worked well for my trip and the room had everything I needed.",
    rating: 4,
  },
];

export default function Reviews() {
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
    <section id="reviews" className="py-14 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="text-xs tracking-[0.28em] text-[rgb(var(--coral,245,120,80))]">
              GUEST EXPERIENCES
            </p>

            <h2 className="mt-3 font-[var(--font-heading)] text-3xl leading-[1.1] text-[rgb(var(--forest,45,67,53))] sm:text-4xl">
              What guests say.
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-black/65 sm:text-base">
              A few notes from recent stays—kept simple, readable, and refined.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {REVIEWS.map((r, idx) => (
              <motion.article
                key={`${r.name}-${idx}`}
                variants={fadeUp}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={
                  reduce ? undefined : { duration: 0.2, ease: EASE_OUT }
                }
                className="group rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
              >
                {/* Signature top line (forest) */}
                <div className="-mt-6 -mx-6 mb-5 h-1 w-[calc(100%+48px)] bg-[rgb(var(--forest,45,67,53))]" />

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex gap-1.5"
                    aria-label={`Rating ${r.rating ?? 5} out of 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filled = (r.rating ?? 5) > i;
                      return (
                        <span
                          key={i}
                          className={[
                            "inline-block h-2.5 w-2.5 rounded-full",
                            filled
                              ? "bg-[rgb(var(--coral,245,120,80))]"
                              : "bg-black/10",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                      );
                    })}
                  </div>

                  <span className="text-xs text-black/45">Verified stay</span>
                </div>

                {/* Quote */}
                <p className="mt-4 text-sm leading-relaxed text-black/70">
                  “{r.text}”
                </p>

                {/* Person */}
                <div className="mt-6 flex items-center gap-3">
                  {/* Minimal avatar (branded ring) */}
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-[rgb(var(--bg))]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--forest,45,67,53))]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[rgb(var(--forest,45,67,53))]">
                      {r.name}
                    </p>
                    <p className="text-xs text-black/55">{r.label}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-black/60">
              Ready to inquire about rates and availability?
            </p>

            <a
              href="#contact"
              className="
                inline-flex items-center justify-center
                rounded-2xl
                bg-[rgb(var(--coral,245,120,80))]
                px-6 py-3
                text-sm font-medium text-white
                shadow-[0_12px_28px_rgba(0,0,0,0.14)]
                transition hover:brightness-95
                focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15
              "
            >
              Inquire Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
