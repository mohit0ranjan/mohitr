"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleField() {
    return (
        <group>
            {/* Subtle distant starfield for depth */}
            <Stars count={3000} radius={150} />

            {/* Interactive nearby particles */}
            <InteractiveParticles count={150} />
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

function InteractiveParticles({ count = 100 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const { viewport, mouse } = useThree();

    // Create random initial positions for particles
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        const width = viewport.width * 2; // Spread wider than screen
        const height = viewport.height * 2;

        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 20; // Some depth

            temp.push({ t, factor, speed, x, y, z, originalX: x, originalY: y, originalZ: z });
        }
        return temp;
    }, [count, viewport]);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, speed, x, y, z, originalX, originalY } = particle;

            // Natural easy drift
            t = particle.t += speed;
            const driftX = Math.cos(t) * 0.5;
            const driftY = Math.sin(t) * 0.5;

            // Mouse interaction (repel)
            const mouseX = (mouse.x * viewport.width) / 2;
            const mouseY = (mouse.y * viewport.height) / 2;

            // Calculate distance to mouse
            const dx = (originalX + driftX) - mouseX;
            const dy = (originalY + driftY) - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let repelX = 0;
            let repelY = 0;

            if (dist < 4) {
                const force = (4 - dist) / 4;
                repelX = dx * force * 0.5;
                repelY = dy * force * 0.5;
            }

            dummy.position.set(
                originalX + driftX + repelX,
                originalY + driftY + repelY,
                z
            );

            // Subtle pulse
            const s = 0.5 + Math.abs(Math.sin(t * 2)) * 0.5;
            dummy.scale.set(s, s, s);

            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#94a3b8" transparent opacity={0.6} /> {/* Slate-400 */}
        </instancedMesh>
    );
}

export default function Background3D({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true, alpha: false }}>
                <Suspense fallback={null}>
                    {/* Add fog for depth fading */}
                    <fog attach="fog" args={['#050505', 10, 50]} />
                    <ParticleField />
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
