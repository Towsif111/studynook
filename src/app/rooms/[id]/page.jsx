import { EditModal } from "@/components/EditModal";
import { Button } from "@heroui/react";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";


const RoomDetailsPage = async({params}) => {
    const {id} = await params

    const res = await fetch(`http://localhost:5000/room/${id}`)
    const room = await res.json()

    const {imageUrl, price, roomName, description, floor, category, capacity, availability } = room;
    
    return (
        <div>
           <div className="max-w-7xl mx-auto">
            <Image alt={roomName} src={imageUrl} height={700} width={700}></Image>

             <div className="p-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{roomName}</h2>
                    <h3 className="text-right font-semibold">{price}</h3>
                </div>
    
            </div>
            <p>{floor}</p>
            <p>{category}</p>
            <p>{capacity}</p>
            <p>{availability}</p>
            <h1 className="text-xl font-bold mt-10">OverView</h1>
            <p>{description}</p>

            
        </div>
        
        <EditModal room={room}/>

        </div>
    );
};

export default RoomDetailsPage;

