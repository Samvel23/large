"use client"
import { Design } from "../components/design";
import { NavBar } from "../components/nav-bar";
import Snowfall from "react-snowfall";


export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <Snowfall snowflakeCount={200} />
      <div style={{ height: "100px" }}></div>
      <Design />
    </div>
  );
}
