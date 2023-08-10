import { Injectable } from '@nestjs/common';
import { Font, parse } from 'opentype.js';
import { decompress } from 'wawoff2';
import { fromBuffer } from 'file-type'
@Injectable()
export class AppService {

  /**
   * convert file to font
   * @param buffer 
   * @returns 
   */
  async convertToFont(buffer:Buffer): Promise<Font> {
    try {

      const fileType = await fromBuffer(buffer);
      let font:Font;
      switch(fileType.ext) {
        case 'woff2':
          const decomp = await decompress(new Uint8Array(buffer.buffer));
          // When using array.buffer it's important use byteOffset and 
          // byteLength to compute the actual data
          const arrBuffer = decomp.buffer.slice(decomp.byteOffset, decomp.byteLength + decomp.byteOffset);
          font = await parse(arrBuffer);
          break;
        case 'woff':
        case 'ttf':
          // When using array.buffer it's important use byteOffset and 
          // byteLength to compute the actual data
          const aBuf = buffer.buffer.slice(buffer.byteOffset, buffer.byteLength + buffer.byteOffset);
          font = await parse(aBuf);
          break;
        default:
          throw new Error(`file type ${fileType.ext} is not supported`);
      }

      // return font
      return font;

    } catch(e) {
      throw e;
    }
  }

}
