const { mongoose } = require("../lib/mongodb");
const { Schema, model } = mongoose;

const ticketSchema = new Schema(
  {
    number: { type: String, required: true, unique: true },
    isWinner: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Ticket || model("Ticket", ticketSchema);
