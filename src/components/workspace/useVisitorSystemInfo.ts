"use client";

import { useEffect, useState } from "react";
import {
  countryName,
  detectBrowser,
  detectOs,
  formatLocalTime,
  getGreeting,
} from "@/lib/systemInfo";

export type VisitorSystemInfo = {
  greeting: string;
  localTime: string;
  browser: string;
  os: string;
  resolution: string;
  maskedIp: string | null;
  city: string | null;
  country: string | null;
  flag: string | null;
  loading: boolean;
};

function clientSnapshot(): Omit<
  VisitorSystemInfo,
  "maskedIp" | "city" | "country" | "flag" | "loading"
> {
  const now = new Date();
  if (typeof window === "undefined") {
    return { greeting: "Merhaba", localTime: "--:--", browser: "—", os: "—", resolution: "—" };
  }
  return {
    greeting: getGreeting(now.getHours()),
    localTime: formatLocalTime(now),
    browser: detectBrowser(navigator.userAgent),
    os: detectOs(navigator.userAgent),
    resolution: `${window.screen.width}×${window.screen.height}`,
  };
}

function initialState(): VisitorSystemInfo {
  return {
    ...clientSnapshot(),
    maskedIp: null,
    city: null,
    country: null,
    flag: null,
    loading: true,
  };
}

export function useVisitorSystemInfo(): VisitorSystemInfo {
  const [info, setInfo] = useState<VisitorSystemInfo>(initialState);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setInfo((prev) => ({
        ...prev,
        greeting: getGreeting(now.getHours()),
        localTime: formatLocalTime(now),
      }));
    }, 1000);

    fetch("/api/visitor")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setInfo((prev) => ({
          ...prev,
          maskedIp: data.maskedIp,
          city: data.city,
          country: countryName(data.countryCode),
          flag: data.flag,
          loading: false,
        }));
      })
      .catch(() => {
        setInfo((prev) => ({ ...prev, loading: false }));
      });

    return () => clearInterval(timer);
  }, []);

  return info;
}
