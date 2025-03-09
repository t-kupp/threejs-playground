import { OrbitControls, SoftShadows, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";
import { useRef } from "react";

export default function MovingLight() {
  return (
    <div className="h-screen w-screen">
      <Canvas shadows camera={{ position: [0, 0, 20], fov: 50 }}>
        <color attach={"background"} args={["black"]} />
        <ambientLight intensity={0} />
        <Balls />
        <Sheet />
        <Light />
        <OrbitControls />
        {/* <Perf position="top-left" /> */}
        <EffectComposer>
          <Bloom intensity={1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function Balls() {
  const segments = 16;
  const size = 0.75;
  const balls = [
    {
      position: [0, 1, 0],
      args: [size, segments, segments],
      color: "red",
    },
    {
      position: [1, -1, -1],
      args: [size, segments, segments],
      color: "green",
    },
    {
      position: [-1, -1, 1],
      args: [size, segments, segments],
      color: "blue",
    },
  ];
  return (
    <>
      {balls.map((ball, index) => (
        <mesh key={index} castShadow receiveShadow position={ball.position}>
          <sphereGeometry args={ball.args} />
          <meshPhysicalMaterial
            color={ball.color}
            roughness={0.2}
            metalness={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

function Sheet() {
  return (
    <mesh receiveShadow position={[0, 0, -10]}>
      <boxGeometry args={[100, 100, 0.1]} />
      <meshPhysicalMaterial color={"white"} roughness={1} metalness={0.8} />
    </mesh>
  );
}

function Light() {
  const lightRef = useRef();
  const lightSphereRef = useRef();
  let angle = useRef(0);

  useFrame(() => {
    if (lightRef.current && lightSphereRef.current) {
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;
      lightRef.current.shadow.radius = 10;
      lightRef.current.shadow.bias = -0.005;

      angle.current += 0.02; // Adjust speed
      const radius = 5;

      lightRef.current.position.x = Math.cos(angle.current) * radius;
      lightRef.current.position.z = Math.sin(angle.current) * radius;

      lightSphereRef.current.position.x = Math.cos(angle.current) * radius;
      lightSphereRef.current.position.z = Math.sin(angle.current) * radius;
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        castShadow
        position={[2, 0, 0]}
        intensity={15}
        color="white"
      />
      <mesh ref={lightSphereRef} position={[2, 0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial
          emissive={"white"}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
