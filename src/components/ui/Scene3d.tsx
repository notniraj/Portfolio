"use client";
import { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
    modelPath: string;
}

function Model({ modelPath }: ModelProps) {
    const meshRef = useRef<THREE.Group>(null);
    const gltf = useLoader(GLTFLoader, modelPath);

    // Gentle floating animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={gltf.scene}
            scale={2}
            position={[0, -10, 0]}
        />
    );
}

function Lights() {
    return (
        <>
            <ambientLight intensity={10} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <spotLight
                position={[0, 10, 0]}
                angle={0.1}
                penumbra={1}
                intensity={0.5}
                castShadow
            />
        </>
    );
}

export function Scene3D({ modelPath }: ModelProps) {
    return (
        <Canvas
            className="w-full h-full flex justify-center items-center"
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            }}
        >
            <PerspectiveCamera makeDefault position={[10, 2, 5]} />

            <Lights />

            <Suspense fallback={null}>
                <Model modelPath={modelPath} />
            </Suspense>

            {/* Interactive controls - users can drag to rotate */}
            <OrbitControls
                enableZoom={false}
                enablePan={true}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 6}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </Canvas>
    );
}