import Link from "next/link";

export default function ConstructionPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#2A2A2A",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#fff" }}>
        🚧 Page Under Construction 🚧
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#fff", marginTop: "1rem" }}>
        We're working hard to bring you this page. Please check back soon!
      </p>
      <Link href="/" style={{ color: "black", textDecoration: "none" }}>
        <button
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            background: "#fff",
            color: "#2A2A2A",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
}
