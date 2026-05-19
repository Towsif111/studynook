import Image from "next/image";

const RoomCard = ({room}) => {
    const {imageUrl, price, roomName, capacity, floor} = room
    return (
        <div className="p-2">
            <Image
            alt={roomName}
            src={imageUrl}
            height={200}
            width={200}
            className="h-64 w-full object-cover"
            />

            <div>
                <div className="flex items-center">
                <h2 className="text-xl font-bold">{roomName}</h2>
                </div>
            </div>
                <div>
                    <h3>{price}</h3>
                </div>


        </div>
    );
};

export default RoomCard;