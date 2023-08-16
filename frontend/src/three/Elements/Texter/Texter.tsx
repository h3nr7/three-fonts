import { Center } from "@react-three/drei";
import { useFontStore } from "../../../stores/fontStore";
import { TexterProps } from "./Texter.interface";


export function Texter({ text = 'HENRY, MAY & COCOA', position, ref }: TexterProps) {

  const { json } = useFontStore();

  return json && (
    <Center position={position}>
      <mesh ref={ref} castShadow>
        <textGeometry args={[text, { font: json, size: 1, height: 0.5, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.05 }]}/>
        <meshNormalMaterial /> 
      </mesh>
    </Center>
  );
}