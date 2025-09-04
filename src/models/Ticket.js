// src/models/Ticket.js
import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  isWinner: { type: Boolean, default: false },
  checked: { type: Boolean, default: false },
});

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);

export default Ticket;
