import { Schema, model, models } from "mongoose";

const ScoreSchema = new Schema(
  {
    playerName: {
      type: String,
      required: [true, "Player name is required"],
      trim: true,
      minlength: [2, "Player name must be at least 2 characters"],
      maxlength: [20, "Player name cannot exceed 20 characters"],
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      min: [0, "Score cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Score must be an integer",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for O(log N) leaderboard ordering
ScoreSchema.index({ score: -1, createdAt: 1 });

export const Score = models.Score || model("Score", ScoreSchema);