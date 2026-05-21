"use client"

import React from "react";
import {Button, Modal, Surface} from "@heroui/react";
import { BiEdit } from "react-icons/bi";

export function EditModal ({room}) {   
  const {_id ,imageUrl, price, roomName, description, floor, category, capacity, availability } = room ?? {};
  const amenities = [
    "Whiteboard",
    "Projector",
    "Air Conditioner",
    "Charging Points",
    "Wi-Fi",
    "Ergonomic Chair",
    "Library",
  ];

  const [selectedAmenities, setSelectedAmenities] = React.useState(new Set());

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(amenity)) next.delete(amenity);
      else next.add(amenity);
      return next;
    });
  };

     const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const room = Object.fromEntries(formData.entries());

        room.amenities = Array.from(selectedAmenities);

        console.log(room);

        const res = await fetch(`http://localhost:5000/room/${_id}`, {
             method: 'PATCH',
             headers: {
                 'content-type': 'application/json'
             },
             body: JSON.stringify(room)
         })

         const data = await res.json()

         console.log(data)

  } ;


  return (
    <Modal>
      <div className="flex justify-end">
            <Button className={'rounded-xl mt-5 mb-3'}><BiEdit/>Edit</Button>
        </div>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-[95vw] max-w-5xl sm:max-w-5xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Room</Modal.Heading>
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">

                <div className="bg-neutral-950 px-4 py-6 text-white">
            <div className="mx-auto w-full max-w-3xl">
                <header className="mb-8">
                    <h1 className="text-4xl font-semibold tracking-tight">List Your Room</h1>
                    <p className="mt-2 text-sm text-neutral-400">
                        Fill in the details to make your study space available to others.
                    </p>
                </header>

                <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-8 shadow-2xl shadow-black/30">
                <form id="editRoomForm" className="space-y-6" onSubmit={onSubmit}>
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
                                placeholder="https://images.com/..."
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
                        <Modal.Footer>
<Button type="submit" slot="close">Save</Button>
                                </Modal.Footer>
                    </form>
                </div>
            </div>
        </div>
                
              </Surface>
            </Modal.Body>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}