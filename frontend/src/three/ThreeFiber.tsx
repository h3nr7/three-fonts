import { Canvas } from '@react-three/fiber';
import { Backdrop, BakeShadows, Box, ContactShadows, Environment, OrbitControls, Shadow, Sparkles } from '@react-three/drei';
import { Suspense } from 'react';

export function ThreeFiber() {

  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas 
        shadows
        frameloop="demand"
        camera={{ position: [0, -15, 12], fov: 30 }}
        style={{
          position: 'fixed', top: '0px', left: '0px',
          width: '100vw', height: '100vh',
          zIndex: 0
        }} >
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Sphere color="white" amount={50} emissive="green" glow="lightgreen" position={[1, 1, -1]} />
        <OrbitControls autoRotateSpeed={0.85} zoomSpeed={0.75} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.55} />
        <Environment preset="city" ground={{ height: 5, radius: 40, scale: 20 }} />
        <ContactShadows renderOrder={2} color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} />
        <BakeShadows />
      </Canvas>
    </Suspense>
  )
}

const Sphere = ({ size = 1, amount = 50, color = 'white', emissive = '', glow = '', ...props }) => (
  <mesh {...props}>
    <sphereGeometry args={[size, 64, 64]} />
    <meshPhysicalMaterial roughness={0} color={color} emissive={emissive || color} envMapIntensity={0.2} />
    <Sparkles count={amount} scale={size * 2} size={6} speed={0.4} />
    <Shadow rotation={[-Math.PI / 2, 0, 0]} scale={size} position={[0, -size, 0]} color={emissive} opacity={0.5} />
  </mesh>
)