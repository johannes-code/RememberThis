import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb.mjs";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const highscores = await db
      .collection("highscores")
      .find({})
      .sort({ score: -1 })
      .limit(30)
      .toArray();
    return NextResponse.json(highscores);
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
    if (!playerName || !score || !clicks || !time || !cardCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
    const result = await db.collection("highscores").insertOne(newHighscore);
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
