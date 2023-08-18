/**
* Fontface class rewritten in ES6 typescript originally from fontface.js
*/
import { Font, FontOptions, PathCommand } from "opentype.js";
import { FontfaceGlyphset, FontfaceJson } from "./Fontface.interface";


/**
 * convert font
 * @param font 
 * @param reverse 
 * @returns 
 */
export function convert(font:Font, reverse = false) {
    const scale = (1000 * 100) / ( (font.unitsPerEm || 2048) *72);
    let result:Partial<FontfaceJson> = {};
    let len = font.glyphs.length;

    for (let i=0; i < len; i++) {
        const glyph = font.glyphs.get(i);
        const unicodes = [];
        if (glyph.unicode !== undefined) {
            unicodes.push(glyph.unicode);
        }
        if (glyph.unicodes.length) {
            glyph.unicodes.forEach(function(unicode){
                if (unicodes.indexOf (unicode) == -1) {
                    unicodes.push(unicode);
                }
            })
        }

        unicodes.forEach(function(unicode) {

          let token:Partial<FontfaceGlyphset> = {};
          token.ha = Math.round(glyph.advanceWidth * scale);
          token.x_min = Math.round(glyph.xMin * scale);
          token.x_max = Math.round(glyph.xMax * scale);
          token.o = "";
          
          if (reverse) { glyph.path.commands = reverseCommands(glyph.path.commands); }
          glyph.path.commands.forEach(function(c,i) {
            switch(c.type) {
                case 'C':
                    // modify C to b as it is used in threejs, extremely weird
                    // and absolutely pointless conversion
                    token.o += 'b';
                    token.o += ' ' + xyToCalculatedTokenString(c.x, c.y, scale);
                    token.o += xyToCalculatedTokenString(c.x1, c.y1, scale);
                    token.o += xyToCalculatedTokenString(c.x2, c.y2, scale);
                    break;
                case 'L':
                    token.o += c.type.toLowerCase();
                    token.o += ' ' + xyToCalculatedTokenString(c.x, c.y, scale);
                    break;
                case 'M':
                    token.o += c.type.toLowerCase();
                    token.o += ' ' + xyToCalculatedTokenString(c.x, c.y, scale);
                    break;
                case 'Q':
                    token.o += c.type.toLowerCase();
                    token.o += ' ' + xyToCalculatedTokenString(c.x, c.y, scale);
                    token.o += xyToCalculatedTokenString(c.x1, c.y1, scale);
                    break;
                case 'Z':
            }         
          });
        
            // doing this because symbols like !@#$%^&*() or even a space is treated as
            //  undefined before assignment.  
            // The object stored at d[a] has not been set to anything. 
            // Thus, d[a] evaluates to undefined. You can't assign a property to undefined
            // As described here in this link
            // https://stackoverflow.com/a/7479541/1118025
            result.glyphs = {...result.glyphs, [String.fromCharCode(unicode)]: token as FontfaceGlyphset };
        });
    }

    result.familyName = font.names.fontFamily['en'];
    result.names = font.names;
    result.ascender = Math.round(font.ascender * scale);
    result.descender = Math.round(font.descender * scale);
    result.underlinePosition = Math.round(font.tables.post.underlinePosition * scale);
    result.underlineThickness = Math.round(font.tables.post.underlineThickness * scale);
    result.boundingBox = {
        "yMin": Math.round(font.tables.head.yMin * scale),
        "xMin": Math.round(font.tables.head.xMin * scale),
        "yMax": Math.round(font.tables.head.yMax * scale),
        "xMax": Math.round(font.tables.head.xMax * scale)
    };
    result.resolution = 1000;
    result.original_font_information = font.tables.name;
    
    if((font as unknown as FontOptions).styleName) {
        const fo = font as unknown as FontOptions;
        if (fo.styleName.toLowerCase().indexOf("bold") > -1){
            result.cssFontWeight = "bold";
        } else {
            result.cssFontWeight = "normal";
        };

        if (fo.styleName.toLowerCase().indexOf("italic") > -1){
            result.cssFontStyle = "italic";
        } else {
            result.cssFontStyle = "normal";
        };
    }

    return JSON.stringify(result);
}


/**
   * reverse font commands
   * @param path 
   */
function reverseCommands(commands: PathCommand[]) {
  let paths = [];
  let path;
  
  commands.forEach(function(c){
      if (c.type === "M"){
          path = [c];
          paths.push(path);
      } else if (c.type !== "Z") {
          path.push(c);
      }
  });
  
  let reversed:PathCommand[] = [];
  paths.forEach(function(p){
      // initial push for first one
      reversed.push({
          type: "M", 
          x : p[p.length-1].x, 
          y: p[p.length-1].y
      });
      
      // subsequence push
      for(let i = p.length-1; i>0; i--){
          let command = p[i] as PathCommand;
          let result:PathCommand;

          switch(command.type) {
              case 'C':
                  result = {
                      type: command.type,
                      x: p[i-1].x,
                      y: p[i-1].y,
                      x1: command.x2,
                      y1: command.y2,
                      x2: command.x1,
                      y2: command.y1
                  }
                  break;
              case 'M':
              case 'L':
                  result = {
                      type: command.type,
                      x: p[i-1].x,
                      y: p[i-1].y
                  }
                  break;
              case 'Q':
                  result = {
                      type: command.type,
                      x: p[i-1].x,
                      y: p[i-1].y,
                      x1: command.x1,
                      y1: command.y1
                  }
                  break;
              case 'Z':
                  break;
          }
          reversed.push(result);
      }
  });
  
  return reversed;
}


/**
* convert xy to svg string
* @param x 
* @param y 
* @param scale 
* @returns 
*/
function xyToCalculatedTokenString(x: number, y: number, scale: number): string {
  return `${Math.round(x * scale)} ${Math.round(y * scale)} ` 
}

