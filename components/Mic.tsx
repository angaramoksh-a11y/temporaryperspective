"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const BASE_TILT = -0.04;

function MicModel() {
  const group = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);

  // interaction state kept in refs to avoid re-renders
  const rot = useRef({ x: 0, y: 0.5 });
  const pointer = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const velY = useRef(0);
  const lastInteract = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
      if (dragging.current) {
        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;
        rot.current.y += dx * 0.01;
        rot.current.x = THREE.MathUtils.clamp(
          rot.current.x + dy * 0.008,
          -0.7,
          0.7
        );
        velY.current = dx * 0.01;
        last.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onUp = () => {
      if (dragging.current) {
        dragging.current = false;
        lastInteract.current = performance.now();
        document.body.style.cursor = "";
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.05);

    if (!dragging.current) {
      const idle = performance.now() - lastInteract.current > 1600;
      if (idle) {
        if (!reduced.current) rot.current.y += d * 0.32;
        const tx = pointer.current.y * 0.22;
        const ty = pointer.current.x * 0.18;
        rot.current.x += (tx - rot.current.x) * Math.min(1, d * 2.5);
        if (reduced.current) {
          rot.current.y += (0.5 + ty - rot.current.y) * Math.min(1, d * 2.5);
        }
      } else {
        rot.current.y += velY.current;
        velY.current *= 0.92;
      }
    }

    g.rotation.y = rot.current.y;
    g.rotation.x = BASE_TILT + rot.current.x;
    const t = state.clock.elapsedTime;
    g.position.y = reduced.current ? 0 : Math.sin(t * 0.6) * 0.04;

    if (led.current) {
      const pulse = (Math.sin(t * 2.6) + 1) / 2; // 0..1
      led.current.emissiveIntensity = 1.5 + pulse * 4.5;
    }
  });

  const onDown = (e: { clientX: number; clientY: number }) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    lastInteract.current = performance.now();
    document.body.style.cursor = "grabbing";
  };

  const bodyMat = (
    <meshStandardMaterial color="#15151a" metalness={0.85} roughness={0.32} />
  );

  return (
    <group
      ref={group}
      onPointerDown={(e) => onDown(e)}
      onPointerOver={() => (document.body.style.cursor = "grab")}
      onPointerOut={() => {
        if (!dragging.current) document.body.style.cursor = "";
      }}
      scale={1.15}
    >
      {/* grille head */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <capsuleGeometry args={[0.62, 0.5, 8, 48]} />
        <meshStandardMaterial
          color="#0c0c10"
          metalness={0.6}
          roughness={0.55}
        />
      </mesh>
      {/* fine grille lines suggestion: thin darker rings */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.625, 0.625, 0.9, 48, 1, true]} />
        <meshStandardMaterial
          color="#050507"
          metalness={0.3}
          roughness={0.7}
          side={THREE.DoubleSide}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* trim ring between head and body */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 48]} />
        <meshStandardMaterial color="#26262c" metalness={1} roughness={0.18} />
      </mesh>

      {/* body */}
      <mesh position={[0, -0.25, 0]} castShadow>
        <cylinderGeometry args={[0.46, 0.42, 1.5, 48]} />
        {bodyMat}
      </mesh>

      {/* LED record dot on the body front */}
      <mesh position={[0, 0.1, 0.46]}>
        <sphereGeometry args={[0.045, 24, 24]} />
        <meshStandardMaterial
          ref={led}
          color="#ff4d4d"
          emissive="#ff2a2a"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* bottom cap / connector */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.34, 0.3, 0.3, 48]} />
        <meshStandardMaterial color="#202026" metalness={1} roughness={0.22} />
      </mesh>

      {/* shock-mount yoke ring */}
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.035, 16, 64]} />
        <meshStandardMaterial color="#2a2a30" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function MicScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.4], fov: 34 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ touchAction: "none" }}
    >
      <ambientLight intensity={0.12} />
      {/* key light from the left, dramatic side-lighting */}
      <spotLight
        position={[-4, 3, 3]}
        angle={0.5}
        penumbra={1}
        intensity={70}
        color="#fff3e6"
      />
      {/* cool rim from back-right */}
      <directionalLight position={[5, 1, -3]} intensity={2.2} color="#9fb8ff" />

      {/* local studio reflections, no network HDR */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3}
          color="#ffffff"
          position={[-3, 2, 2]}
          scale={[3, 6, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#bcccff"
          position={[4, 0, -2]}
          scale={[2, 5, 1]}
        />
        <Lightformer
          form="circle"
          intensity={0.6}
          color="#ffd9b0"
          position={[0, -3, 3]}
          scale={[4, 4, 1]}
        />
      </Environment>

      <MicModel />
    </Canvas>
  );
}
