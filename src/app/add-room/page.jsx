const amenities = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
];

const AddRoomPage = () => {
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
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-200">Room Name</label>
                            <span className="block text-lime-300">*</span>
                            <input
                                type="text"
                                placeholder="e.g. The Meridian Suite"
                                className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-200">Description</label>
                            <span className="block text-lime-300">*</span>
                            <textarea
                                rows={4}
                                placeholder="Describe the room, its vibe, and what makes it unique..."
                                className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-200">Image URL</label>
                            <span className="block text-lime-300">*</span>
                            <input
                                type="url"
                                placeholder="https://images.unsplash.com/..."
                                className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-200">Floor</label>
                                <span className="block text-lime-300">*</span>
                                <input
                                    type="text"
                                    placeholder="e.g. 3rd Floor"
                                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-200">Capacity</label>
                                <span className="block text-lime-300">*</span>
                                <input
                                    type="number"
                                    placeholder="e.g. 4"
                                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-200">Hourly Rate ($)</label>
                                <span className="block text-lime-300">*</span>
                                <input
                                    type="number"
                                    placeholder="e.g. 8"
                                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-neutral-200">Amenities</label>
                            <div className="flex flex-wrap gap-3">
                                {amenities.map((amenity) => (
                                    <button
                                        key={amenity}
                                        type="button"
                                        className="rounded-full border border-neutral-800 bg-neutral-900/70 px-4 py-2 text-xs text-neutral-200 transition hover:border-lime-300 hover:text-lime-200"
                                    >
                                        {amenity}
                                    </button>
                                ))}
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
