export const dynamic = "force-dynamic"; // forces SSR

import Dashboard from "../dash/page";

export default async function DashboardPage() {
  const res = await fetch("https://smart-agriculture-21dt.onrender.com/", {
    cache: "no-store",
  }); 
  if (!res.ok) {
    throw new Error("Failed to fetch data from backend");
  }

  const data = await res.json();

  return <Dashboard data={data} />;
}
