import "./globals.css";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "SGP Classic",
  description:
    "SGP Classic Golf Tournament — History, Leaderboards, Player Profiles & Parimutuel Results",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#fafaf9", minHeight: "100vh" }}>
        <SiteNav />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
          {children}
        </div>
        <footer
          style={{
            textAlign: "center",
            padding: "32px",
            color: "#78716c",
            fontSize: "13px",
            borderTop: "1px solid #e7e5e4",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            SGP Classic
          </span>{" "}
          &middot; Est. 2018 &middot; Woodington Lake Golf Club
        </footer>
      </body>
    </html>
  );
}
