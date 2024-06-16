import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Providers from "@/providers/Providers";
import UserRedirect from "@/components/UserRedirect";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safecity",
  description: "Stay safe!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen w-screen">
          <Providers>
            <Suspense fallback={<Loading />}>
              <UserRedirect />
            </Suspense>
            <Header />
            <main className="overflow-y-auto pt-16 pb-32 h-screen">
              {children}
            </main>
            <Navigation />
          </Providers>
        </div>
      </body>
    </html>
  );
}
