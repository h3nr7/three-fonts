import { useBox } from "@react-three/cannon";
import { Mesh, Vector3 } from "three";
import { Texter } from "../Elements/Texter/Texter";
import { useRef } from "react";


export function Letters() {

  return (
    <Texter position={new Vector3(0, 0.5, 0)}/>
  );
}