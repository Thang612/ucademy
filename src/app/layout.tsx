import type { Metadata } from "next";
import "./globals.css";
import { manrope, roboto } from "@/Components/font";

export const metadata: Metadata = {
  title: "Ucademy",
  description: "Nền tảng học lập trình số 10000+ Việt Nam",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${roboto.variable}`}>
      <body className="font-primary">
        {children}
      </body>
    </html>
  );
}
