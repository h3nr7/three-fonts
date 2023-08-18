/**
 * This is a direct copy and modification from facetype.js
 * @param {*} font 
 * @param {*} reverseTypeface 
 * @returns 
 */

export function convert(font, reverseTypeface = false){

    let scale = (1000 * 100) / ( (font.unitsPerEm || 2048) *72);
    let result = {};
    result.glyphs = {};
	
    let len = font.glyphs.length;

    // console.log(font);

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
				var token = {};
				token.ha = Math.round(glyph.advanceWidth * scale);
				token.x_min = Math.round(glyph.xMin * scale);
				token.x_max = Math.round(glyph.xMax * scale);
				token.o = ""
				if (reverseTypeface) {glyph.path.commands = reverseCommands(glyph.path.commands);}
				glyph.path.commands.forEach(function(command,i){
					if (command.type.toLowerCase() === "c") {command.type = "b";}
					token.o += command.type.toLowerCase();
					token.o += " "
					if (command.x !== undefined && command.y !== undefined){
						token.o += Math.round(command.x * scale);
						token.o += " "
						token.o += Math.round(command.y * scale);
						token.o += " "
					}
					if (command.x1 !== undefined && command.y1 !== undefined){
						token.o += Math.round(command.x1 * scale);
						token.o += " "
						token.o += Math.round(command.y1 * scale);
						token.o += " "
					}
					if (command.x2 !== undefined && command.y2 !== undefined){
						token.o += Math.round(command.x2 * scale);
						token.o += " "
						token.o += Math.round(command.y2 * scale);
						token.o += " "
					}
				});
				result.glyphs[String.fromCharCode(unicode)] = token;
        });
    };

    result.familyName = font.familyName;
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

    if(font.styleName) {
        if (font.styleName.toLowerCase().indexOf("bold") > -1){
            result.cssFontWeight = "bold";
        } else {
            result.cssFontWeight = "normal";
        };

        if (font.styleName.toLowerCase().indexOf("italic") > -1){
            result.cssFontStyle = "italic";
        } else {
            result.cssFontStyle = "normal";
        };
    }

    return JSON.stringify(result);
};



var reverseCommands = function(commands){
    
    var paths = [];
    var path;
    
    commands.forEach(function(c){
        if (c.type.toLowerCase() === "m"){
            path = [c];
            paths.push(path);
        } else if (c.type.toLowerCase() !== "z") {
            path.push(c);
        }
    });
    
    var reversed = [];
    paths.forEach(function(p){
        var result = {"type":"m" , "x" : p[p.length-1].x, "y": p[p.length-1].y};
        reversed.push(result);
        
        for(var i = p.length - 1;i > 0; i-- ){
            var command = p[i];
            result = {"type":command.type};
            if (command.x2 !== undefined && command.y2 !== undefined){
                result.x1 = command.x2;
                result.y1 = command.y2;
                result.x2 = command.x1;
                result.y2 = command.y1;
            } else if (command.x1 !== undefined && command.y1 !== undefined){
                result.x1 = command.x1;
                result.y1 = command.y1;
            }
            result.x =  p[i-1].x;
            result.y =  p[i-1].y;
            reversed.push(result);
        }
        
    });
    
    return reversed;
    
};