"use client";
import { useEffect, useState } from "react";

export default function ClientYear() {
  const [year, setYear] = useState<string>("");
  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);
  return <span suppressHydrationWarning>{year}</span>;
}
