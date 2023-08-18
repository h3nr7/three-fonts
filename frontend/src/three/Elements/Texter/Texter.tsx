import { Center } from "@react-three/drei";
import { useStore } from "../../../stores/store";
import { TexterProps } from "./Texter.interface";
import { useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { useSpring } from '@react-spring/three'


export function Texter({ text = 'HENRY, MAY & COCOA', size, position, ref }: TexterProps) {

  const groupRef = useRef<Group>(null);
  const { json } = useStore();
  const [active, setActive] = useState(0);
  const [fontSize, setFontSize] = useState(size || 1);
  const [pos, setPos] = useState<Vector3>(position || new Vector3(0, fontSize/2, 0));

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  });

  const springPos = spring.to([0, 1, 3], [0, 1, 0]);

  return json && (
    <Center ref={groupRef} position={pos}>
      <mesh ref={ref} castShadow>
        <textGeometry args={[text, { font: json, size: fontSize, height: 0.5, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.05 }]}/>
        <meshNormalMaterial /> 
      </mesh>
    </Center>
  );
}