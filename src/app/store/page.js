import { StorePage } from "../components/store";
import { NavBar } from "../components/nav-bar";

export default function Store() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh", minWidth: "100vw" }}>
      <NavBar />
      <div style={{ height: "100px" }}></div>
      <StorePage />
    </div>
  );
}
