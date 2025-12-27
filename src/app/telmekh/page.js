"use client";
import { NavBar } from "../components/nav-bar";
import { TelMekh } from "../components/telmekh";
import Snowfall from "react-snowfall";

export default function TelMekhPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <Snowfall snowflakeCount={200} />

      <TelMekh />
    </div>
  );
}
