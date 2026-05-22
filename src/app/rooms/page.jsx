import RoomCard from "@/components/roomcard";

const RoomsPage = async () => {
    const res = await fetch("http://localhost:5000/room", {
        cache: "no-store",
    });
    const externalRooms = await res.json();
    const externalList = Array.isArray(externalRooms) ? externalRooms : [];

    let localList = [];
    try {
        const localRes = await fetch("/api/rooms", {
            cache: "no-store",
        });
        if (localRes.ok) {
            const localData = await localRes.json();
            localList = Array.isArray(localData) ? localData : [];
        }
    } catch (err) {
        console.error("Failed to fetch local rooms:", err);
    }

    const roomMap = new Map();
    externalList.forEach((r) => roomMap.set(r._id, r));
    localList.forEach((r) => roomMap.set(r._id, r));
    const roomList = Array.from(roomMap.values());

    return (
        <div className="min-h-screen bg-neutral-950 p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    All Study Rooms
                </h1>
                <p className="mt-2 text-neutral-400">
                    Browse and book available study spaces.
                </p>

                {roomList.length === 0 ? (
                    <div className="mt-16 text-center">
                        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-neutral-900 text-3xl">
                            🏠
                        </div>
                        <p className="text-neutral-400">No rooms available at the moment.</p>
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {roomList.map((room) => (
                            <RoomCard key={room._id} room={room} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomsPage;