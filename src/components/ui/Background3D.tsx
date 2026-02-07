"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import { Text, Float, MeshTransmissionMaterial, Stars } from "@react-three/drei";

// --- HELPERS (Pure functions or outside component scope to satisfy lint) ---

function generateRandomRotation(): [number, number, number] {
    return [Math.random(), Math.random(), Math.random()];
}

function generateTunnelPoints(count: number): Float32Array {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const r = 5 + Math.random() * 5;
        const z = -Math.random() * 100;

        pos[i * 3] = r * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(theta);
        pos[i * 3 + 2] = z;
    }
    return pos;
}

// --- SCENE CONTENT ---

function HeroPortal() {
    return (
        <group position={[0, 0, -5]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Main Ring */}
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <torusGeometry args={[3, 0.05, 16, 100]} />
                    <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={5} toneMapped={false} />
                </mesh>

                {/* Secondary Ring */}
                <mesh rotation={[0, 0, -Math.PI / 4]} scale={0.8}>
                    <torusGeometry args={[3, 0.05, 16, 100]} />
                    <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={2} toneMapped={false} />
                </mesh>

                {/* Central Prism (The "Monolith") */}
                <mesh position={[0, 0, 0]}>
                    <octahedronGeometry args={[1.5, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        thickness={2}
                        roughness={0}
                        transmission={1}
                        ior={1.5}
                        chromaticAberration={0.2}
                        background={new THREE.Color('#030303')}
                        color="#a5b4fc"
                    />
                </mesh>
            </Float>
            <pointLight position={[0, 0, 0]} intensity={2} color="#4f46e5" distance={10} />
        </group>
    );
}

function FloatingTech({ z, x, title }: { z: number, x: number, title: string }) {
    // Memoize random values
    const randomRot1 = useMemo(() => generateRandomRotation(), []);
    const randomRot2 = useMemo(() => generateRandomRotation(), []);

    return (
        <group position={[x, 0, z]}>
            <Float rotationIntensity={1} floatIntensity={1} speed={2}>
                <mesh rotation={randomRot1}>
                    <icosahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial color="#333" wireframe />
                </mesh>
                <mesh rotation={randomRot2} scale={0.5}>
                    <boxGeometry />
                    <meshBasicMaterial color="#4f46e5" wireframe />
                </mesh>
            </Float>
            <Text
                position={[x > 0 ? -1.5 : 1.5, 0, 0]}
                fontSize={0.4}
                color="white"
                anchorX={x > 0 ? "right" : "left"}
                anchorY="middle"
            >
                {title}
            </Text>
        </group>
    )
}

function DataTunnel() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 2000;

    const [positions] = useMemo(() => {
        return [generateTunnelPoints(count)];
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#4f46e5" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

function SceneCamera({ scrollY }: { scrollY: MotionValue<number> }) {
    useFrame((state) => {
        // Map scroll (0-1) to Z depth (0 to -40)
        // Camera starts at Z=5
        const targetZ = 5 - (scrollY.get() * 45);

        // Smooth follow
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

        // Look slightly ahead
        state.camera.lookAt(0, 0, targetZ - 10);

        // Mouse parallax (subtle)
        const { x, y } = state.pointer;
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 2, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 2, 0.05);
    });

    return null;
}

function SceneContent({ scrollY }: { scrollY: MotionValue<number> }) {
    return (
        <>
            <fog attach="fog" args={['#030303', 5, 25]} />
            <ambientLight intensity={0.5} />

            <SceneCamera scrollY={scrollY} />

            <HeroPortal />

            {/* Tunnel Effect */}
            <DataTunnel />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Floating Markers acting as "Stations" in the void */}
            <FloatingTech z={-10} x={4} title="PROJECTS" />
            <FloatingTech z={-18} x={-4} title="EXPERTISE" />
            <FloatingTech z={-28} x={4} title="JOURNEY" />
            <FloatingTech z={-38} x={-4} title="CONTACT" />

            {/* Grid Floor */}
            <gridHelper args={[100, 50, 0x222222, 0x050505]} position={[0, -4, -50]} rotation={[0, 0, 0]} />
        </>
    );
}

export default function Background3D({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none fade-in-0 duration-1000 transition-opacity">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={null}>
                    <SceneContent scrollY={scrollYProgress} />
                </Suspense>
            </Canvas>
            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-60" />
        </div>
    );
}
