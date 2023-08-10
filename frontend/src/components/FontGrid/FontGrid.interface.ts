import { Font, GlyphSet } from "opentype.js";

export interface FontGridProps {
  font?: Font
}

export interface FontObject {
  ascender: number 
  descender: number
  unitsPerEm: number
}

export interface GlyphsetGrid {
  glyphset?:GlyphSet
  fontObj: FontObject
}