import { Center } from "@react-three/drei";
import { useFontStore } from "../../../stores/fontStore";
import { TexterProps } from "./Texter.interface";


export function Texter({ text = 'HENRY, MAY & COCOA', position }: TexterProps) {

  const { font, json } = useFontStore();

  return (
    <Center position={position}>
      <mesh castShadow>
        <textGeometry args={[text, { font: json, size: 1, height: 0.5, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.05 }]}/>
        <meshNormalMaterial /> 
      </mesh>
    </Center>
  );
}