import { Injectable } from '@nestjs/common';
import { Font, parse } from 'opentype.js';
import { decompress } from 'wawoff2';
@Injectable()
export class AppService {
  async convertToFont(buffer:Buffer): Promise<Font> {
    try {
      const decomp = await decompress(new Uint8Array(buffer.buffer));
      // When using array.buffer it's important use byteOffset and 
      // byteLength to compute the actual data
      const arrBuffer = decomp.buffer.slice(decomp.byteOffset, decomp.byteLength + decomp.byteOffset);
      const font = await parse(arrBuffer);
      return font;
    } catch(e) {
      console.error('upload error: ', e);
      throw e;
    
    }
  }

}
