"use client";

import { useEffect } from "react";
import  perf  from "./firebase";

export function FirebaseProvider() {
  useEffect(() => {
    if (perf) {
      console.log("✅ Firebase Performance initialized");
    }
  }, []);

  return null; 
}
