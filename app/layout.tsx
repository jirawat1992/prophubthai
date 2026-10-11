import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ แก้ไขเป็นแบบนี้:
export const metadata: Metadata = {
  title: "PropHubThai - เลือกกองทุนที่ใช่สำหรับคุณ",
  description: "เปรียบเทียบกฎพอร์ตกองทุน FTMO, The5ers, Funding Pips และโปรโมชันส่วนลดค่าสอบสำหรับเทรดเดอร์ไทย",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
