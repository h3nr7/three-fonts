import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";


export function Lighting() {

  return (
    <group>
      <ambientLight color={'white'} intensity={1} />
      <directionalLight position={[200, 200, 200]} intensity={1} />
      <directionalLight position={[200, 200, -200]} intensity={1} />
      <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.8} color="white" scale={200} position={[0, -0.005, 0]}>
        <RandomizedLight amount={8} radius={6} ambient={0.5} intensity={1} position={[-1.5, 2.5, -2.5]} bias={0.001} />
      </AccumulativeShadows>
    </group>
  )
}