import { CameraControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Camera, Vector3 } from "three";

const DEG45 = Math.PI / 4;

export function CamControls() {


  const { camera, gl } = useThree();

  const controlRef = useRef<CameraControls>(null);
  // const location = useLocation();
  
  const initialCamPos = new Vector3(0, -70, 12);
  camera.position.copy(initialCamPos);

  useEffect(() => {
    // position: [0, -70, 12], fov: 8, zoom: 1
    controlRef.current?.rotate(DEG45, 0, true);
  }, [location.pathname]);

  return (
    <group>
      <PerspectiveCamera 
        makeDefault 
        args={[8, window.innerWidth/window.innerHeight, 50, 1000]} 
      />
      <CameraControls
        ref={controlRef}
      />
      <OrbitControls
        args={[camera, gl.domElement]}
        target={[0, 0, 0]}
        autoRotateSpeed={0.85} 
        zoomSpeed={0.75} 
        minDistance={70}
        maxDistance={300}
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 2.55} />
    </group>
  )
}