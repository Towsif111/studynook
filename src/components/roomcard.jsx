import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


const RoomCard = ({room}) => {
    const {_id, imageUrl, price, roomName} = room;

    return (
        <div className="overflow-hidden rounded-lg border border-white/10 bg-white text-black shadow">
            <Image
            alt={roomName}
            src={imageUrl}
            height={200}
            width={200}
            className="h-64 w-full object-cover"
            />

            <div className="p-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{roomName}</h2>
                    <h3 className="text-right font-semibold">{price}</h3>
                </div>
                      <Link href={`/rooms/${_id}`}>
                          <Button className={"rounded-none"}>View Details</Button>
                      </Link>
            </div>
           


        </div>
    );
};

export default RoomCard;