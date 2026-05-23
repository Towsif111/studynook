"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MAX_AMENITIES_SHOWN = 3;

const AmenityChip = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-lime-300/20 bg-lime-300/10 px-2.5 py-0.5 text-[10px] font-medium text-lime-200">
    {label}
  </span>
);

const HomeFeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
    
        const localRes = await fetch("/api/rooms?limit=6", { cache: "no-store" });
        if (localRes.ok) {
          const localData = await localRes.json();
          if (Array.isArray(localData) && localData.length > 0) {
            setRooms(localData);
            setLoading(false);
            return;
          }
        }
      } catch {
       
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`, { cache: "no-store" });
        const data = await res.json();
        const list = Array.isArray(data) ? data.slice(0, 6) : [];
        setRooms(list);
      } catch {
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <section className="bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-neutral-800" />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[28rem] animate-pulse rounded-2xl border border-neutral-800/60 bg-neutral-900/60"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (rooms.length === 0) return null;

  return (
    <section
      className="bg-neutral-950 bg-cover bg-center px-6 py-20"
      style={{ backgroundImage: "url('/assets/layered-waves-haikei.png')" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-lime-200">
            Featured Spaces
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Available Study Rooms
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-400">
            Handpicked quiet spaces ready for you to book right now.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => {
            const desc = room.description || "";
            const truncatedDesc = desc.length > 100 ? desc.slice(0, 100) + "…" : desc;

            const shownAmenities = (room.amenities || []).slice(0, MAX_AMENITIES_SHOWN);
            const extraCount = (room.amenities || []).length - MAX_AMENITIES_SHOWN;

            return (
              <div
                key={room._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/60 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:border-neutral-700"
              >
                <Link href={`/rooms/${room._id}`} className="block">
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      alt={room.roomName}
                      src={room.imageUrl}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                    {room.hourlyRate && (
                      <div className="absolute right-3 top-3 rounded-xl bg-lime-200/90 px-3 py-1 text-xs font-bold text-neutral-900 shadow-lg backdrop-blur-sm">
                        ${room.hourlyRate}/hr
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col space-y-3 p-4">
                  <Link href={`/rooms/${room._id}`}>
                    <h3 className="truncate text-lg font-bold text-white transition hover:text-lime-200">
                      {room.roomName}
                    </h3>
                  </Link>

                  {truncatedDesc && (
                    <p className="text-xs leading-relaxed text-neutral-400">
                      {truncatedDesc}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-400">
                    {room.floor && (
                      <span className="flex items-center gap-1">
                        <span className="text-[11px]" aria-hidden="true">🏢</span>
                        Floor {room.floor}
                      </span>
                    )}
                    {room.capacity && (
                      <span className="flex items-center gap-1">
                        <span className="text-[11px]" aria-hidden="true">👥</span>
                        {room.capacity} {room.capacity === 1 ? "person" : "people"}
                      </span>
                    )}
                  </div>

                  {shownAmenities.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {shownAmenities.map((amenity) => (
                        <AmenityChip key={amenity} label={amenity} />
                      ))}
                      {extraCount > 0 && (
                        <span className="text-[10px] text-neutral-500">
                          +{extraCount} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between border-t border-neutral-800/50 pt-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                        From
                      </p>
                      <p className="text-lg font-bold text-lime-200">
                        {room.price || `$${room.hourlyRate}/hr`}
                      </p>
                    </div>
                    <Link
                      href={`/rooms/${room._id}`}
                      className="rounded-xl border border-neutral-700/60 px-5 py-2 text-xs font-medium text-neutral-300 transition hover:border-lime-300/40 hover:text-lime-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white"
          >
            View All Rooms
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedRooms;
