import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solvnt — Digital Solutions Studio",
  description: "We identify the real problem in your business and build the exact solution — AI, software, or whatever it takes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-black">{children}</body>
    </html>
  );
}
