import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <p className="text-center text-2xl">
        {session && <span>Logged in as {session.user?.email}</span>}
      </p>
    </div>
  );
}
