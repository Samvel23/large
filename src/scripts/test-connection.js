// scripts/test-connection.js
const { dbConnect } = require("../lib/mongodb.js");

async function testConnection() {
  try {
    const conn = await dbConnect();
    console.log("✅ Connected to MongoDB:", conn.connection.name);
    process.exit(0);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
}

testConnection();
