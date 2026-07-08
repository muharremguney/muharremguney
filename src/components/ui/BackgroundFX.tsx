"use client";

import { useEffect, useRef } from "react";

export function BackgroundFX() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    let frame = 0;
    function handleMove(e: MouseEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        spotRef.current?.style.setProperty("--spot-x", `${e.clientX}px`);
        spotRef.current?.style.setProperty("--spot-y", `${e.clientY}px`);
        frame = 0;
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="tech-grid absolute inset-0" />
      <div
        className="tech-blob h-72 w-72 bg-primary sm:h-96 sm:w-96"
        style={{ top: "-4rem", left: "-4rem" }}
      />
      <div
        className="tech-blob h-72 w-72 bg-accent [animation-delay:-9s] sm:h-96 sm:w-96"
        style={{ bottom: "-6rem", right: "-4rem" }}
      />
      <div ref={spotRef} className="cursor-spotlight absolute inset-0" />
    </div>
  );
}
