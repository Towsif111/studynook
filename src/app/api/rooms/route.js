import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("studynook");
const rooms = db.collection("rooms");

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const id = searchParams.get("id");
    const limit = searchParams.get("limit");

    let query = {};
    if (id) {
      query._id = new ObjectId(id);
    } else if (userId) {
      query.userId = userId;
    }

    // If fetching by id, return single object
    if (id) {
      const room = await rooms.findOne(query);
      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }
      return NextResponse.json({ ...room, _id: room._id.toString() });
    }

    let cursor = rooms.find(query).sort({ createdAt: -1 });
    if (limit) {
      cursor = cursor.limit(Number(limit));
    }
    const allRooms = await cursor.toArray();

    // Convert ObjectId to string for JSON serialization
    const serialized = allRooms.map((r) => ({
      ...r,
      _id: r._id.toString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("Fetch rooms error:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { roomName, description, imageUrl, floor, capacity, hourlyRate, amenities, userId, userName } = body;

    if (!roomName || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: roomName, userId" },
        { status: 400 }
      );
    }

    const room = {
      roomName,
      description: description || "",
      imageUrl: imageUrl || "",
      floor: floor || "",
      capacity: capacity ? Number(capacity) : 0,
      hourlyRate: hourlyRate ? Number(hourlyRate) : 0,
      amenities: amenities || [],
      price: hourlyRate ? `$${hourlyRate}/hr` : "",
      userId,
      userName: userName || "",
      availability: "available",
      category: "Study Room",
      createdAt: new Date(),
    };

    const result = await rooms.insertOne(room);

    return NextResponse.json(
      {
        success: true,
        room: { ...room, _id: result.insertedId.toString() },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create room error:", error);
    return NextResponse.json(
      { error: "Failed to create room. Please try again." },
      { status: 500 }
    );
  }
}
