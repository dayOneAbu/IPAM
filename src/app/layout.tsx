import "~/styles/globals.css";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "./_components/navbar";
import { getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "CBE Watch App",
  description: "web app to monitor network devices and their configuration",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body className={"min-h-screen bg-background font-sans antialiased"}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="min-h-screen grid grid-cols-6">
            <div className="col-span-1 bg-brand-purple">
              {session && <Sidebar />}
            </div>
            <div className="col-span-5 flex flex-col justify-center max-w-7xl">{children}</div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
