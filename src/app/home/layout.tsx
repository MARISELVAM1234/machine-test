import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Country list",
  description: "A simple country list application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
