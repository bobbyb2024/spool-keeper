import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from '@/providers/AppProvider';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpoolKeeper - Filament Management System",
  description: "3D Printing Filament Inventory Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AppProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
      </body>
    </html>
  );
}
