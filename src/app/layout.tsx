import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Open_Sans } from "next/font/google";
import "./globals.css";

const body = Atkinson_Hyperlegible_Next({
  variable: "--font-body",
  subsets: ["latin"],
});

const heading = Open_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RLS Guard Dog",
  description: "Made by aigle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${heading.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
