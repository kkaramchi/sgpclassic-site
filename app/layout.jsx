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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#f6f2e9", minHeight: "100vh" }}>
        <SiteNav />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
          {children}
        </div>
        <footer
          style={{
            textAlign: "center",
            padding: "40px 32px",
            background: "#12271b",
            color: "#b8c2b7",
            fontSize: "12.5px",
            letterSpacing: "1px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              color: "#c2a04a",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.3px",
              marginBottom: "8px",
            }}
          >
            SGP Classic
          </div>
          EST. 2018 &middot; WOODINGTON LAKE GOLF CLUB
        </footer>
      </body>
    </html>
  );
}
