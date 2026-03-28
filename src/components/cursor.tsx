"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const mouse = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });

    useEffect(() => {
        // Only on desktop
        if (typeof window === "undefined" || window.innerWidth < 768) return;

        document.documentElement.style.cursor = "none";

        const move = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
        };

        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            setHovering(!!t.closest("a,button,[role='button'],input,.magnetic-btn,.skill-orb,.holo-card,.bento-card"));
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);

        let raf: number;
        const animate = () => {
            ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
            ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.left = `${ring.current.x}px`;
                ringRef.current.style.top = `${ring.current.y}px`;
            }
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        return () => {
            document.documentElement.style.cursor = "";
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="hidden md:block fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
                style={{ width: 8, height: 8, transition: "width .15s, height .15s" }}
            />
            <div
                ref={ringRef}
                className="hidden md:block fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
                style={{
                    width: hovering ? 48 : 32,
                    height: hovering ? 48 : 32,
                    border: hovering ? "1.5px solid rgba(100,255,218,0.5)" : "1px solid rgba(255,255,255,0.15)",
                    transition: "width .3s cubic-bezier(.23,1,.32,1), height .3s cubic-bezier(.23,1,.32,1), border .3s",
                }}
            />
        </>
    );
}
