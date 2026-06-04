import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solvnt — Digital Solutions Studio",
  description: "We identify the real problem in your business and build the exact solution — AI, software, or whatever it takes.",
  icons: { icon: "/icon.png?v=4", apple: "/icon.png?v=4" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-black">
        {children}
        <Script id="favicon-enforce" strategy="afterInteractive">{`
          (function() {
            var all = document.querySelectorAll("link[rel*='icon']");
            all.forEach(function(l) { l.parentNode && l.parentNode.removeChild(l); });
            var link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            link.href = '/icon.png?v=4';
            document.head.appendChild(link);
          })();
        `}</Script>
      </body>
    </html>
  );
}
