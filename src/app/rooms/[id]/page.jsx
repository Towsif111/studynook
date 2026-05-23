import BookingCard from "@/components/Booking";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })


  let room = null;
  try {
    const res = await fetch(`http://localhost:5000/room/${id}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch room");
    }

    room = await res.json();
    

  } catch (err) {
    console.error("Failed to fetch room details:", err);
  }

  if (!room) {
    
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-neutral-900 text-4xl">
            🏠
          </div>
          <h1 className="text-2xl font-bold text-white">Room not found</h1>
          <p className="mt-2 text-neutral-400">
            This room may have been deleted or doesn't exist.
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
    amenities,
  } = room;

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
                  </div>
                  <p className="text-sm text-neutral-400">{category || "Library Study Room"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-400">Price</p>
                  <p className="text-3xl font-bold text-lime-200">{price}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-5">
                <p className="text-[10px] font-medium uppercase tracking-wider text-red-500">Floor</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{floor || "—"}</p>
              </div>
              <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-5">
                <p className="text-[10px] font-medium uppercase  text-red-500">Category</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{category || "—"}</p>
              </div>
              <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-5">
                
                <p className="text-[10px] font-medium uppercase tracking-wider text-red-500">Capacity</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{capacity ? `${capacity} People` : "—"}</p>
              </div>
            </div>

            {amenities && amenities.length > 0 && (
              <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-lime-300/40 to-transparent" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-200">
                    Amenities
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-lime-300/40 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center rounded-full border border-lime-300/20 bg-lime-300/10 px-3.5 py-1.5 text-xs font-medium text-lime-200"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

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