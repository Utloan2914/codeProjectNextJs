import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./component/layout/page";
import ToggleColorMode from '@/app/component/darkMode/page';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToggleColorMode>
          <Layout>{children}</Layout>
        </ToggleColorMode>
      </body>
    </html>
  );
}
