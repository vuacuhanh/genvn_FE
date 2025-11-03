import "./globals.css";
import React from "react";
export const metadata = {
  title: "Tạo sinh đề TV Tiểu học",
  description: "Tool sinh đề tiếng Việt cho tiểu học bằng AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
