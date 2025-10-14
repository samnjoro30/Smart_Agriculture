export const dynamic = "force-dynamic"; // forces SSR

import Dashboard from "../dash/page";

export default async function DashboardPage() {
  try {
    const res = await fetch("https://smart-agriculture-21dt.onrender.com/ping", {
    cache: "no-store",
  }); 
  if (!res.ok) {
    throw new Error(`Backend returned ${res.status}`);
  }

  const data = await res.json();

  return <Dashboard data={data} />;

  }catch(error){
    console.error("DashboardPage error:", error);
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        <p>Backend connection failed. Please try again later.</p>
      </div>
    );
  }
}
