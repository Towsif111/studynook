
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_45%)]">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[140px]"></div>
          <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-lime-200/10 blur-[140px]"></div>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
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
    </main>
  );
}
