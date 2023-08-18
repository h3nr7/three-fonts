import { Canvas, Object3DNode, extend } from '@react-three/fiber';
import { 
  CameraControls,
  OrbitControls, 
  Shadow, Sparkles, Grid, AccumulativeShadows, RandomizedLight, Stage, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Texter } from './Elements/Texter/Texter';
import { Vector3 } from 'three';
import { Forest } from './scenes/Forest';
import { Background } from './scenes/Background';
import { Lighting } from './scenes/Lighting';
import { CamControls } from './scenes/CamControls';
import { Physics, useBox } from '@react-three/cannon'
import './ThreeFiber.interface';
import { Speaker } from './scenes/Speaker';
import { Typewriter } from './scenes/Typewriter';


export function ThreeFiber() {

  // const cam = useMemo(() => {
  //   const cam = new PerspectiveCamera(8, window.innerWidth/window.innerHeight, 50, 300);
  //   cam.position.setFromSphericalCoords(70, Math.PI / 2.5, 0);
  //   cam.position.setFromCylindricalCoords(70, Math.PI / 2.5, 70)
  //   console.log(cam.position);
  //   return cam;
  // }, []);

  return (
    <Canvas 
      shadows
      // frameloop="demand"
      style={{
        position: 'fixed', top: '0px', left: '0px',
        width: '100vw', height: '100vh',
        zIndex: 0
      }} 
    >
      <color args={['#ffffff']} attach='background' />
      <CamControls /> 
      <Suspense> 
        <Physics>
          <Speaker />
          <Typewriter />
          <Forest />
          <Lighting />
          <Background />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

