import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group>
            {/* Main Wireframe Earth */}
            <mesh ref={meshRef} position={[0, -4.5, 0]} scale={5.5} rotation={[0.4, 0, 0]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#444444"
                    emissive="#1a1a1a"
                    emissiveIntensity={0.8}
                    wireframe={true}
                    transparent
                    opacity={0.15}
                />
            </mesh>
            {/* Black Core to hide back wires */}
            <mesh position={[0, -4.5, 0]} scale={5.48} rotation={[0.4, 0, 0]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
        </group>
    );
};

const ConnectingLines = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    // Create points on a larger sphere radius
    const points = Array.from({ length: 60 }).map(() => {
        const phi = Math.acos(-1 + (2 * Math.random())) / 1.5; // Limit to top hemisphere
        const theta = Math.sqrt(60 * Math.PI) * phi;
        const radius = 5.6; // Slightly larger than Earth mesh

        return new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            (radius * Math.cos(phi)) - 4.5, // Match y-offset of Earth
            radius * Math.sin(phi) * Math.sin(theta)
        );
    });

    return (
        <group ref={groupRef} rotation={[0.4, 0, 0]}>
            {points.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" opacity={0.4} transparent />
                </mesh>
            ))}
        </group>
    );
}

export default function ThreeEarth() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Earth />
                <ConnectingLines />
                <Environment preset="city" />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />
        </div>
    );
}
