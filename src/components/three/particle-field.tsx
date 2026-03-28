"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const { viewport } = useThree();

    // Generate particle positions and data
    const { positions, colors, sizes, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const velocities = new Float32Array(count * 3);

        const palette = [
            [0.392, 1.0, 0.855],   // mint #64ffda
            [0.180, 0.831, 0.749], // teal
            [1.0, 0.843, 0.0],     // amber/gold
            [0.300, 0.400, 0.550], // muted slate
        ];

        for (let i = 0; i < count; i++) {
            // Distribute in a large sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3 + Math.random() * 12;

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi) - 5; // push back

            // Color from palette
            const color = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = color[0];
            colors[i * 3 + 1] = color[1];
            colors[i * 3 + 2] = color[2];

            // Random sizes
            sizes[i] = 0.5 + Math.random() * 2.5;

            // Gentle drift velocities
            velocities[i * 3] = (Math.random() - 0.5) * 0.003;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
        }

        return { positions, colors, sizes, velocities };
    }, [count]);

    // Track mouse
    const handlePointerMove = useCallback(
        (e: { clientX: number; clientY: number }) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        },
        []
    );

    // Subscribe to window mouse events
    useMemo(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("mousemove", handlePointerMove as any);
        }
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("mousemove", handlePointerMove as any);
            }
        };
    }, [handlePointerMove]);

    // Animation loop
    useFrame((state, delta) => {
        if (!mesh.current) return;
        const geo = mesh.current.geometry;
        const posArr = geo.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Apply drift
            posArr[i * 3] += velocities[i * 3];
            posArr[i * 3 + 1] += velocities[i * 3 + 1];
            posArr[i * 3 + 2] += velocities[i * 3 + 2];

            // Subtle mouse reactivity
            const dx = mouseRef.current.x * 0.15;
            const dy = mouseRef.current.y * 0.15;
            posArr[i * 3] += dx * delta * 0.3;
            posArr[i * 3 + 1] += dy * delta * 0.3;

            // Wrap around boundaries
            if (Math.abs(posArr[i * 3]) > 15) posArr[i * 3] *= -0.5;
            if (Math.abs(posArr[i * 3 + 1]) > 15) posArr[i * 3 + 1] *= -0.5;
            if (posArr[i * 3 + 2] > 2 || posArr[i * 3 + 2] < -18)
                velocities[i * 3 + 2] *= -1;
        }

        geo.attributes.position.needsUpdate = true;

        // Slow rotation
        mesh.current.rotation.y += delta * 0.015;
        mesh.current.rotation.x += delta * 0.005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// Connection lines between nearby particles
function ConnectionLines({ count = 2000 }: { count?: number }) {
    const lineRef = useRef<THREE.LineSegments>(null);

    useFrame(() => {
        // Lines are expensive to update every frame for 2000 particles,
        // so we skip this for performance
    });

    return null;
}

export function ParticleField() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                dpr={[1, 1.5]}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
            >
                <ambientLight intensity={0.5} />
                <Particles count={1500} />
            </Canvas>
        </div>
    );
}
