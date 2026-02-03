import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function Location() {
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

  // Maps (no API key)
  const mapEmbedUrl =
    "https://www.google.com/maps?q=Km%2083%20Maharlika%20Highway%20San%20Francisco%20Calihan%20San%20Pablo%20City%20Laguna%204000&output=embed";

  const mapLinkUrl =
    "https://www.google.com/maps/search/?api=1&query=Km%2083%20Maharlika%20Highway%20San%20Francisco%20Calihan%20San%20Pablo%20City%20Laguna%204000";

  return (
    <section id="location" className="py-14 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
          className="grid gap-8 lg:grid-cols-12 lg:items-stretch"
        >
          {/* Left: Minimal details */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <p className="text-xs tracking-[0.28em] text-[rgb(var(--coral,245,120,80))]">
              LOCATION
            </p>

            <h2 className="mt-3 font-[var(--font-heading)] text-3xl leading-[1.08] text-[rgb(var(--forest,45,67,53))] sm:text-4xl">
              Find us in
              <span className="block">San Pablo City.</span>
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-black/65 sm:text-base">
              Along Maharlika Highway—easy to reach for leisure, events, and
              business stays.
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
              <div className="h-1 w-full bg-[rgb(var(--forest,45,67,53))]" />

              <div className="p-6 sm:p-7">
                <p className="text-xs tracking-[0.22em] text-black/45">
                  ADDRESS
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-black/75">
                  Km 83. Maharlika Highway, San Francisco, Calihan
                  <br />
                  San Pablo City, Laguna, Philippines 4000
                </p>

                {/* One clean line for contact (no clutter) */}
                <div className="mt-5 space-y-1.5 text-sm">
                  <a
                    href="tel:+63495363238"
                    className="block text-black/65 transition hover:text-[rgb(var(--forest,45,67,53))] hover:underline"
                  >
                    +63 49 536 3238
                  </a>

                  <a
                    href="mailto:info@thecocopalacehotel.com.ph"
                    className="block text-black/65 transition hover:text-[rgb(var(--forest,45,67,53))] hover:underline"
                  >
                    info@thecocopalacehotel.com.ph
                  </a>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center justify-center
                      rounded-2xl
                      bg-[rgb(var(--coral,245,120,80))]
                      px-5 py-3
                      text-sm font-medium text-white
                      shadow-[0_12px_28px_rgba(0,0,0,0.14)]
                      transition hover:brightness-95
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15
                    "
                  >
                    Get Directions
                  </a>

                  <a
                    href="#contact"
                    className="
                      inline-flex items-center justify-center
                      rounded-2xl
                      border border-black/10 bg-white
                      px-5 py-3
                      text-sm font-medium
                      text-[rgb(var(--forest,45,67,53))]
                      shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                      transition hover:bg-black/3
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10
                    "
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Map (hero of this section) */}
          <motion.div variants={fadeUp} className="lg:col-span-8">
            <motion.div
              whileHover={reduce ? undefined : { y: -3 }}
              transition={
                reduce ? undefined : { duration: 0.2, ease: EASE_OUT }
              }
              className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="h-1 w-full bg-[rgb(var(--forest,45,67,53))]" />

              <div className="relative h-[360px] sm:h-[460px]">
                <iframe
                  title="Coco Palace Hotel Location Map"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              </div>

              {/* Single minimal caption (optional luxury touch) */}
              <div className="flex items-center justify-between gap-3 border-t border-black/10 px-5 py-4 sm:px-6">
                <p className="text-xs text-black/55">
                  Coco Palace Hotel • San Pablo City, Laguna
                </p>
                <a
                  href={mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[rgb(var(--forest,45,67,53))] hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
