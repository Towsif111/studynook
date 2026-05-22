import BookingCard from "@/components/Booking";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import Link from "next/link";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/room/${id}`);
  const room = await res.json();

  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-neutral-900 text-4xl">
            🏠
          </div>
          <h1 className="text-2xl font-bold text-white">Room not found</h1>
          <p className="mt-2 text-neutral-400">
            This room may have been deleted or doesn&apos;t exist.
          </p>
          <Link
            href="/rooms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-lime-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
          >
            <span aria-hidden="true">&larr;</span> Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const {
    imageUrl,
    price,
    roomName,
    description,
    floor,
    category,
    capacity,
    availability,
  } = room;

  const isAvailable = availability === "available" || availability === true;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-400">
          <Link href="/rooms" className="transition hover:text-white">
            Rooms
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-200">{roomName}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-neutral-800/60 shadow-2xl shadow-black/30">
              <div className="relative aspect-[4/3] w-full sm:aspect-square">
                <Image
                  alt={roomName}
                  src={imageUrl}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/60 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {roomName}
                    </h1>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        isAvailable
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-red-500/15 text-red-300"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isAvailable ? "bg-emerald-400" : "bg-red-400"
                        }`}
                      />
                      {isAvailable ? "Available" : "Booked"}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400">{category || "Library Study Room"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-400">Price</p>
                  <p className="text-3xl font-bold text-lime-200">{price}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-sm transition hover:border-neutral-700">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-lime-300/10 text-lg">
                  <span aria-hidden="true">🏢</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Floor</p>
                <p className="mt-1 text-lg font-semibold text-white">{floor || "—"}</p>
              </div>
              <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-sm transition hover:border-neutral-700">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-lime-300/10 text-lg">
                  <span aria-hidden="true">📂</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Category</p>
                <p className="mt-1 text-lg font-semibold text-white">{category || "—"}</p>
              </div>
              <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-sm transition hover:border-neutral-700">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-lime-300/10 text-lg">
                  <span aria-hidden="true">👥</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Capacity</p>
                <p className="mt-1 text-lg font-semibold text-white">{capacity ? `${capacity} People` : "—"}</p>
              </div>
              <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-sm transition hover:border-neutral-700">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-lime-300/10 text-lg">
                  <span aria-hidden="true">📅</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Availability</p>
                <p className="mt-1 text-lg font-semibold text-white">{isAvailable ? "Available" : "Booked"}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-lime-300/40 to-transparent" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-200">
                  Overview
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-lime-300/40 to-transparent" />
              </div>
              <p className="leading-relaxed text-neutral-300">
                {description || "No description provided for this room."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <BookingCard room={room} />
              <EditModal room={room} />
              <DeleteAlert room={room} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;