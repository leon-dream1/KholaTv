import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "Khola TV - Watch 84,000+ Live TV Channels",
  description: "Khola TV - Watch live TV channels from around the world. Browse by category, country, and language. Created by MD Leon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
          <p>Khola TV &copy; {new Date().getFullYear()} &mdash; Created by <span className="text-red-400 font-medium">MD Leon</span> &mdash; Powered by iptv-org</p>
        </footer>
      </body>
    </html>
  );
}
