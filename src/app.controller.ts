import { 
  Controller, Get, Post, Body, Query,
  UseInterceptors, StreamableFile ,
  UploadedFile,
  ParseFilePipeBuilder
} from '@nestjs/common';
import { Readable } from 'node:stream'
import { AppService } from './app.service';
import { FontResponse } from './app.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('api/fonts/convert')
  @UseInterceptors(FileInterceptor('file'))
  async convert(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .build({
          fileIsRequired: true
        })
    ) file:Express.Multer.File
  ): Promise<FontResponse | StreamableFile > {

    // convert to type font
    const font = await this.appService.convertToFont(file.buffer);
    console.log(font);
    return new StreamableFile(new Uint8Array(font.toArrayBuffer()));
  
  }


}
