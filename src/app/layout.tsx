import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Playfair_Display } from "next/font/google";
import "./globals.css";

const body = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const heading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "RLS Guard Dog", template: "%s | RLS Guard Dog" },
  description: "Made by aigle",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} antialiased`}
    >
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
