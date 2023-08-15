
import { ExtrudeGeometry, ExtrudeGeometryOptions, Shape, Vector2 } from "three";
import { Font3D } from './Font3D';
import { Font } from "opentype.js";

interface TextGeometryParams {
  font?: Font
  size?: number
  height?: number
  reversed?: boolean
  inverted?: boolean
  bevelThickness?: number
  bevelSize?: number
  bevelEnabled?: boolean
}

export class TextGeometry extends ExtrudeGeometry implements ExtrudeGeometry {

  /**
   * vars
   */
  type:string;

  /**
   * constructor
   * @param text 
   * @param parameters 
   */
  constructor(text: string, parameters: TextGeometryParams = {}) {
    
    const font = parameters?.font;
    const { height, reversed, inverted, ...restParameters } = parameters;
    const params:ExtrudeGeometryOptions = {
      ...restParameters,
    };

    if(!font) {
      super();
    } else {
      const font3d = new Font3D(font, reversed, inverted);
      const shapes = font3d.generateShapes( text, parameters.size );

      params.depth = height !== undefined ? height : 50;

			// defaults
			if ( params.bevelThickness === undefined ) params.bevelThickness = 10;
			if ( params.bevelSize === undefined ) params.bevelSize = 8;
			if ( params.bevelEnabled === undefined ) params.bevelEnabled = false;

			super( shapes, params );
    }

    this.type = 'TextGeometry';

  }
}