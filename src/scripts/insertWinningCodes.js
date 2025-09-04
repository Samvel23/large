// src/scripts/insertWinningCodes.js

// Load environment variables


const { dbConnect } = require("../lib/mongodb");
const Ticket = require("../models/Ticket");

async function insertWinningCodes() {
  await dbConnect();

  // Add or update your winning codes here
  const codes = ["Ա3Բ_ԹՁ", "ԶՖ9-ՄՆ", "ՇՀՏ_ԿԱ", "Գ8ՂՊ-Վ", "ՉՐ6Ո_Ջ", "chlp"];

  try {
    for (const code of codes) {
      await Ticket.updateOne(
        { number: code }, // find by code
        { $set: { isWinner: true, checked: false } }, // mark as winning & reset checked
        { upsert: true } // insert if not exist
      );
    }

    console.log("Winning codes inserted/renewed:", codes);
  } catch (err) {
    console.error("Error inserting/renewing winning codes:", err.message);
  } finally {
    process.exit();
  }
}

insertWinningCodes();
