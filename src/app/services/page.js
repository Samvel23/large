import { Services } from "../components/services";
import { NavBar } from "../components/nav-bar";

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ height: "100px" }}></div>
      <Services />
    </div>
  );
}
