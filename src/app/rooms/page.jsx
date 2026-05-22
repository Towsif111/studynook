import RoomCard from "@/components/roomcard";

const RoomsPage = async () => {
    const res = await fetch("http://localhost:5000/room", {
        cache: "no-store",
    });
    const rooms = await res.json();
    const roomList = Array.isArray(rooms) ? rooms : [];

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