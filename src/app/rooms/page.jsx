import RoomCard from "@/components/roomcard";

const RoomsPage = async () => {
    const res = await fetch("http://localhost:5000/room", {
        cache: "no-store",
    });
    const rooms = await res.json();
    const roomList = Array.isArray(rooms) ? rooms : [];

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold">All Study Rooms</h1>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {roomList.map((room) => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>
        </div>
    );
};

export default RoomsPage;