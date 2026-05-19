import Image from "next/image";

const RoomDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch('http://localhost:5000/room/${id}')
    const rooms = await res.json()

     const {imageUrl, price, roomName} = room;

    return (
        <div>
           <div>
            <Image alt={roomName} src={imageUrl} height={400} width={400}></Image>
            
           </div>
        </div>
    );
};

export default RoomDetailsPage;