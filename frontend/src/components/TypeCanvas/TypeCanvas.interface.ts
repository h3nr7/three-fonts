import { Glyph } from "opentype.js"
import { FontObject } from "../FontGrid/FontGrid.interface"
import { MouseEventHandler } from "react"

export interface TypeCanvasProps {
  glyph?: Glyph
  fontSize?: number
  fontObj: FontObject
  pad?: number
  color?: string
  onClick?: MouseEventHandler
}