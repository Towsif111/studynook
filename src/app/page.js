import HomeFeaturedRooms from "@/components/HomeFeaturedRooms";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* ───── Hero Section ───── */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[140px]"></div>
          <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-lime-200/10 blur-[140px]"></div>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-lime-200">
              For students &amp; library users
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-neutral-100 sm:text-5xl lg:text-6xl">
                Find Your Perfect
                <span className="block font-[cursive] text-lime-200">
                  Study Room
                </span>
              </h1>
              <p className="max-w-xl text-base text-neutral-400 sm:text-lg">
                Browse and book quiet, private study rooms in your library. List your
                own room and earn — all in one seamless platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 rounded-xl bg-lime-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
              >
                Explore Rooms
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/add-room"
                className="inline-flex items-center rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white"
              >
                List Your Room
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "2,400+", label: "Study Sessions Booked" },
                { value: "120+", label: "Registered Rooms" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "40+", label: "Partner Libraries" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                >
                  <div className="text-2xl font-semibold text-lime-200">{stat.value}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-wide text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="absolute -inset-6 rounded-[32px] bg-lime-200/10 blur-3xl" />
            <div className="relative h-[520px] overflow-hidden rounded-[32px] border border-neutral-800 bg-neutral-900/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <Image
                src="/assests/books.jpg"
                alt="Stack of books"
                width={960}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───── Divider ───── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      {/* ───── Featured Rooms ───── */}
      <HomeFeaturedRooms />

      {/* ───── Divider ───── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      {/* ───── How It Works ───── */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-emerald-400/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-lime-200">
              Simple Process
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-neutral-400">
              Get started in minutes with three easy steps.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                icon: "🔍",
                title: "Browse Rooms",
                desc: "Explore available study spaces filtered by floor, capacity, amenities, and price.",
              },
              {
                step: "02",
                icon: "📅",
                title: "Book Your Spot",
                desc: "Pick a date and time slot that works for you. Instant confirmation with no wait.",
              },
              {
                step: "03",
                icon: "🏠",
                title: "List & Earn",
                desc: "Have a study room? List it on Studynook and start earning from your space.",
              },
              {
                step: "04",
                icon: "⭐",
                title: "Study & Review",
                desc: "Enjoy your quiet session and help the community with feedback and ratings.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div
                key={step}
                className="group relative rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:border-neutral-700"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-lime-300/10 text-2xl">
                    {icon}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-600">
                    Step {step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      <section className="relative overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-lime-200/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-lime-200">
              Why Us
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Why Choose Studynook
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-neutral-400">
              Everything you need for a productive study experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🔇",
                title: "Quiet Environments",
                desc: "All listed rooms are verified quiet zones, ensuring you get the focus you deserve.",
              },
              {
                icon: "⚡",
                title: "Instant Booking",
                desc: "No approval needed. Book a room in seconds and get an immediate confirmation.",
              },
              {
                icon: "🛡️",
                title: "Secure & Reliable",
                desc: "All transactions and bookings are protected. Your data stays private and safe.",
              },
              {
                icon: "💰",
                title: "Best Rates",
                desc: "Competitive hourly rates with no hidden fees. What you see is what you pay.",
              },
              {
                icon: "📱",
                title: "Easy Management",
                desc: "Manage your bookings, listings, and preferences from a single dashboard.",
              },
              {
                icon: "🌍",
                title: "Growing Network",
                desc: "Join a community of 40+ partner libraries and thousands of daily users.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:border-neutral-700"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-lime-300/10 text-xl">
                  {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-xl bg-lime-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
            >
              Get Started Now
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
