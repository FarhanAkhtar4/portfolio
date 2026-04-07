"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const purple = new THREE.Color("#8b5cf6");
    const cyan = new THREE.Color("#06b6d4");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      vel[i3] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;

      const t = Math.random();
      const c = t < 0.4 ? purple : t < 0.7 ? cyan : white;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return [pos, vel, col];
  }, [count]);

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const positionArray = mesh.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positionArray[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.001;
      positionArray[i3 + 1] +=
        velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.1) * 0.001;

      // Wrap around
      if (positionArray[i3] > 10) positionArray[i3] = -10;
      if (positionArray[i3] < -10) positionArray[i3] = 10;
      if (positionArray[i3 + 1] > 10) positionArray[i3 + 1] = -10;
      if (positionArray[i3 + 1] < -10) positionArray[i3 + 1] = 10;

      // Mouse influence
      const mx = mousePos.current.x * viewport.width * 0.5;
      const my = mousePos.current.y * viewport.height * 0.5;
      const dx = positionArray[i3] - mx;
      const dy = positionArray[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.002;
        positionArray[i3] += dx * force;
        positionArray[i3 + 1] += dy * force;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.z = time * 0.015;
  });

  return (
    <points
      ref={mesh}
      onPointerMove={handlePointerMove as never}
    >
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
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralLines() {
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { positions } = useMemo(() => {
    const pos: number[] = [];
    // Create connection lines between random points
    for (let i = 0; i < 120; i++) {
      const x1 = (Math.random() - 0.5) * 12;
      const y1 = (Math.random() - 0.5) * 12;
      const z1 = (Math.random() - 0.5) * 6;
      const x2 = x1 + (Math.random() - 0.5) * 3;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 2;
      pos.push(x1, y1, z1, x2, y2, z2);
    }
    return { positions: new Float32Array(pos) };
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    linesRef.current.material.opacity =
      0.04 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function FloatingGeometry() {
  const torusRef = useRef<THREE.Mesh>(null!);
  const icosaRef = useRef<THREE.Mesh>(null!);
  const octaRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.y = t * 0.15;
      torusRef.current.position.y = Math.sin(t * 0.4) * 0.5;
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.x = t * 0.15;
      icosaRef.current.rotation.z = t * 0.1;
      icosaRef.current.position.y = Math.cos(t * 0.3) * 0.4;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.2;
      octaRef.current.rotation.z = t * 0.15;
      octaRef.current.position.y = Math.sin(t * 0.35 + 1) * 0.3;
    }
  });

  return (
    <>
      <mesh ref={torusRef} position={[4, 1, -3]}>
        <torusGeometry args={[0.6, 0.15, 16, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>
      <mesh ref={icosaRef} position={[-4.5, -1, -2]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
      <mesh ref={octaRef} position={[3, -2.5, -4]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[-5, -5, 3]} intensity={0.3} color="#06b6d4" />
        <Particles count={600} />
        <NeuralLines />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
