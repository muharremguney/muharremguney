"use client";

import type { ReactNode } from "react";
import { WORKSPACE_NAVIGATE_EVENT } from "@/components/workspace/events";

export function PanelLink({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent(WORKSPACE_NAVIGATE_EVENT, { detail: id }));
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
