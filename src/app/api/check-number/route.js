// src/app/api/check-number/route.js

const { NextResponse } = require("next/server");
const nodemailer = require("nodemailer");
const { dbConnect } = require("../../../lib/mongodb");
const Ticket = require("../../../models/Ticket");

// Configure nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

// Optional: verify SMTP on server startup
transporter.verify((err, success) => {
  if (err) console.error("SMTP error:", err);
  else console.log("SMTP ready");
});

export async function POST(req) {
  try {
    await dbConnect();

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const { name, phone, number } = body || {};
    if (!number) {
      return NextResponse.json(
        { message: "Please provide your code." },
        { status: 400 }
      );
    }

    const sanitizedCode = number.replace(/\s+/g, "");

    const ticket = await Ticket.findOne({ number: sanitizedCode });

    if (!ticket || !ticket.isWinner) {
      return NextResponse.json(
        { message: "❌ Not a winning code." },
        { status: 404 }
      );
    }

    if (ticket.checked) {
      return NextResponse.json(
        { message: "⚠️ This code has already been checked." },
        { status: 200 }
      );
    }

    // Mark ticket as checked
    ticket.checked = true;
    await ticket.save();

    // Send email if name and phone provided
    if (name && phone) {
      try {
        await transporter.sendMail({
          from: `"TelMekh Winner" <${process.env.EMAIL_USER}>`,
          to: process.env.NOTIFY_EMAIL, // your notification email
          subject: "🎉 New TelMekh Winner!",
          text: `Winner Info:\nName: ${name}\nPhone: ${phone}\nWinning Code: ${sanitizedCode}`,
        });
        console.log("Winner email sent!");
      } catch (mailErr) {
        console.error("Email sending error:", mailErr);
      }
    }

    return NextResponse.json(
      { message: "🎉 Winner recorded!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Check-number error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
