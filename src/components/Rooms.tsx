import { motion, useReducedMotion, type Variants } from "framer-motion";

import coco1 from "../assets/images/coco1.jpg";
import coco2 from "../assets/images/coco2.jpg";
import coco3 from "../assets/images/coco3.jpg";

type Room = {
  name: string;
  subtitle: string;
  highlights: string[];
  badge?: string;
  image: string;
};

const ROOMS: Room[] = [
  {
    name: "Suite Room",
    subtitle: "Spacious comfort with a relaxed, quiet feel",
    highlights: [
      "Most spacious option",
      "Ideal for couples",
      "Great for longer stays",
    ],
    badge: "Most spacious",
    image: coco1,
  },
  {
    name: "Deluxe Room A",
    subtitle: "Modern essentials designed for a smooth stay",
    highlights: [
      "Best value",
      "Comfort-first setup",
      "Perfect for quick trips",
    ],
    badge: "Best value",
    image: coco2,
  },
  {
    name: "Deluxe Room B",
    subtitle: "A practical choice with dependable hotel comfort",
    highlights: ["Popular pick", "Good for business trips", "Simple and clean"],
    badge: "Popular",
    image: coco3,
  },
];

export default function Rooms() {
  const reduce = useReducedMotion();
  const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const container: Variants = reduce
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
    <section className="py-14 sm:py-16 md:py-20" id="rooms">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.28em] text-[rgb(var(--coral,245,120,80))]">
                ROOMS
              </p>

              <h2 className="mt-3 font-[var(--font-heading)] text-3xl leading-[1.1] text-[rgb(var(--forest,45,67,53))] sm:text-4xl">
                Rooms designed for comfort and ease.
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-black/65 sm:text-base">
                Explore room types, then inquire for updated rates and
                availability.
              </p>
            </div>

            <motion.a
              variants={fadeUp}
              href="#contact"
              className="
                inline-flex w-full items-center justify-center
                rounded-2xl border border-black/10 bg-white
                px-5 py-3 text-sm font-medium
                text-[rgb(var(--forest,45,67,53))]
                shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                transition hover:bg-black/[0.03]
                sm:w-auto
              "
            >
              Inquire for rates
            </motion.a>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={container}
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {ROOMS.map((room) => (
              <motion.article
                key={room.name}
                variants={fadeUp}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={
                  reduce ? undefined : { duration: 0.2, ease: EASE_OUT }
                }
                className="
                  group overflow-hidden rounded-3xl
                  border border-black/10 bg-white
                  shadow-[0_18px_40px_rgba(0,0,0,0.06)]
                "
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {/* Single signature detail: forest top line */}
                  <div className="absolute left-0 top-0 z-10 h-1 w-full bg-[rgb(var(--forest,45,67,53))]" />

                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* Minimal dark gradient for readability */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0.10))]" />

                  {/* Badge */}
                  {room.badge ? (
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[rgb(var(--forest,45,67,53))] shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur">
                      {room.badge}
                    </div>
                  ) : null}

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-lg font-semibold text-white">
                      {room.name}
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      {room.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <ul className="space-y-2 text-sm text-black/70">
                    {room.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--coral,245,120,80))]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <a
                      href="#contact"
                      className="
                        inline-flex items-center justify-center
                        rounded-2xl bg-[rgb(var(--coral,245,120,80))]
                        px-4 py-2.5 text-sm font-medium text-white
                        shadow-[0_12px_28px_rgba(0,0,0,0.14)]
                        transition hover:brightness-95
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15
                      "
                    >
                      Inquire
                    </a>

                    <a
                      href="#contact"
                      className="
                        inline-flex items-center justify-center
                        rounded-2xl px-3 py-2
                        text-sm font-medium
                        text-[rgb(var(--forest,45,67,53))]
                        transition hover:bg-black/[0.03]
                      "
                    >
                      View details
                    </a>
                  </div>

                  <p className="mt-5 text-xs text-black/45">
                    Rates may vary — contact the hotel for updated pricing.
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
