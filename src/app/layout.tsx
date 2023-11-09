import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { NavigationBar } from "./_components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CBE Watch App",
  description: "web app to monitor network devices and their configuration",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NavigationBar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
