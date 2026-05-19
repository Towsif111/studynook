import RoomCard from "@/components/roomcard";

const RoomsPage = async () => {
    const res = await fetch('http://localhost:5000/room')
    const rooms = await res.json()

    return (
        <div>
            <h1>All Study Rooms</h1>

            <div className="grid grid-cols-3 gap-5">
                {rooms.map((room) => (
                    <RoomCard key={room._id} room={room}/> 
                ))}

            </div>
        </div>
    );
};

export default RoomsPage;