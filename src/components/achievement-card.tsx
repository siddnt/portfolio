"use client";

import Tilt from "react-parallax-tilt";

interface HighlightAchievementProps {
    title: string;
    subtitle: string;
    tags: readonly string[];
}

interface StatCardProps {
    platform: string;
    title: string;
    stat: string;
    borderColor: "primary" | "secondary" | "muted";
}

export function HighlightAchievement({
    title,
    subtitle,
    tags,
}: HighlightAchievementProps) {
    const borderColors = {
        primary: "border-[#45d8ed]",
        secondary: "border-[#40e56c]",
        muted: "border-on-surface-variant",
    };

    return (
        <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            glareEnable={true}
            glareMaxOpacity={0.06}
            glareColor="#40e56c"
            glarePosition="all"
            glareBorderRadius="16px"
            transitionSpeed={400}
        >
            <div className="glass-card p-10 rounded-2xl relative overflow-hidden group">
                {/* Background Trophy */}
                <div className="absolute -right-8 -top-8 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-125 duration-700">
                    <svg
                        className="w-[120px] h-[120px] text-[#40e56c]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                    </svg>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                    {/* Trophy Icon */}
                    <div className="w-20 h-20 bg-[#40e56c]/10 rounded-full flex items-center justify-center border border-[#40e56c]/30 flex-shrink-0">
                        <svg
                            className="w-9 h-9 text-[#40e56c]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                        </svg>
                    </div>

                    <div>
                        <h3 className="font-headline text-2xl font-bold text-on-surface">
                            {title}
                        </h3>
                        <p className="text-on-surface-variant font-label uppercase tracking-widest text-xs mt-1">
                            {subtitle}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`text-[10px] font-label ${tag === "Qualified"
                                            ? "bg-[#40e56c]/10 text-[#40e56c] border border-[#40e56c]/30"
                                            : "bg-[#45d8ed]/10 text-[#45d8ed] border border-[#45d8ed]/30"
                                        } px-3 py-1 rounded-full uppercase tracking-tighter`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Tilt>
    );
}

export function StatCard({ platform, title, stat, borderColor }: StatCardProps) {
    const borderColors = {
        primary: "border-l-[#45d8ed]",
        secondary: "border-l-[#40e56c]",
        muted: "border-l-on-surface-variant",
    };

    const statColors = {
        primary: "text-[#45d8ed]",
        secondary: "text-[#40e56c]",
        muted: "text-on-surface-variant",
    };

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            transitionSpeed={400}
            className="h-full"
        >
            <div
                className={`bg-surface-container-low p-6 rounded-xl border-l-2 ${borderColors[borderColor]} h-full transition-all duration-300 hover:bg-surface-container/80`}
            >
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">
                    {platform}
                </p>
                <h4 className="font-headline text-xl font-bold mt-2 text-on-surface">
                    {title}
                </h4>
                <p className={`${statColors[borderColor]} font-bold text-sm mt-1`}>
                    {stat}
                </p>
            </div>
        </Tilt>
    );
}
