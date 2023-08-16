import { useBox } from "@react-three/cannon"
import { useRef } from "react"
import { Mesh } from "three"


export function Speaker() {
  
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 10], rotation:[Math.PI/5, Math.PI/7, 0] }), useRef<Mesh>(null))

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshPhongMaterial />
    </mesh>
  )
}