"use client"
import { NavBar } from "../components/nav-bar";
import PrintPage from "../components/print";
import Snowfall from "react-snowfall";


export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <Snowfall snowflakeCount={200} />
      <div style={{ height: "50px" }}></div>
      <PrintPage />
    </div>
  );
}
