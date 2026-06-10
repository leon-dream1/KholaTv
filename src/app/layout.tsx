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
        <footer className="border-t border-gray-800 py-4 sm:py-6 px-4 text-center text-gray-500 text-[10px] sm:text-xs">
          <p>Khola TV &copy; {new Date().getFullYear()} &mdash; Made with ❤️ by <span className="text-red-400 font-medium">MD Leon</span> &mdash; Data from iptv-org</p>
          <p className="mt-1 opacity-60">🇧🇩 থেকে সারা বিশ্বের চ্যানেল দেখুন | Watch 84,000+ live TV channels</p>
        </footer>
      </body>
    </html>
  );
}
