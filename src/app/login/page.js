import { LoginPage } from "../components/login";
import { NavBar } from "../components/nav-bar";

export default function Login() {
  return (
    <div style={{ backgroundColor: "#3A3B3C", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ height: "100px" }}></div>
      <LoginPage />
    </div>
  );
}
