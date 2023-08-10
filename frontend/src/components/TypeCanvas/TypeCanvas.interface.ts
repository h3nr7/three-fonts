import { Glyph } from "opentype.js"
import { FontObject } from "../FontGrid/FontGrid.interface"

export interface TypeCanvasProps {
  glyph?: Glyph
  fontSize?: number
  fontObj: FontObject
  pad?: number
  color?: string
}