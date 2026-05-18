
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_45%)]">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[140px]"></div>
          <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-lime-200/10 blur-[140px]"></div>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-12">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-lime-200">
              For students & library users
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
                href="/register"
                className="inline-flex items-center rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { value: "2,400+", label: "Study Sessions Booked" },
              { value: "120+", label: "Registered Rooms" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "40+", label: "Partner Libraries" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <div className="text-3xl font-semibold text-lime-200">{stat.value}</div>
                <div className="mt-2 text-xs uppercase tracking-wide text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
