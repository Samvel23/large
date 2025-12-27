"use client"
import { Content } from "../components/content";
import { NavBar } from "../components/nav-bar";
import Snowfall from "react-snowfall";

export default function ContentPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <Snowfall snowflakeCount={200} />
      <div style={{ height: "100px" }}></div>
      <Content />
    </div>
  );
}
