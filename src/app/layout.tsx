import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/src/components/SessionProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const urban = Urbanist({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "InformMe",
  description: "NFC Card Demo for InformMe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          urban.className +
          " h-screen flex flex-col bg-gradient-to-b from-secondary to-primary"
        }
      >
        <SessionProvider>
          <Toaster />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
