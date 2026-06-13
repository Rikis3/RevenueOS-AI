import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Header } from "@/components/layout/Header";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { CommandBar } from "@/components/layout/CommandBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salesforce",
  description: "Sales Cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#b0c4df] text-[#080707] antialiased h-screen flex flex-col overflow-hidden`}>
        <QueryProvider>
          <Header />
          <NavigationBar />
          <main className="flex-1 overflow-auto p-4 sm:p-6 pb-20">
            {children}
          </main>
          <CommandBar />
        </QueryProvider>
      </body>
    </html>
  );
}
