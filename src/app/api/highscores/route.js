import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb.mjs";

const COLLECTION_NAME = "scores";

export async function GET(request) {
  try {
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 30;
    const skip = (page - 1) * limit;
    const { searchParams } = new URL(request.url);

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
    const { playerName, score, clicks, time, cardCount } = await request.json();

    if (
      !playerName ||
      typeof score !== "number" ||
      typeof clicks !== "number" ||
      typeof time !== "number" ||
      typeof cardCount !== "number"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    if (score < 0 || clicks < 0 || time < 0 || cardCount < 0) {
      return NextResponse.json(
        { error: "Score, clicks, time, and cardCount must be non-negative" },
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

    console.log("new highscore:", newHighscore);

    const result = await db
      ?.collection(COLLECTION_NAME)
      .insertOne(newHighscore);
    return NextResponse.json(
      { ...newHighscore, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving highscore:", error);
    return NextResponse.json(
      { error: "Failed to save highscore", details: error.message },
      { status: 500 }
    );
  }
}
