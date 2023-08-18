import { FontNames, Table } from "opentype.js"

export interface FontfaceGlyphset {
  ha: number
  x_min: number
  x_max: number
  o: string
}

export interface FontfaceJson {
  glyphs: Record<symbol | string, FontfaceGlyphset>
  familyName: string
  names: FontNames
  ascender: number
  descender: number
  underlinePosition: number
  underlineThickness: number
  boundingBox: {
      yMin: number
      xMin: number
      yMax: number
      xMax: number
  }
  resolution: number
  original_font_information: { [tableName: string]: Table }
  cssFontWeight?: string
  cssFontStyle?: string

}