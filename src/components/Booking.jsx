"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Modal } from "@heroui/react";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiCalendarCheck } from "react-icons/bi";

const TIME_SLOTS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const formatHour = (hour) => {
  const h = hour.toString().padStart(2, "0");
  return `${h}:00`;
};

const BookingCard = ({ room }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const hourlyRate = useMemo(() => {
    if (room?.hourlyRate) return Number(room.hourlyRate);
    if (room?.price) {
      const parsed = parseFloat(String(room.price).replace(/[^0-9.]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }, [room]);

  const start = Number(startTime);
  const end = Number(endTime);
  const hours = end > start ? end - start : 0;
  const totalCost = hours * hourlyRate;

  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  const endTimeSlots = useMemo(() => {
    if (!startTime) return [];
    const slots = [];
    for (let h = start + 1; h <= 21; h++) {
      slots.push(h);
    }
    return slots;
  }, [startTime, start]);

  const handleStartTimeChange = (e) => {
    const newStart = Number(e.target.value);
    setStartTime(e.target.value);
    if (Number(endTime) <= newStart) {
      setEndTime("");
    }
  };

  const openModal = () => {
    if (!user) {
      toast.error("Please sign in to book a room");
      return;
    }
    setError("");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDate("");
    setStartTime("");
    setEndTime("");
    setNote("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date || !startTime || !endTime) {
      setError("Please fill in all required fields.");
      return;
    }

    if (end - start < 1) {
      setError("Minimum booking duration is 1 hour.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room._id,
          imageUrl: room.imageUrl || "",
          roomName: room.roomName || "Study Room",
          hourlyRate,
          totalCost,
          date,
          startTime: start,
          endTime: end,
          userId: user.id,
          userName: user.name || "",
          userImage: user.image || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to book room.");
      }

      toast.success("Room booked successfully!");
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onPress={openModal}
        className="rounded-xl bg-lime-200 px-6 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
      >
        Book Now
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="w-[95vw] max-w-xl">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Book a Study Room</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-0">
                <div className="bg-neutral-950 px-6 pb-6 pt-2 text-white">
                  <form id="bookingForm" onSubmit={handleSubmit} className="space-y-5">
                    <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-neutral-200">{room.roomName}</p>
                          <p className="mt-0.5 text-xs text-neutral-400">
                            {room.floor ? `Floor ${room.floor}` : ""}{" "}
                            {room.category ? `· ${room.category}` : ""}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-lime-200">
                          ${hourlyRate}/hr
                        </p>
                      </div>
                    </div>

                
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-neutral-200">
                        Date <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        min={today}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300 [color-scheme:dark]"
                        required
                      />
                    </div>

                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-200">
                          Start Time <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={startTime}
                          onChange={handleStartTimeChange}
                          className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300"
                          required
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          {TIME_SLOTS.map((hour) => (
                            <option key={hour} value={hour}>
                              {formatHour(hour)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-200">
                          End Time <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          disabled={!startTime}
                          className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
                          required
                        >
                          <option value="" disabled>
                            {startTime ? "Select..." : "Pick start first"}
                          </option>
                          {endTimeSlots.map((hour) => (
                            <option key={hour} value={hour}>
                              {formatHour(hour)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                  
                    {hours > 0 && (
                      <div className="rounded-2xl border border-lime-300/20 bg-lime-300/5 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-300">Duration</span>
                          <span className="text-neutral-100">
                            {hours} {hours === 1 ? "hour" : "hours"}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between border-t border-lime-300/10 pt-2">
                          <span className="text-sm font-medium text-neutral-200">
                            Total Cost
                          </span>
                          <span className="text-2xl font-bold text-lime-200">
                            ${totalCost.toFixed(2)}
                          </span>
                        </div>
                        <p className="mt-1 text-right text-[11px] text-neutral-500">
                          ${hourlyRate.toFixed(2)} × {hours} {hours === 1 ? "hr" : "hrs"}
                        </p>
                      </div>
                    )}


                    {error && (
                      <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        <span className="mt-0.5 shrink-0">⚠️</span>
                        <span>{error}</span>
                      </div>
                    )}
                  </form>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex w-full gap-3 px-6 pb-6">
                  <Button
                    onPress={closeModal}
                    className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-600 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="bookingForm"
                    isDisabled={isSubmitting || !date || !startTime || !endTime}
                    className="flex-1 rounded-2xl bg-lime-300 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
                        Booking...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <BiCalendarCheck className="text-lg" />
                        Confirm Booking
                      </span>
                    )}
                  </Button>
                </div>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default BookingCard;