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
app.get("/api/highscores.js", async (req, res) => {
  try {
    const highscores = await Highscore.find().sort({ score: -1 }).limit(30);
    res.json(highscores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch highscores" });
  }
});

app.post("/api/highscores", async (req, res) => {
  try {
    const newHighscore = new Highscore(req.body);
    await newHighscore.save();
    res.status(201).json(newHighscore);
  } catch (error) {
    res.status(500).json({ error: "Failed to save highscore" });
  }
});

export const handler = serverless(app);
