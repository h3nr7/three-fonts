import { Font } from "opentype.js"
import { Vector3 } from "three"

export interface TextBlockProps {
  text: string
  font: Font
  position?: Vector3
  height?: number
  reversed?: boolean
  inverted?: boolean
}