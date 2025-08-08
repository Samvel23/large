import { Content } from "../components/content";
import { NavBar } from "../components/nav-bar";

export default function ContentPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ height: "100px" }}></div>
      <Content />
    </div>
  );
}