import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import MatterLoader from "@/components/MatterLoader";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mafaz Siddiqua | Full-Stack Developer",
  description: "Portfolio of Mafaz Siddiqua, a Full-Stack Developer based in Bengaluru, India, building web applications with React, Next.js, and Express.js.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark selection:bg-accent-blue selection:text-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground antialiased`}
      >
        <MatterLoader />
        <Navbar />
        <CustomCursor />
        <main>{children}</main>
      </body>
    </html>
  );
}
