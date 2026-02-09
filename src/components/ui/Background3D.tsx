"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleField({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        // Subtle vertical movement based on scroll
        const scroll = scrollYProgress.get();
        groupRef.current.position.y = -scroll * 10;
    });

    return (
        <group ref={groupRef}>
            {/* Subtle distant starfield for depth */}
            <Stars count={3000} radius={150} />

            {/* Interactive nearby particles */}
            <InteractiveParticles count={80} />
        </group>
    );
}

function Stars({ count = 5000, radius = 100 }) {
    const points = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = Math.random() * radius;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
        }
        return pos;
    }, [count, radius]);

    useFrame((state) => {
        if (!points.current) return;
        // Extremely slow rotation for "night sky" feel
        points.current.rotation.y = state.clock.getElapsedTime() * 0.01;
        points.current.rotation.x = state.clock.getElapsedTime() * 0.005;
    });

    return (
        <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#64748b" // Slate-500
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

function InteractiveParticles({ count = 80 }) {
    const points = useRef<THREE.Points>(null);
    const { viewport, mouse } = useThree();

    const [positions, particles] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const temp = [];
        const width = viewport.width * 2;
        const height = viewport.height * 2;

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 10;

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            temp.push({
                t: Math.random() * 100,
                speed: 0.01 + Math.random() / 200,
                originalX: x,
                originalY: y,
                z: z
            });
        }
        return [pos, temp];
    }, [count, viewport]);

    useFrame((state) => {
        if (!points.current) return;
        const posAttr = points.current.geometry.attributes.position;

        particles.forEach((particle, i) => {
            particle.t += particle.speed;
            const driftX = Math.cos(particle.t) * 0.2;
            const driftY = Math.sin(particle.t) * 0.2;

            const mouseX = (mouse.x * viewport.width) / 2;
            const mouseY = (mouse.y * viewport.height) / 2;

            const dx = (particle.originalX + driftX) - mouseX;
            const dy = (particle.originalY + driftY) - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let repelX = 0;
            let repelY = 0;
            if (dist < 3) {
                const force = (3 - dist) / 3;
                repelX = dx * force * 0.3;
                repelY = dy * force * 0.3;
            }

            posAttr.setXYZ(
                i,
                particle.originalX + driftX + repelX,
                particle.originalY + driftY + repelY,
                particle.z
            );
        });

        posAttr.needsUpdate = true;
    });

    return (
        <Points ref={points} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#94a3b8"
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

export default function Background3D({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}>
                <Suspense fallback={null}>
                    <fog attach="fog" args={['#050505', 10, 50]} />
                    <ParticleField scrollYProgress={scrollYProgress} />
                </Suspense>
            </Canvas>

            {/* Visual Noise Overlay for texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        </div>
    );
}
