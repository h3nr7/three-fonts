import { Object3DNode, extend } from "@react-three/fiber";
import { TextGeometry } from "./Geometry/TextGeometry";
extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
