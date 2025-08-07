import { NavBar } from "../components/nav-bar";
import { TelMekh } from "../components/telmekh";

export default function TelMekhPage() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      
      <TelMekh />
    </div>
  );
}
