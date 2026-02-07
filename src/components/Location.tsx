import { motion, useReducedMotion, type Variants } from "framer-motion";

type Office = {
  city: string;
  label?: string; // optional small label (email/phone/etc)
  value?: string; // optional small value (email/phone/etc)
  address?: string;
  kind: "email" | "phone" | "pin";
};

const Icon = ({ kind }: { kind: Office["kind"] }) => {
  const cls = "h-4 w-4 text-black/55";
  if (kind === "email")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6.5 7.5 12 12l5.5-4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  if (kind === "phone")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.5 3.75h2.25c.7 0 1.3.47 1.46 1.14l.7 2.87c.14.58-.1 1.19-.6 1.5l-1.6 1a13.5 13.5 0 0 0 6.3 6.3l1-1.6c.31-.5.92-.74 1.5-.6l2.87.7c.67.16 1.14.76 1.14 1.46v2.25A2.25 2.25 0 0 1 18.75 21C10.33 21 3 13.67 3 5.25A2.25 2.25 0 0 1 5.25 3.75h1.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  // pin
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.05 6-11a6 6 0 1 0-12 0c0 5.95 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default function Location() {
  const reduce = useReducedMotion();
  const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const container: Variants = reduce
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE_OUT },
        },
      };

  // Replace these with your real entries
  const offices: Office[] = [
    {
      city: "Sydney",
      kind: "email",
      label: "Email",
      value: "hello@ourhotel.com",
    },
    {
      city: "New York",
      kind: "phone",
      label: "Phone",
      value: "+61 2 9000 0000",
    },
    {
      city: "London",
      kind: "pin",
      label: "Address",
      address: "42 Martin Place, Sydney NSW 2000 AU",
    },
  ];

  // Your PH map embed (use your current one)
  const mapEmbedUrl =
    "https://www.google.com/maps?q=Km%2083%20Maharlika%20Highway%20San%20Francisco%20Calihan%20San%20Pablo%20City%20Laguna%204000&output=embed";

  const mapLinkUrl =
    "https://www.google.com/maps/search/?api=1&query=Km%2083%20Maharlika%20Highway%20San%20Francisco%20Calihan%20San%20Pablo%20City%20Laguna%204000";

  return (
    <section id="location" className="py-14 sm:py-16 md:py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="rounded-[28px] border border-black/10 bg-white"
      >
        {/* TOP ROW: Left title / Right list */}
        <div className="px-6 pt-8 sm:px-10 sm:pt-10">
          <motion.div
            variants={fadeUp}
            className="grid gap-8 lg:grid-cols-12 lg:items-start"
          >
            {/* Left */}
            <div className="lg:col-span-6">
              <p className="text-xs tracking-[0.28em] text-black/50">VISIT</p>
              <h2 className="mt-2 font-[var(--font-heading)] text-3xl leading-[1.08] text-black sm:text-4xl">
                Where we are
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-black/60 sm:text-base">
                Find us in three cities across the globe.
              </p>
            </div>

            {/* Right */}
            <div className="lg:col-span-6">
              <div className="ml-auto grid max-w-sm gap-5">
                {offices.map((o) => (
                  <div key={o.city} className="flex gap-3">
                    <div className="mt-0.5">
                      <Icon kind={o.kind} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black">
                        {o.city}
                      </p>
                      {o.value ? (
                        <p className="mt-1 text-sm text-black/60">{o.value}</p>
                      ) : null}
                      {o.address ? (
                        <p className="mt-1 text-sm text-black/60">
                          {o.address}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* MAP AREA (wide block under the row) */}
        <motion.div variants={fadeUp} className="px-6 pb-8 sm:px-10 sm:pb-10">
          <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-black/[0.02]">
            <div className="relative h-[260px] sm:h-[340px] md:h-[420px]">
              <iframe
                title="Location Map"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-black/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-black/55">
                Coco Palace Hotel • San Pablo City, Laguna
              </p>
              <a
                href={mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-black/70 hover:text-black hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
