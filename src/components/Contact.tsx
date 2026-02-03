import { useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Contact() {
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

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function validate(next: FormValues): FormErrors {
    const e: FormErrors = {};
    if (!next.name.trim()) e.name = "Please enter your name.";
    if (!next.email.trim()) e.email = "Please enter your email.";
    else if (!isEmailValid(next.email)) e.email = "Please enter a valid email.";
    if (!next.phone.trim()) e.phone = "Please enter your phone number.";
    if (!next.message.trim()) e.message = "Please enter your message.";
    return e;
  }

  function onChange<K extends keyof FormValues>(key: K, val: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(false);

    const eMap = validate(values);
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    setSubmitted(true);
    setValues({ name: "", email: "", phone: "", message: "" });
  }

  const inputBase =
    "h-12 w-full rounded-2xl bg-white/90 border px-4 text-[15px] outline-none transition " +
    "focus:border-[rgba(45,67,53,0.35)] focus:ring-2 focus:ring-[rgba(245,120,80,0.14)]";

  const okBorder = "border-black/10";
  const errBorder = "border-red-500/50";

  return (
    <section id="contact" className="relative py-14 sm:py-16 md:py-20">
      {/* Brand background (forest + coral) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 left-1/2 h-[380px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(245,120,80,0.16),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-28 right-[-140px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(45,67,53,0.18),transparent_60%)] blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
          className="grid gap-8 lg:grid-cols-12 lg:items-stretch"
        >
          {/* Left: Brand panel */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
              {/* Accent bar (forest) */}
              <div className="h-1 w-full bg-[rgb(var(--forest,45,67,53))]" />

              <div className="p-6 sm:p-7">
                <p className="text-xs tracking-[0.28em] text-[rgb(var(--coral,245,120,80))]">
                  CONTACT
                </p>

                <h2 className="mt-3 font-[var(--font-heading)] text-3xl leading-[1.08] text-[rgb(var(--forest,45,67,53))] sm:text-4xl">
                  Let’s plan your stay.
                </h2>

                <p className="mt-4 text-[15px] leading-relaxed text-black/65 sm:text-base">
                  For inquiries, rates, and availability—send a message or reach
                  us directly via phone and Facebook.
                </p>

                {/* Contact chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    {
                      href: "tel:+63495363238",
                      label: "Landline: +63 49 536 3238",
                    },
                    {
                      href: "tel:+639535315498",
                      label: "TM: +63 953 531 5498",
                    },
                    {
                      href: "tel:+638984009137",
                      label: "DITO: +63 898 400 9137",
                    },
                  ].map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className="
                        inline-flex items-center gap-2
                        rounded-full border border-black/10
                        bg-white px-4 py-2 text-sm text-black/70
                        shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                        transition hover:bg-black/3
                      "
                    >
                      <span className="h-2 w-2 rounded-full bg-[rgb(var(--forest,45,67,53))]" />
                      {c.label}
                    </a>
                  ))}

                  <a
                    href="mailto:info@thecocopalacehotel.com.ph"
                    className="
                      inline-flex items-center gap-2
                      rounded-full border border-black/10
                      bg-white px-4 py-2 text-sm
                      text-[rgb(var(--forest,45,67,53))]
                      shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                      transition hover:bg-black/3
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-[rgb(var(--coral,245,120,80))]" />
                    info@thecocopalacehotel.com.ph
                  </a>

                  <a
                    href="https://www.facebook.com/thecocopalacehotel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-2
                      rounded-full border border-black/10
                      bg-white px-4 py-2 text-sm
                      text-[rgb(var(--forest,45,67,53))]
                      shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                      transition hover:bg-black/3
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-[rgb(var(--coral,245,120,80))]" />
                    Facebook
                  </a>
                </div>

                {/* Address */}
                <div className="mt-6 rounded-2xl border border-black/10 bg-black/2 p-5">
                  <p className="text-xs tracking-[0.22em] text-black/45">
                    ADDRESS
                  </p>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-black/75">
                    Km 83. Maharlika Highway, San Francisco, Calihan
                    <br />
                    San Pablo City, Laguna, Philippines 4000
                  </p>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="tel:+63495363238"
                      className="
                        inline-flex flex-1 items-center justify-center
                        rounded-2xl border border-black/10
                        bg-white px-5 py-3 text-sm font-medium
                        text-[rgb(var(--forest,45,67,53))]
                        shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                        transition hover:bg-black/3
                      "
                    >
                      Call Now
                    </a>

                    <a
                      href="https://www.facebook.com/thecocopalacehotel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex flex-1 items-center justify-center
                        rounded-2xl
                        bg-[rgb(var(--coral,245,120,80))]
                        px-5 py-3 text-sm font-medium text-white
                        shadow-[0_12px_28px_rgba(0,0,0,0.14)]
                        transition hover:brightness-95
                      "
                    >
                      Message on Facebook
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-xs text-black/45">
                  Concept redevelopment — connect the form to email or backend
                  when ready.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <motion.div
              whileHover={reduce ? undefined : { y: -4 }}
              transition={
                reduce ? undefined : { duration: 0.2, ease: EASE_OUT }
              }
              className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
            >
              {/* Accent bar (coral) */}
              <div className="h-1 w-full bg-[rgb(var(--coral,245,120,80))]" />

              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[rgb(var(--forest,45,67,53))]">
                      Send an Inquiry
                    </p>
                    <p className="mt-1 text-xs text-black/50">
                      Add your dates, guests, and preferred room.
                    </p>
                  </div>

                  <span className="text-xs text-black/45">
                    Replies within 24h
                  </span>
                </div>

                <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-sm text-black/70">Full Name</label>
                      <input
                        value={values.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        className={`${inputBase} ${errors.name ? errBorder : okBorder}`}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                      {errors.name ? (
                        <p className="text-xs text-red-600">{errors.name}</p>
                      ) : null}
                    </div>

                    <div className="grid gap-2">
                      <label className="text-sm text-black/70">Email</label>
                      <input
                        value={values.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        className={`${inputBase} ${errors.email ? errBorder : okBorder}`}
                        placeholder="you@email.com"
                        autoComplete="email"
                        inputMode="email"
                      />
                      {errors.email ? (
                        <p className="text-xs text-red-600">{errors.email}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-black/70">Phone</label>
                    <input
                      value={values.phone}
                      onChange={(e) => onChange("phone", e.target.value)}
                      className={`${inputBase} ${errors.phone ? errBorder : okBorder}`}
                      placeholder="+63 9xx xxx xxxx"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    {errors.phone ? (
                      <p className="text-xs text-red-600">{errors.phone}</p>
                    ) : null}
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-black/70">Message</label>
                    <textarea
                      value={values.message}
                      onChange={(e) => onChange("message", e.target.value)}
                      className={`min-h-[150px] w-full rounded-2xl bg-white/90 border px-4 py-3 text-[15px] outline-none transition focus:border-[rgba(45,67,53,0.35)] focus:ring-2 focus:ring-[rgba(245,120,80,0.14)] ${
                        errors.message ? errBorder : okBorder
                      }`}
                      placeholder="Example: Feb 10–12, 2 guests, preferred room type..."
                    />
                    {errors.message ? (
                      <p className="text-xs text-red-600">{errors.message}</p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="
                      inline-flex w-full items-center justify-center
                      rounded-2xl
                      bg-[rgb(var(--forest,45,67,53))]
                      px-5 py-3 text-sm font-medium text-white
                      shadow-[0_12px_28px_rgba(0,0,0,0.14)]
                      transition hover:brightness-95
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15
                    "
                  >
                    Send Message
                  </button>

                  {submitted ? (
                    <div className="rounded-2xl border border-[rgba(45,67,53,0.18)] bg-[rgba(45,67,53,0.06)] p-4 text-sm text-black/70">
                      ✅ Message ready to send! (Demo only — connect to backend
                      or email next.)
                    </div>
                  ) : null}

                  {hasErrors ? (
                    <p className="text-xs text-black/50">
                      Please fix the highlighted fields.
                    </p>
                  ) : null}
                </form>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
