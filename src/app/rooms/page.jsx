"use client";

import RoomCard from "@/components/roomcard";
import { useEffect, useState, useCallback, useRef } from "react";

const ALL_AMENITIES = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
  "Charging Points",
  "Ergonomic Chair",
  "Library",
];

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState(new Set());
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [floor, setFloor] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  
  const debounceRef = useRef(null);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(amenity)) next.delete(amenity);
      else next.add(amenity);
      return next;
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedAmenities(new Set());
    setMinRate("");
    setMaxRate("");
    setFloor("");
  };

  const hasActiveFilters =
    search || selectedAmenities.size > 0 || minRate || maxRate || floor;


  const fetchRooms = useCallback(async () => {
    setLoading(true);

    try {
      
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedAmenities.size > 0)
        params.set("amenities", Array.from(selectedAmenities).join(","));
      if (minRate) params.set("minRate", minRate);
      if (maxRate) params.set("maxRate", maxRate);
      if (floor) params.set("floor", floor);

      const queryString = params.toString();

      
      let localList = [];
      try {
        const localRes = await fetch(`/api/rooms${queryString ? `?${queryString}` : ""}`, {
          cache: "no-store",
        });
        if (localRes.ok) {
          const localData = await localRes.json();
          localList = Array.isArray(localData) ? localData : [];
        }
      } catch (err) {
        console.error("Failed to fetch local rooms:", err);
      }

      
      let externalList = [];
      try {
        const res = await fetch("http://localhost:5000/room", {
          cache: "no-store",
        });
        const externalRooms = await res.json();
        externalList = Array.isArray(externalRooms) ? externalRooms : [];
      } catch (err) {
        console.error("Failed to fetch external rooms:", err);
      }

     
      const filterExternal = (room) => {
        const searchLower = search.toLowerCase();
        if (search && !room.roomName?.toLowerCase().includes(searchLower)) {
          return false;
        }
        if (selectedAmenities.size > 0) {
          const roomAmenities = (room.amenities || []).map((a) => a.toLowerCase());
          const hasMatch = Array.from(selectedAmenities).some((a) =>
            roomAmenities.includes(a.toLowerCase())
          );
          if (!hasMatch) return false;
        }
        if (minRate || maxRate) {
          const rate = Number(room.hourlyRate) || 0;
          if (minRate && rate < Number(minRate)) return false;
          if (maxRate && rate > Number(maxRate)) return false;
        }
        if (floor) {
          const floorStr = (room.floor || "").toLowerCase();
          if (!floorStr.includes(floor.toLowerCase())) return false;
        }
        return true;
      };

      const filteredExternal = search || selectedAmenities.size > 0 || minRate || maxRate || floor
        ? externalList.filter(filterExternal)
        : externalList;

      
      const roomMap = new Map();
      localList.forEach((r) => roomMap.set(r._id, r));
      filteredExternal.forEach((r) => {
        if (!roomMap.has(r._id)) roomMap.set(r._id, r);
      });

      setRooms(Array.from(roomMap.values()));
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedAmenities, minRate, maxRate, floor]);

 
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchRooms();
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedAmenities, minRate, maxRate, floor]);

  const activeAmenityCount = selectedAmenities.size;

  return (
    <div className="min-h-screen bg-neutral-950 p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              All Study Rooms
            </h1>
            <p className="mt-2 text-neutral-400">
              Browse and book available study spaces.
            </p>
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`inline-flex items-center gap-2 self-start rounded-xl border px-4 py-2.5 text-sm font-medium transition sm:self-auto ${
              showFilters || hasActiveFilters
                ? "border-lime-300/40 bg-lime-300/10 text-lime-200"
                : "border-neutral-700/60 text-neutral-300 hover:border-neutral-600 hover:text-white"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-300 text-[10px] font-bold text-neutral-900">
                {activeAmenityCount + (search ? 1 : 0) + (minRate || maxRate ? 1 : 0) + (floor ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        
        {showFilters && (
          <div className="mt-6 rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-5 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
            
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by room name..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950/70 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-lime-300/50"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_AMENITIES.map((amenity) => {
                    const isSelected = selectedAmenities.has(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition ${
                          isSelected
                            ? "border-lime-300 bg-lime-300/15 text-lime-200"
                            : "border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
                        }`}
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

             
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Hourly Rate ($)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={minRate}
                    onChange={(e) => setMinRate(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-lime-300/50"
                  />
                  <span className="text-neutral-500">—</span>
                  <input
                    type="number"
                    min="0"
                    value={maxRate}
                    onChange={(e) => setMaxRate(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-lime-300/50"
                  />
                </div>
              </div>

         
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Floor
                </label>
                <input
                  type="text"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  placeholder="e.g. 2nd, Ground"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-lime-300/50"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex justify-end border-t border-neutral-800/40 pt-4">
                <button
                  onClick={clearFilters}
                  className="rounded-xl border border-neutral-700/60 px-4 py-2 text-xs font-medium text-neutral-400 transition hover:border-neutral-500 hover:text-white"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        
        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/60"
              >
                <div className="h-52 w-full bg-neutral-800" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 rounded-lg bg-neutral-800" />
                  <div className="h-3 w-1/2 rounded-lg bg-neutral-800" />
                  <div className="flex gap-2">
                    <div className="h-3 w-16 rounded-lg bg-neutral-800" />
                    <div className="h-3 w-16 rounded-lg bg-neutral-800" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-8 w-20 rounded-lg bg-neutral-800" />
                    <div className="h-8 w-24 rounded-xl bg-neutral-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-neutral-900 text-3xl">
              🔍
            </div>
            <p className="text-neutral-400">
              {hasActiveFilters
                ? "No rooms match your filters. Try adjusting your search criteria."
                : "No rooms available at the moment."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-lime-200 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <p className="mt-6 text-center text-xs text-neutral-600">
            Showing {rooms.length} room{rooms.length !== 1 ? "s" : ""}
            {hasActiveFilters && " matching your filters"}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;