import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import serverless from "serverless-http";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

const highscoreSchema = new mongoose.Schema({
  playerName: String,
  score: Number,
  clicks: Number,
  time: String,
  cardCount: Number,
  timestamp: { type: Date, default: Date.now },
});

const Highscore = mongoose.model("Highscore", highscoreSchema);

//API Routes
app.get("/api/highscores", async (req, res) => {
  try {
    const highscores = await Highscore.find().sort({ score: -1 }).limit(30);
    res.json(highscores);
  } catch (error) {
    console.error("Error fetching highscores:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch highscores", details: error.message });
  }
});

app.post("/api/highscores", async (req, res) => {
  try {
    const { playerName, score, clicks, time, cardCount } = req.body;
    if (!playerName || !score || !clicks || !time || !cardCount) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newHighscore = new Highscore(req.body);
    await newHighscore.save();
    res.status(201).json(newHighscore);
  } catch (error) {
    console.error("Error saving highscore:", error);
    res
      .status(500)
      .json({ error: "Failed to save highscore", details: error.message });
  }
});

export const handler = serverless(app);
