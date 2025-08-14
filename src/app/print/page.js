import { NavBar } from "../components/nav-bar";
import PrintPage from "../components/print";

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ height: "50px" }}></div>
      <PrintPage />
    </div>
  );
}
