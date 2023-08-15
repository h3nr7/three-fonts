import { Font, FontNames, GlyphSet, PathCommand } from "opentype.js";
import { Shape, ShapePath } from "three";
import { Font3DBoundingBox } from "./Font3D.interface";


export class Font3D {

  font: Font;
  glyphs: GlyphSet;
  totGlyphs: number;
  names: FontNames;
  resolution: number;
  scale: number;
  boundingBox: Font3DBoundingBox;
  underlineThickness: number;
  reversed:boolean;
  inverted:boolean;

  constructor( font: Font, reversed: boolean = false, inverted = false ) {
    this.font = font;
    this.glyphs = font.glyphs;
    this.totGlyphs = font.glyphs.length;
    this.names = font.names;
    this.resolution = 1000;
    // calculate normalised scaling with resolution 1000.
    this.scale = (this.resolution) / ( (font.unitsPerEm || 2048) *72);
    this.boundingBox = {
      xMin: Math.round(font.tables.head.xMin * this.scale),
      xMax: Math.round(font.tables.head.xMax * this.scale),
      yMin: Math.round(font.tables.head.yMin * this.scale),
      yMax: Math.round(font.tables.head.yMax * this.scale)
    }
    this.underlineThickness = Math.round(font.tables.post.underlineThickness * this.scale);
    this.reversed = reversed;
    this.inverted = inverted;
  }


  /**
   * generate shapes from text
   * @param text 
   * @param size 
   * @param isCCW 
   */
  generateShapes(text: string, size:number = 100) {

    const shapes:Shape[] = [];
		const paths = this.createPaths(text, size);
    const len = this.totGlyphs;

    for (let p = 0, pl = len; p < pl; p ++) {

			if(paths[p]) shapes.push( ...paths[p].toShapes(this.inverted) );
      else console.error('shape not exist: ', paths[p]);

		}

    return shapes;
  }


  /**
   * get character to glyph index
   * @param s 
   * @returns 
   */
  private charToGlyphIndex = (s:string) => this.font.charToGlyphIndex(s);


  /**
   * create paths for each character in text
   * @param text 
   * @param size 
   */
  private createPaths(text: string, size: number) {
    const chars = Array.from(text);
    const localScale = size / this.resolution;
    const lineHeight = (this.boundingBox.yMax - this.boundingBox.yMin + this.underlineThickness ) * localScale;
    const paths = [];

    let offsetX = 0, offsetY = 0;
  
    for (let i = 0; i < chars.length; i ++) {
  
      const char = chars[i];
  
      if (char === '\n') {
        offsetX = 0;
        offsetY -= lineHeight;

      } else {
        const ret = this.createPath(char, localScale, offsetX, offsetY);
        offsetX += ret.offsetX;
        paths.push( ret.path );
  
      }
    }

    return paths;
  }
  


  /**
   * create path for individual character
   * @param char 
   * @param localScale 
   * @param offsetX 
   * @param offsetY 
   * @returns 
   */
  private createPath(char: string, localScale: number, offsetX: number, offsetY: number) {
    
    const index = this.charToGlyphIndex(char);
    const glyph = this.glyphs.get(index);

    offsetX = Math.round((glyph.advanceWidth || 0) * this.scale);

    // reverse the path commands if true
    if(this.reversed) glyph.path.commands = this.reverseCommands(glyph.path.commands);

    const path = new ShapePath();

    glyph.path.commands.forEach(command => {

      switch(command.type) {
        case 'C':
          let c = this.calculateScaledXYPaths(command.x, command.y, localScale, offsetX, offsetY);
          let c1 = this.calculateScaledXYPaths(command.x1, command.y1, localScale, offsetX, offsetY);
          let c2 = this.calculateScaledXYPaths(command.x2, command.y2, localScale, offsetX, offsetY);

          path.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, c.x, c.y);
          // path.lineTo(c.x, c.y);

          break;
        case 'L':
          let l = this.calculateScaledXYPaths(command.x, command.y, localScale, offsetX, offsetY);  
          
          path.lineTo(l.x, l.y);
          break;
        case 'M':
          let m = this.calculateScaledXYPaths(command.x, command.y, localScale, offsetX, offsetY);  

          path.moveTo(m.x, m.y);
          break;
        case 'Q':
          let q = this.calculateScaledXYPaths(command.x, command.y, localScale, offsetX, offsetY);  
          let q1 = this.calculateScaledXYPaths(command.x1, command.y1, localScale, offsetX, offsetY);  

          path.quadraticCurveTo(q1.x, q1.y, q.x, q.y);
          break;
        case 'Z':
          // no action here.
          break;
      }
    });

    return {path, offsetX};
  }


  /**
   * calculate the scaled XY paths
   * @param x 
   * @param y 
   * @param localScale 
   * @param offsetX 
   * @param offsetY 
   * @returns 
   */
  private calculateScaledXYPaths(
    x: number, y: number, 
    localScale: number, 
    offsetX: number, offsetY: number
  ) {  
    if(x !== undefined && y !== undefined) {
      x = Math.round(x * this.scale) * localScale + offsetX;
      y = Math.round(y * this.scale) * localScale + offsetY;
    }
    return {x, y};
  }


  /**
   * function to reverse the path commands
   * @param commands 
   * @returns 
   */
  reverseCommands(commands: PathCommand[]) {

    let paths:Array<PathCommand[]>=[], path:PathCommand[];

    commands.forEach(cmd => {
      switch (cmd.type) {
        case 'M':
          path = [cmd];
          paths.push(path);
          break;
        case "L":
        case "C":
        case "Q":
          path.push(cmd);
          break;
        case "Z":
          break;
      }
    });

    let reversed:PathCommand[] = [];
    paths.forEach(p => {

      const t = p[p.length-1];
      if(t.type !== 'Z') {
        reversed.push({type:"M" , x:t.x, y: t.y});
      }
      
      for(let i = p.length - 1;i > 0; i-- ){
          let command = p[i];
          let result:PathCommand;
          switch(command.type) {
            case 'C':
              reversed.push({
                type: command.type,
                x1: command.x2,
                y1: command.y2,
                x2: command.x1,
                y2: command.y1,
                x: command.x,
                y: command.y
              })
              break;
            case 'Q':
              reversed.push({
                type: command.type,
                x1: command.x1,
                y1: command.y1,
                x: command.x,
                y: command.y
              });
              break;
            case 'L':
            case 'M':
              reversed.push({
                type: command.type,
                x: command.x,
                y: command.y
              });
              break;
            case 'Z':
              break;
          }
      }
    });

    // return the reversed commands
    return reversed;
  }
}