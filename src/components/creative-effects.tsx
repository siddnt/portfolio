"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ===== MOUSE GLOW =====
export function MouseGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (glowRef.current) {
                glowRef.current.style.left = `${e.clientX}px`;
                glowRef.current.style.top = `${e.clientY}px`;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return <div ref={glowRef} className="mouse-glow" />;
}

// ===== TYPEWRITER =====
export function Typewriter({
    texts,
    className = "",
}: {
    texts: string[];
    className?: string;
}) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = texts[currentTextIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting && displayed.length < current.length) {
            timeout = setTimeout(() => {
                setDisplayed(current.slice(0, displayed.length + 1));
            }, 80 + Math.random() * 40);
        } else if (!isDeleting && displayed.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2500);
        } else if (isDeleting && displayed.length > 0) {
            timeout = setTimeout(() => {
                setDisplayed(current.slice(0, displayed.length - 1));
            }, 40);
        } else if (isDeleting && displayed.length === 0) {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, currentTextIndex, texts]);

    return (
        <span className={className}>
            {displayed}
            <span className="typewriter-cursor" />
        </span>
    );
}

// ===== ANIMATED COUNTER =====
export function AnimatedCounter({
    target,
    suffix = "",
    duration = 2000,
}: {
    target: number;
    suffix?: string;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const startTime = performance.now();
                    const animate = (now: number) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

// ===== SPOTLIGHT CARD =====
export function SpotlightCard({
    children,
    className = "",
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty("--spotlight-x", `${x}px`);
        cardRef.current.style.setProperty("--spotlight-y", `${y}px`);
    }, []);

    return (
        <div
            ref={cardRef}
            className={`spotlight-card ${className}`}
            onMouseMove={handleMouseMove}
            {...props}
        >
            {children}
        </div>
    );
}

// ===== TILT CARD =====
export function TiltCard({
    children,
    className = "",
    intensity = 10,
}: {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -intensity;
            const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * intensity;
            cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        },
        [intensity]
    );

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }, []);

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </div>
    );
}

// ===== REVEAL ON SCROLL =====
export function RevealOnScroll({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right" | "scale";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const transforms: Record<string, string> = {
        up: "translateY(40px)",
        left: "translateX(-40px)",
        right: "translateX(40px)",
        scale: "scale(0.9)",
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : transforms[direction],
                transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

// ===== STAGGER TEXT (letter-by-letter reveal) =====
export function StaggerText({
    text,
    className = "",
    as: Tag = "span",
}: {
    text: string;
    className?: string;
    as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag ref={ref as any} className={className} aria-label={text}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(20px)",
                        transition: `opacity 0.4s ease ${i * 25}ms, transform 0.4s ease ${i * 25}ms`,
                        whiteSpace: char === " " ? "pre" : undefined,
                    }}
                >
                    {char}
                </span>
            ))}
        </Tag>
    );
}

// ===== PARALLAX LAYER =====
export function ParallaxSection({
    children,
    className = "",
    speed = 0.3,
}: {
    children: React.ReactNode;
    className?: string;
    speed?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.innerHeight - rect.top;
            ref.current.style.transform = `translateY(${scrolled * speed * -0.1}px)`;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
