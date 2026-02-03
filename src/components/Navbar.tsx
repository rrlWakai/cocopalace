import { useEffect, useMemo, useState } from "react";
import logo from "../assets/images/logo.png";

type NavItem = { label: string; href: `#${string}`; id: string };

export default function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "#home", id: "home" },
      { label: "About", href: "#about", id: "about" },
      { label: "Rooms", href: "#rooms", id: "rooms" },
      { label: "Reviews", href: "#reviews", id: "reviews" },
      { label: "Contact", href: "#contact", id: "contact" },
      { label: "Location", href: "#location", id: "location" },
    ],
    [],
  );

  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  // Active section observer
  useEffect(() => {
    const sections = items
      .map((x) => document.getElementById(x.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        threshold: [0.18, 0.3, 0.45, 0.6],
        rootMargin: "-18% 0px -70% 0px",
      },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  // Close menu on desktop resize
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ESC closes + lock scroll when open
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function goTo(href: string) {
    setOpen(false);

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback
      window.location.hash = href;
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[rgb(var(--bg))]/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <button
          onClick={() => goTo("#home")}
          className="flex items-center gap-3"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
            <img
              src={logo}
              alt="Coco Palace Hotel"
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
          </span>

          <div className="leading-none text-left">
            <p className="text-sm font-semibold tracking-wide text-[rgb(var(--forest,45,67,53))]">
              Coco Palace
            </p>
            <p className="mt-1 text-[11px] tracking-[0.22em] text-black/45">
              HOTEL
            </p>
          </div>
        </button>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => goTo(item.href)}
                className={[
                  "group relative rounded-xl px-3 py-2 text-sm transition",
                  isActive
                    ? "text-[rgb(var(--forest,45,67,53))]"
                    : "text-black/65 hover:text-[rgb(var(--forest,45,67,53))]",
                ].join(" ")}
              >
                {/* underline highlight */}
                <span
                  className={[
                    "pointer-events-none absolute inset-x-2 bottom-1 h-0.5 rounded-full transition-all duration-300",
                    isActive
                      ? "w-[calc(100%-16px)] bg-[rgb(var(--coral,245,120,80))] opacity-100"
                      : "w-0 bg-[rgb(var(--coral,245,120,80))] opacity-0 group-hover:w-[calc(100%-16px)] group-hover:opacity-100",
                  ].join(" ")}
                />

                {/* subtle pill background */}
                <span
                  className={[
                    "pointer-events-none absolute inset-0 rounded-xl transition",
                    isActive ? "bg-black/3" : "group-hover:bg-black/2",
                  ].join(" ")}
                />

                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions + Mobile button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo("#contact")}
            className="hidden rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-[rgb(var(--forest,45,67,53))] shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition hover:bg-black/3 sm:inline-flex"
          >
            Inquire
          </button>

          <button
            onClick={() => goTo("#rooms")}
            className="hidden rounded-xl bg-[rgb(var(--coral,245,120,80))] px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition hover:brightness-95 sm:inline-flex"
          >
            Book
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition hover:bg-black/3 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={[
                  "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-black/70 transition",
                  open ? "translate-y-[7px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-black/70 transition",
                  open ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-black/70 transition",
                  open ? "translate-y-[-7px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="md:hidden">
          {/* Backdrop */}
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          {/* Panel */}
          <div className="fixed left-0 right-0 top-16 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <div className="h-1 w-full bg-[rgb(var(--forest,45,67,53))]" />

              <div className="p-4">
                <nav className="grid gap-1">
                  {items.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => goTo(item.href)}
                        className={[
                          "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition",
                          isActive
                            ? "bg-black/3 text-[rgb(var(--forest,45,67,53))]"
                            : "text-black/70 hover:bg-black/3",
                        ].join(" ")}
                      >
                        <span className="font-medium">{item.label}</span>
                        <span
                          className={[
                            "h-2 w-2 rounded-full transition",
                            isActive
                              ? "bg-[rgb(var(--coral,245,120,80))]"
                              : "bg-black/20",
                          ].join(" ")}
                        />
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-3 grid gap-2">
                  <button
                    onClick={() => goTo("#contact")}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-[rgb(var(--forest,45,67,53))] shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition hover:bg-black/3"
                  >
                    Inquire
                  </button>
                  <button
                    onClick={() => goTo("#rooms")}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[rgb(var(--coral,245,120,80))] px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition hover:brightness-95"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
