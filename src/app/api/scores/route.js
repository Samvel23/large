import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Score } from "@/lib/models/Score";

// Shared so GET and POST always return the leaderboard in the exact same
// shape (including a stringified _id, which the frontend needs to
// highlight "You" in the list).
async function getTopScores() {
  const topScores = await Score.find()
    .sort({ score: -1, createdAt: 1 })
    .limit(10)
    .select("playerName score createdAt")
    .lean();

  return topScores.map((entry) => ({
    ...entry,
    _id: entry._id.toString(),
  }));
}

export async function GET() {
  try {
    await connectToDatabase();

    const leaderboard = await getTopScores();

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error("GET /api/scores execution failure:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 },
      );
    }

    const { playerName, score } = body;

    if (
      typeof playerName !== "string" ||
      !playerName.trim() ||
      playerName.trim().length > 30
    ) {
      return NextResponse.json(
        { error: "Player name must be a non-empty string up to 30 characters" },
        { status: 400 },
      );
    }

    if (typeof score !== "number" || !Number.isFinite(score) || score < 0) {
      return NextResponse.json(
        { error: "Score must be a valid non-negative number" },
        { status: 400 },
      );
    }

    const sanitizedScore = Math.floor(score);
    const sanitizedName = playerName.trim();

    const newScore = await Score.create({
      playerName: sanitizedName,
      score: sanitizedScore,
    });

    // The frontend (GameOverPanel) reads `data.score._id` and
    // `data.topScores` from this response — both are required for the
    // leaderboard and the "You" highlight to render at all.
    const topScores = await getTopScores();

    return NextResponse.json(
      {
        score: {
          _id: newScore._id.toString(),
          playerName: newScore.playerName,
          score: newScore.score,
          createdAt: newScore.createdAt,
        },
        topScores,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/scores execution failure:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit score" },
      { status: 500 },
    );
  }
}
