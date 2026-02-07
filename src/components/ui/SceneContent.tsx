"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Text, Float, Stars, Trail, Instance, Instances, MeshTransmissionMaterial } from "@react-three/drei";

function HeroPortal() {
    return (
        <group position={[0, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[0, 0, -5]} rotation={[0, 0, Math.PI / 4]}>
                    <ringGeometry args={[3, 3.2, 64]} />
                    <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={2} toneMapped={false} />
                </mesh>
                <mesh position={[0, 0, -4]} rotation={[0, 0, -Math.PI / 4]}>
                    <ringGeometry args={[2.5, 2.6, 64]} />
                    <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1} toneMapped={false} />
                </mesh>
            </Float>
            <pointLight position={[0, 0, -2]} intensity={5} color="#4f46e5" distance={10} />
        </group>
    );
}

function DataStream({ count = 100 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -10 + Math.random() * 20;
            const yFactor = -10 + Math.random() * 20;
            const zFactor = -10 + Math.random() * 20;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
        </instancedMesh>
    );
}

function FloatingTech({ z }: { z: number }) {
    return (
        <group position={[4, -2, z]}>
            <Float rotationIntensity={2} floatIntensity={2}>
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <MeshTransmissionMaterial
                        backside
                        thickness={2}
                        roughness={0}
                        transmission={1}
                        ior={1.5}
                        chromaticAberration={0.1}
                        background={new THREE.Color('#030303')}
                    />
                </mesh>
            </Float>
            <Text
                position={[-1.5, 0, 0]}
                fontSize={0.5}
                color="white"
                anchorX="right"
                anchorY="middle"
            >
                SYSTEM_CORE
            </Text>
        </group>
    )
}

function ProjectGallery({ z }: { z: number }) {
    return (
        <group position={[-4, 2, z]}>
            <Float rotationIntensity={1} floatIntensity={1}>
                <mesh rotation={[0, 0.5, 0]}>
                    <planeGeometry args={[4, 3]} />
                    <meshBasicMaterial color="#1a1a1a" transparent opacity={0.8} side={THREE.DoubleSide}>
                        {/* Wireframe effect */}
                    </meshBasicMaterial>
                    <lineSegments>
                        <edgesGeometry args={[new THREE.PlaneGeometry(4, 3)]} />
                        <lineBasicMaterial color="#4f46e5" />
                    </lineSegments>
                </mesh>
            </Float>
            <Text
                position={[2.5, 0, 0]}
                fontSize={0.5}
                color="white"
                anchorX="left"
                anchorY="middle"
            >
                ARCHIVE_01
            </Text>
        </group>
    )
}

export default function SceneContent({ scrollY }: { scrollY: MotionValue<number> }) {
    const { camera } = useThree();

    useFrame(() => {
        // Map scroll (0-1) to Z depth (0 to -50)
        // We fly "into" the screen
        const targetZ = -scrollY.get() * 40;

        // Smooth camera movement
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + 5, 0.05);

        // Slight camera sway based on scroll for "flying" feeling
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(scrollY.get() * Math.PI * 2) * 2, 0.02);
        camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, Math.sin(scrollY.get() * Math.PI) * 0.1, 0.02);
    });

    return (
        <>
            <fog attach="fog" args={['#030303', 5, 30]} />
            <ambientLight intensity={1} />

            {/* The "Core" at the start */}
            <HeroPortal />

            {/* Elements scattered along the Z-axis path */}
            {/* Work Section Area */}
            <ProjectGallery z={-10} />
            <ProjectGallery z={-15} />

            {/* Skills / Tools Area */}
            <FloatingTech z={-25} />
            <FloatingTech z={-30} />

            {/* Deep Background Elements */}
            <DataStream count={200} />

            {/* Floor Grid - Infinite Feeling */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -20]}>
                <planeGeometry args={[100, 200, 20, 20]} />
                <meshStandardMaterial
                    color="#000000"
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>
            <gridHelper args={[100, 50, 0x333333, 0x111111]} position={[0, -4.9, -20]} />
        </>
    );
}
