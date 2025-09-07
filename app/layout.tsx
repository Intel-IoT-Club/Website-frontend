import "./globals.css"; // relative path
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

// Metadata works because this is a server component
export const metadata = {
  title: "Intel IoT Club",
  description: "Empowering Innovation through Intel IoT technologies",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${inter.className} bg-background text-foreground neon-glow-bg`}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
