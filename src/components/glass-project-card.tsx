"use client";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

interface GlassProjectCardProps {
    title: string;
    href?: string;
    category: string;
    description: string;
    image?: string;
    isBackend?: boolean;
    statusLabel: string;
    statusType: "success" | "primary" | "outline";
    technologies?: readonly string[];
}

function TerminalCodeBlock() {
    return (
        <div className="aspect-video relative overflow-hidden bg-surface-container-highest p-6 flex flex-col justify-center">
            <div className="absolute top-3 left-4 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <div className="font-mono text-[11px] space-y-1.5 text-[#45d8ed]/70 mt-2">
                <p className="text-[#40e56c]">
                    <span className="text-on-surface">const</span> stream ={" "}
                    <span className="text-on-surface">await</span> Stream.init({"{"}
                </p>
                <p className="pl-4">
                    id: <span className="text-on-surface">&quot;sys_092&quot;</span>,
                </p>
                <p className="pl-4 text-[#40e56c]">
                    protocol: <span className="text-on-surface">&quot;gRPC&quot;</span>,
                </p>
                <p className="pl-4">
                    encryption:{" "}
                    <span className="text-on-surface">&quot;AES-256&quot;</span>
                </p>
                <p className="text-[#40e56c]">{"}"});</p>
            </div>
        </div>
    );
}

export function GlassProjectCard({
    title,
    href,
    category,
    description,
    image,
    isBackend,
    statusLabel,
    statusType,
    technologies,
}: GlassProjectCardProps) {
    const statusClasses = {
        success:
            "text-[#002108] bg-[#69ff87] px-2 py-1 rounded",
        primary:
            "text-[#45d8ed] bg-[#45d8ed]/10 px-2 py-1 rounded",
        outline:
            "text-[#879392] px-2 py-1 border border-[#879392]/30 rounded",
    };

    const categoryColors: Record<string, string> = {
        "Fullstack SaaS": "text-[#45d8ed]",
        "Artificial Intelligence": "text-[#40e56c]",
        Infrastructure: "text-[#45d8ed]",
    };

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable={true}
            glareMaxOpacity={0.08}
            glareColor="#45d8ed"
            glarePosition="all"
            glareBorderRadius="12px"
            transitionSpeed={400}
            className="h-full"
        >
            <div className="glass-card rounded-xl overflow-hidden group kinetic-border transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                {/* Visual Header */}
                {isBackend ? (
                    <TerminalCodeBlock />
                ) : image ? (
                    <div className="aspect-video relative overflow-hidden bg-surface-container-highest">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
                    </div>
                ) : null}

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                    <span
                        className={`text-[10px] font-label uppercase tracking-[0.2em] ${categoryColors[category] || "text-[#45d8ed]"
                            }`}
                    >
                        {category}
                    </span>
                    <h3 className="font-headline text-xl font-bold mt-2 text-on-surface">
                        {title}
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-4 leading-relaxed font-light flex-1">
                        {description}
                    </p>

                    {/* Tags */}
                    {technologies && technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {technologies.slice(0, 5).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[9px] font-label uppercase tracking-wider bg-surface-container-highest/40 border border-outline-variant/20 px-2 py-0.5 rounded text-on-surface-variant"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                        <Link href={href || "#"} className="group/link flex items-center gap-2 text-[#45d8ed] hover:text-[#98f0ff] transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <span
                            className={`text-[10px] font-label uppercase tracking-tighter ${statusClasses[statusType]}`}
                        >
                            {statusLabel}
                        </span>
                    </div>
                </div>
            </div>
        </Tilt>
    );
}
