"use client";

import { useState } from "react";

const amenities = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
];

const AddRoomPage = () => {
    const [selectedAmenities, setSelectedAmenities] = useState(new Set());

    const toggleAmenity = (amenity) => {
        setSelectedAmenities((prev) => {
            const next = new Set(prev);
            if (next.has(amenity)) {
                next.delete(amenity);
            } else {
                next.add(amenity);
            }
            return next;
        });
    };

  const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const destination = Object.fromEntries(formData.entries());
        const room = {
            ...destination,
            amenities: Array.from(selectedAmenities)
        };

        console.log(room);

        const res = await fetch('http://localhost:5000/room', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(room)
        })

        const data = await res.json()

        console.log(data)

  } 


    return (
        <div className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
            <div className="mx-auto w-full max-w-3xl">
                <header className="mb-8">
                    <h1 className="text-4xl font-semibold tracking-tight">List Your Room</h1>
                    <p className="mt-2 text-sm text-neutral-400">
                        Fill in the details to make your study space available to others.
                    </p>
                </header>

                <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-8 shadow-2xl shadow-black/30">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-200">Room Name</label>
                            <input
                                name="roomName"
                                type="text"
                                placeholder="add your room.."
                                className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-200">Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="Describe the room..."
                                className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-200">Image URL</label>
                            <input
                                name="imageUrl"
                                type="url"
                                placeholder="https://images.unsplash.com/..."
                                className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-200">Floor</label>
                                <input
                                    name="floor"
                                    type="text"
                                    placeholder="3rd"
                                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-200">Capacity</label>
                                <input
                                    name="capacity"
                                    type="number"
                                    placeholder="4"
                                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-200">Hourly Rate ($)</label>
                                <input
                                    name="hourlyRate"
                                    type="number"
                                    placeholder="8"
                                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-neutral-200">Amenities</label>
                            <div className="grid grid-cols-3 gap-3">
                                {amenities.map((amenity) => {
                                    const isSelected = selectedAmenities.has(amenity);
                                    return (
                                        <button
                                            key={amenity}
                                            type="button"
                                            onClick={() => toggleAmenity(amenity)}
                                            className={`rounded-full border px-4 py-2 text-xs transition ${isSelected ? "border-lime-300 bg-lime-300/20 text-lime-200" : "border-neutral-800 bg-neutral-900/70 text-neutral-200 hover:border-lime-300 hover:text-lime-200"}`}
                                        >
                                            {amenity}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                            <button
                                type="button"
                                className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-600 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 rounded-2xl bg-lime-300 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-lime-200"
                            >
                                Add Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRoomPage;