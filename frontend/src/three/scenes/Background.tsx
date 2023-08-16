import { usePlane } from "@react-three/cannon";
import { Grid, Stage } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";


export function Background() {

  const [ref] = usePlane(() => ({ position:[0, 0, 0.1], rotation:[-Math.PI / 2, 0, 0] }), useRef<Mesh>(null))

  return (
    <group>
      <Grid
        fadeDistance={250}
        args={[200, 200]} 
        sectionColor={'#0168f9'} 
        cellColor={'#ff00e1'}/>
      <mesh ref={ref} visible={false}>
        <planeGeometry args={[200, 200]} />
      </mesh>
    </group>
  )
}