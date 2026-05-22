import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("studynook");
const bookings = db.collection("bookings");

export async function POST(request) {
  try {
    const body = await request.json();
    const { roomId, date, startTime, endTime, userId, userName, userImage, note } = body;

    // Validate required fields
    if (!roomId || !date || startTime == null || endTime == null || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: roomId, date, startTime, endTime, userId" },
        { status: 400 }
      );
    }

    // Validate date is today or future
    const bookingDate = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return NextResponse.json(
        { error: "Booking date must be today or a future date" },
        { status: 400 }
      );
    }

    // Validate time slots
    const start = Number(startTime);
    const end = Number(endTime);
    if (start < 8 || start > 20 || end < 9 || end > 21) {
      return NextResponse.json(
        { error: "Time slots must be between 08:00 and 20:00" },
        { status: 400 }
      );
    }
    if (end - start < 1) {
      return NextResponse.json(
        { error: "Minimum booking duration is 1 hour" },
        { status: 400 }
      );
    }
    if (end <= start) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }

    // Conflict check: same room, same date, overlapping hours, confirmed booking
    // Two intervals [start, end) and [existingStart, existingEnd) overlap if start < existingEnd AND existingStart < end
    const conflict = await bookings.findOne({
      roomId,
      date,
      status: "confirmed",
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    if (conflict) {
      return NextResponse.json(
        {
          error: `This time slot is already booked (${conflict.startTime}:00 - ${conflict.endTime}:00). Please choose a different time.`,
        },
        { status: 409 }
      );
    }

    // Create the booking
    const totalCost = (end - start) * (body.hourlyRate || 0);

    const booking = {
      roomId,
      roomName: body.roomName || "",
      date,
      startTime: start,
      endTime: end,
      userId,
      userName: userName || "",
      userImage: userImage || "",
      note: note || "",
      totalCost,
      status: "confirmed",
      createdAt: new Date(),
    };

    const result = await bookings.insertOne(booking);

    return NextResponse.json(
      { success: true, booking: { ...booking, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}
