import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: "600",
  style: "normal",
});

export const metadata = {
  title: "Nori's Portfolio",
  description: "Interactive portfolio of Niraj Karki Thapa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrains.className} ${jetBrains.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
