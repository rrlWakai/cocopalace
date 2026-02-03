import logo from "../assets/images/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white">
      {/* subtle brand line */}
      <div className="h-1 w-full bg-[linear-gradient(to_right,rgb(var(--forest,45,67,53)),rgb(var(--coral,245,120,80)),rgb(var(--forest,45,67,53)))]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
                <img
                  src={logo}
                  alt="Coco Palace Hotel"
                  className="h-9 w-9 object-contain"
                  loading="lazy"
                />
              </span>

              <div className="leading-none">
                <p className="text-sm font-semibold tracking-wide text-[rgb(var(--forest,45,67,53))]">
                  Coco Palace
                </p>
                <p className="mt-1 text-[11px] tracking-[0.22em] text-black/45">
                  HOTEL
                </p>
              </div>
            </a>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-black/65">
              A clean, comfortable stay in San Pablo City—paired with warm
              hospitality and a calm atmosphere.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/2 px-4 py-2 text-xs text-black/60">
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--coral,245,120,80))]" />
              Concept redevelopment • Portfolio project
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold text-[rgb(var(--forest,45,67,53))]">
              Quick Links
            </p>

            <ul className="mt-4 space-y-2 text-sm">
              {[
                { label: "About", href: "#about" },
                { label: "Rooms", href: "#rooms" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
                { label: "Location", href: "#location" },
              ].map((x) => (
                <li key={x.href}>
                  <a
                    href={x.href}
                    className="
                      inline-flex items-center gap-2
                      text-black/65 transition
                      hover:text-[rgb(var(--forest,45,67,53))]
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                    {x.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-[rgb(var(--forest,45,67,53))]">
              Contact
            </p>

            <div className="mt-4 space-y-3 text-sm text-black/65">
              <p>
                <span className="text-black/45">Address:</span> Km 83. Maharlika
                Highway, San Francisco, Calihan, San Pablo City, Laguna 4000
              </p>

              <p>
                <span className="text-black/45">Phone:</span>{" "}
                <a
                  href="tel:+63495363238"
                  className="font-medium text-[rgb(var(--forest,45,67,53))] hover:underline"
                >
                  +63 49 536 3238
                </a>
              </p>

              <p>
                <span className="text-black/45">Email:</span>{" "}
                <a
                  href="mailto:info@thecocopalacehotel.com.ph"
                  className="font-medium text-[rgb(var(--forest,45,67,53))] hover:underline"
                >
                  info@thecocopalacehotel.com.ph
                </a>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
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
                Inquire
              </a>

              <a
                href="tel:+63495363238"
                className="
                  inline-flex items-center justify-center
                  rounded-2xl
                  border border-black/10 bg-white
                  px-5 py-3
                  text-sm font-medium
                  text-[rgb(var(--forest,45,67,53))]
                  shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                  transition hover:bg-black/3
                "
              >
                Call
              </a>

              <a
                href="https://www.facebook.com/thecocopalacehotel"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-2xl
                  border border-black/10 bg-white
                  px-5 py-3
                  text-sm font-medium
                  text-[rgb(var(--forest,45,67,53))]
                  shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                  transition hover:bg-black/3
                "
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-black/10 py-6 text-xs text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year}{" "}
            <span className="text-[rgb(var(--forest,45,67,53))]">
              Coco Palace Hotel
            </span>{" "}
            — concept redesign & redevelopment.
          </p>

          <p className="text-black/45">
            Built with React • TypeScript • Tailwind v4 • Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
