import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb.mjs";

const COLLECTION_NAME = "scores";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 30;
    const skip = (page - 1) * limit;

    const { db } = await connectToDatabase();
    const highscores = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ score: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection(COLLECTION_NAME).countDocuments();

    return NextResponse.json({
      highscores,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error("Error fetching highscores:", error);
    return NextResponse.json(
      { error: "Failed to fetch highscores", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const payload = await request.json();

    // More robust validation
    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { playerName, score, clicks, time, cardCount } = payload;

    const validationErrors = [];
    if (!playerName || typeof playerName !== "string")
      validationErrors.push("Invalid playerName");
    if (typeof score !== "number" || score < 0)
      validationErrors.push("Invalid score");
    if (typeof clicks !== "number" || clicks < 0)
      validationErrors.push("Invalid clicks");
    if (typeof time !== "number" || time < 0)
      validationErrors.push("Invalid time");
    if (typeof cardCount !== "number" || cardCount < 0)
      validationErrors.push("Invalid cardCount");

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: validationErrors },
        { status: 400 }
      );
    }

    const newHighscore = {
      playerName,
      score,
      clicks,
      time,
      cardCount,
      timestamp: new Date(),
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(newHighscore);

    return NextResponse.json(
      {
        success: true,
        data: { ...newHighscore, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving highscore:", error);
    return NextResponse.json(
      {
        error: "Failed to save highscore",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      },
      { status: 500 }
    );
  }
}
