"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyListingPage = ({ userId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`/api/rooms?userId=${userId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setRooms(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRooms();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="mt-16 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-lime-300 border-t-transparent" />
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="mt-16 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-neutral-900 text-3xl">
          🏠
        </div>
        <p className="text-neutral-400">You haven't listed any rooms yet.</p>
        <Link
          href="/add-room"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-lime-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
        >
          <span aria-hidden="true">+</span> Add Your First Room
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="group overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/60 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:border-neutral-700"
        >
          <Link href={`/rooms/${room._id}`}>
            <div className="relative h-52 w-full overflow-hidden">
              {room.imageUrl ? (
                <Image
                  alt={room.roomName || "Study Room"}
                  src={room.imageUrl}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-5xl">
                  📚
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            </div>
          </Link>

          <div className="space-y-3 p-4">
            <Link href={`/rooms/${room._id}`}>
              <h2 className="truncate text-lg font-bold text-white transition hover:text-lime-200">
                {room.roomName || "Study Room"}
              </h2>
            </Link>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400">
              {room.floor && (
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">🏢</span>
                  Floor {room.floor}
                </span>
              )}
              {room.capacity > 0 && (
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">👥</span>
                  Up to {room.capacity}
                </span>
              )}
              {room.amenities && room.amenities.length > 0 && (
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">🏷️</span>
                  {room.amenities.slice(0, 2).join(", ")}
                  {room.amenities.length > 2 && " +more"}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {room.amenities?.slice(0, 4).map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full border border-neutral-800 bg-neutral-900/70 px-2.5 py-0.5 text-[10px] text-neutral-400"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-neutral-800/50 pt-3">
              <p className="text-sm text-neutral-400">
                <span className="text-2xl font-bold text-lime-200">
                  {room.hourlyRate ? `$${room.hourlyRate}` : room.price || "—"}
                </span>
                {room.hourlyRate && <span className="text-xs text-neutral-500">/hr</span>}
              </p>
              <Link
                href={`/rooms/${room._id}`}
                className="rounded-xl border border-neutral-700/60 px-5 py-2 text-xs font-medium text-neutral-300 transition hover:border-lime-300/40 hover:text-lime-200"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyListingPage;
