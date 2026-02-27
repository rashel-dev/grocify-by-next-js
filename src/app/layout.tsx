import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grocify",
  description: "Grocify - Your one-stop shop for all your grocery needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-linear-to-b from-green-100 to-white min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
