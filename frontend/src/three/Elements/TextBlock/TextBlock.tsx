import { Box, Wireframe } from "@react-three/drei";
import { TextGeometry } from './TextGeometry';
import { PropsWithChildren } from "react";
import { TextBlockProps } from "./TextBlock.interface";
import { BoxGeometry } from "three";

export function TextBlock({ 
  text, font, children,
  position, height, 
  reversed, inverted
}: PropsWithChildren<TextBlockProps>) {

  const geometry = new TextGeometry(text, { font, height, reversed, inverted });
  const box = new BoxGeometry(3, 3);
  return (
    <mesh geometry={geometry} position={position}>
        {children}
        {/* <Wireframe /> */}
        {/* <meshPhysicalMaterial roughness={0} color={'red'} emissive={'green'} envMapIntensity={0.2} /> */}
    </mesh>
    // <Box position={[Math.random()*5, Math.random()*5, Math.random()*5]}/>
  );
}