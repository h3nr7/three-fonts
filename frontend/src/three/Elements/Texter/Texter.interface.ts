import { Ref } from "react"
import { Mesh, Vector3 } from "three"

export interface TexterProps {
  text?: string
  position?: Vector3,
  size?: number,
  ref?: Ref<Mesh>
}