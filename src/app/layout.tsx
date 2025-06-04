import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Machine test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable}`}>{children}</body>
    </html>
  );
}
