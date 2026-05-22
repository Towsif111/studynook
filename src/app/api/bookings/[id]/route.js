import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("studynook");
const bookings = db.collection("bookings");

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const result = await bookings.findOneAndUpdate(
      { _id: new ObjectId(id), status: "confirmed" },
      { $set: { status: "cancelled" } },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Booking not found or already cancelled" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: { ...result, _id: result._id.toString() },
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return NextResponse.json(
      { error: "Failed to cancel booking. Please try again." },
      { status: 500 }
    );
  }
}
