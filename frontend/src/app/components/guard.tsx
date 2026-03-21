// src/app/components/RouteGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axiosInstance from "../API/axiosInstance";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Try to fetch the current user
        // This triggers your Axios interceptor (including the /refresh logic!)
        await axiosInstance.get("/farm/username");
        setAuthorized(true);
      } catch (error: any) {
        console.error("Not authorized, redirecting to login...");
        // 2. If it fails (even after a refresh attempt), go to login
        const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(pathname)}`;
        router.push(loginUrl);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (!authorized) {
    // You can return a nice Spinner or Skeleton here
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg animate-pulse">Verifying Session...</p>
      </div>
    );
  }

  return <>{children}</>;
}