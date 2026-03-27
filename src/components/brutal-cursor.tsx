"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function BrutalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -120, y: -120 });
  const pos = useRef({ x: -120, y: -120 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) {
      return;
    }

    document.documentElement.style.cursor = "none";
    document.body.classList.add("brutal-cursor-enabled");

    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setActive(!!target.closest("a,button,[role='button'],[role='link'],input,textarea,select,.brutal-project-row"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    let raf = 0;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.2;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }

      raf = window.requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      document.body.classList.remove("brutal-cursor-enabled");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={cursorRef} className={`brutal-cursor flex ${active ? "is-active" : ""}`} aria-hidden>
      <Image src="/pointinghand.svg" alt="" width={56} height={56} priority />
    </div>
  );
}
