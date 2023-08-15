import {
	FileLoader,
	Loader,
	LoadingManager,
	ShapePath
} from 'three';



class FontLoader extends Loader {

	constructor(manager:LoadingManager) {

		super( manager );

	}

	load(
    url: string, 
    onLoad?: (font:Font) => void, 
    onProgress?: (request: ProgressEvent<EventTarget>) => void, 
    onError?: (event: ErrorEvent) => void
  ) {

		const scope = this;

		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );
		loader.load( url, text => {

			const font = scope.parse( JSON.parse( text as string ) );

			if ( onLoad ) onLoad( font );

		}, onProgress, onError );

	}

	parse(json: FontDataParams) {

		return new Font(json);

	}

}

interface JsonGlyph {
  o: string
  ha: number
  _cachedOutline: string[]
}

interface FontDataParams {
  resolution: number
  boundingBox: FontBoundingBox
  glyphs: Record<string, JsonGlyph>
  familyName: string
  underlineThickness: number
}

interface FontBoundingBox {
  xMin: number
  yMin: number
  xMax: number
  yMax: number
}

class Font {

  isFont:boolean;
  data: FontDataParams;
  type: string;

	constructor( data:FontDataParams ) {

		this.isFont = true;
		this.type = 'Font';
		this.data = data;
	}

	generateShapes(text: string, size = 100, isCCW = false) {

		const shapes = [];
		const paths = createPaths( text, size, this.data );

		for ( let p = 0, pl = paths.length; p < pl; p ++ ) {

			shapes.push( ...paths[ p ].toShapes(isCCW) );

		}

		return shapes;

	}

}

function createPaths(text: string, size: number, data:FontDataParams ) {

	const chars = Array.from( text );
	const scale = size / data.resolution;
	const line_height = ( data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness ) * scale;

	const paths = [];

	let offsetX = 0, offsetY = 0;

	for ( let i = 0; i < chars.length; i ++ ) {

		const char = chars[ i ];

		if ( char === '\n' ) {

			offsetX = 0;
			offsetY -= line_height;

		} else {

			const ret = createPath( char, scale, offsetX, offsetY, data );
			
      if(ret) {
        offsetX += ret.offsetX;
			  paths.push( ret.path );
      }

		}

	}

	return paths;

}



function createPath(
  char: string, scale: number, 
  offsetX: number, offsetY: number, 
  data: FontDataParams
) {


	const glyph = data.glyphs[ char ] || data.glyphs[ '?' ];

	if ( ! glyph ) {

		console.error( 'THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + '.' );

		return;

	}

	const path = new ShapePath();

	let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;

	if ( glyph.o ) {

		const outline = glyph._cachedOutline || ( glyph._cachedOutline = glyph.o.split( ' ' ) );

		for ( let i = 0, l = outline.length; i < l; ) {

			const action = outline[ i ++ ];

			switch ( action ) {

				case 'm': // moveTo

					x = Number(outline[ i ++ ]) * scale + offsetX;
					y = Number(outline[ i ++ ]) * scale + offsetY;

					path.moveTo( x, y );

					break;

				case 'l': // lineTo

					x = Number(outline[ i ++ ]) * scale + offsetX;
					y = Number(outline[ i ++ ]) * scale + offsetY;

					path.lineTo( x, y );

					break;

				case 'q': // quadraticCurveTo

					cpx = Number(outline[ i ++ ]) * scale + offsetX;
					cpy = Number(outline[ i ++ ]) * scale + offsetY;
					cpx1 = Number(outline[ i ++ ]) * scale + offsetX;
					cpy1 = Number(outline[ i ++ ]) * scale + offsetY;

					path.quadraticCurveTo( cpx1, cpy1, cpx, cpy );

					break;

				case 'b': // bezierCurveTo

					cpx = Number(outline[ i ++ ]) * scale + offsetX;
					cpy = Number(outline[ i ++ ]) * scale + offsetY;
					cpx1 = Number(outline[ i ++ ]) * scale + offsetX;
					cpy1 = Number(outline[ i ++ ]) * scale + offsetY;
					cpx2 = Number(outline[ i ++ ]) * scale + offsetX;
					cpy2 = Number(outline[ i ++ ]) * scale + offsetY;

					path.bezierCurveTo( cpx1, cpy1, cpx2, cpy2, cpx, cpy );

					break;

			}

		}

	}

	return { offsetX: glyph.ha * scale, path: path };

}

export { FontLoader, Font };