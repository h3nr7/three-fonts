import { Canvas, Object3DNode, extend } from '@react-three/fiber';
import { 
  CameraControls,
  Backdrop, BakeShadows, Box, 
  ContactShadows, Environment, OrbitControls, 
  Shadow, Sparkles, Grid, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFontStore } from '../stores/fontStore';
import { Fontface } from './Elements/Fontface/Fontface';
import { TextGeometry } from './Geometry/TextGeometry';
import { Texter } from './Elements/Texter/Texter';
import { Vector3 } from 'three';
import { attach } from '@react-three/fiber/dist/declarations/src/core/utils';
extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

const DEG45 = Math.PI / 4;

export function ThreeFiber() {

  const camControlRef = useRef<CameraControls>(null);
  const location = useLocation();

  useEffect(() => {
    camControlRef.current?.rotate(DEG45, 0, true);
  }, [location.pathname]);

  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas 
        shadows
        frameloop="demand"
        camera={{ position: [0, -70, 12], fov: 10, zoom: 1 }}
        style={{
          position: 'fixed', top: '0px', left: '0px',
          width: '100vw', height: '100vh',
          zIndex: 0
        }} >
        <color args={['#ffffff']} attach='background' />
        <CameraControls ref={camControlRef}/>
        <OrbitControls autoRotateSpeed={0.85} zoomSpeed={0.75} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.55} />
        <Texter position={new Vector3(0, 0.5, 0)}/>
        <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.8} color="white" scale={200} position={[0, -0.005, 0]}>
          <RandomizedLight amount={8} radius={6} ambient={0.5} intensity={1} position={[-1.5, 2.5, -2.5]} bias={0.001} />
        </AccumulativeShadows>
        <Grid args={[50, 50]} sectionColor={'#0168f9'} cellColor={'#ff00e1'}/>
        {/* <Sphere color="white" amount={50} emissive='green' glow='lightgreen' position={[1, 1, -1]} /> */}
        {/* <Environment preset="city" ground={{ height: 5, radius: 40, scale: 20 }} /> */}
        {/* <ContactShadows renderOrder={2} color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} /> */}
        {/* <BakeShadows /> */}
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