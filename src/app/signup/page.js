import { SignUpPage } from "../components/signup";
import { NavBar } from "../components/nav-bar";

export default function Signup() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ height: "100px" }}></div>
      <SignUpPage />
    </div>
  );
}
