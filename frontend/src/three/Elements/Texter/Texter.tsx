import { Center } from "@react-three/drei";
import { useStore } from "../../../stores/store";
import { TexterProps } from "./Texter.interface";
import { useState } from "react";
import { Vector3 } from "three";


export function Texter({ text = 'HENRY, MAY & COCOA', size, position, ref }: TexterProps) {

  const { json } = useStore();
  const [fontSize, setFontSize] = useState(size || 1);
  const [pos, setPos] = useState<Vector3>(position || new Vector3(0, fontSize/2, 0))

  return json && (
    <Center position={pos}>
      <mesh ref={ref} castShadow>
        <textGeometry args={[text, { font: json, size: fontSize, height: 0.5, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.05 }]}/>
        <meshNormalMaterial /> 
      </mesh>
    </Center>
  );
}