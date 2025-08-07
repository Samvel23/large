import { Design } from "../components/design";
import { NavBar } from "../components/nav-bar";

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ height: "100px" }}></div>
      <Design />
    </div>
  );
}
