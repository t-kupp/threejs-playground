import {
  Environment,
  Instance,
  Instances,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MathUtils } from "three";

const rows = 100;
const columns = 100;

const particles = Array.from({ length: rows * columns }, (_, index) => ({
  factor: MathUtils.randInt(20, 100),
  speed: MathUtils.randFloat(0.01, 0.75),
  xFactor: (index % columns) * 1 - columns * 0.5,
  zFactor: MathUtils.randFloatSpread(1),
  yFactor: (Math.floor(index / columns) - 5) * 1,
}));

export default function DotPlain() {
  return (
    <div className="h-screen w-screen">
      <Canvas shadows camera={{ position: [0, 0, 50], fov: 50 }}>
        <color attach="background" args={["#161616"]} />
        <fog attach="fog" args={["red", 10, 200]} />
        <Environment preset="sunset" />
        <OrbitControls />
        <Dots />
      </Canvas>
    </div>
  );
}

function Dots() {
  const ref = useRef();

  useFrame((state, delta) => {
    // ref.current.rotation.y = MathUtils.damp(
    //   ref.current.rotation.y,
    //   -state.mouse.x * 0.2,
    //   2,
    //   delta,
    // );

    // ref.current.rotation.x = MathUtils.damp(
    //   ref.current.rotation.x,
    //   -state.mouse.y * 0.2,
    //   2,
    //   delta,
    // );

    ref.current.rotation.x = 100;

    ref.current.position.y = -40;
    ref.current.position.z = 50;

    ref.current.children.forEach((child, index) => {
      const time = state.clock.getElapsedTime();
      const yOffset = Math.sin(time * 5 + index * 0.1) * 0.1;
      const xOffset = Math.sin(time * 2 + index * 0.5) * 1.5;
      const zOffset = Math.sin(time * 1 + index * 0.5) * 1;

      child.position.y = particles[index].yFactor + yOffset;
      child.position.x = particles[index].xFactor + xOffset;
      child.position.z = particles[index].zFactor + zOffset;
    });
  });

  return (
    <Instances ref={ref} limit={particles.length}>
      <sphereGeometry args={[0.03, 64, 64]} />
      <meshStandardMaterial color={"orange"} roughness={1} />
      {particles.map((particle, index) => (
        <Instance
          key={index}
          position={[particle.xFactor, particle.yFactor, particle.zFactor]}
          rotation={[0, MathUtils.degToRad(particle.factor), 0]}
        />
      ))}
    </Instances>
  );
}
