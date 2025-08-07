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
                padding: "2rem",
            }}
        >
            <style>
                {`
                    @media (max-width: 600px) {
                        .construction-title {
                            font-size: 1.5rem !important;
                            text-align: center;
                        }
                        .construction-text {
                            font-size: 1rem !important;
                            text-align: center;
                        }
                        .construction-btn {
                            width: 100%;
                            font-size: 1rem !important;
                        }
                    }
                `}
            </style>
            <h1
                className="construction-title"
                style={{ fontSize: "2.5rem", color: "#fff" }}
            >
                🚧 Page Under Construction 🚧
            </h1>
            <p
                className="construction-text"
                style={{ fontSize: "1.2rem", color: "#fff", marginTop: "1rem" }}
            >
                We're working hard to bring you this page. Please check back soon!
            </p>
            <Link href="/" style={{ color: "black", textDecoration: "none", width: "100%" }}>
                <button
                    className="construction-btn"
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
                        maxWidth: "300px",
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    Back to Home
                </button>
            </Link>
        </div>
    );
}
