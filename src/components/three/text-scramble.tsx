"use client";

import { useEffect, useState, useCallback } from "react";

export function TextScramble({
    text,
    className = "",
    scrambleOnHover = true,
    delay = 0,
}: {
    text: string;
    className?: string;
    scrambleOnHover?: boolean;
    delay?: number;
}) {
    const [displayed, setDisplayed] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const totalIterations = text.length * 2;

        const interval = setInterval(() => {
            setDisplayed(
                text
                    .split("")
                    .map((char, idx) => {
                        if (char === " ") return " ";
                        if (idx < iteration / 2) return text[idx];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            iteration++;
            if (iteration >= totalIterations) {
                clearInterval(interval);
                setDisplayed(text);
                setIsScrambling(false);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text, isScrambling, chars]);

    // Auto-scramble on mount
    useEffect(() => {
        const timeout = setTimeout(scramble, delay);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <span
            className={className}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
            style={{ cursor: scrambleOnHover ? "default" : undefined }}
        >
            {displayed}
        </span>
    );
}
