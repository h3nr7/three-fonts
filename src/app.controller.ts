import { 
  Controller, Get, Post, Body, Query,
  UseInterceptors, StreamableFile ,
  UploadedFile,
  ParseFilePipeBuilder
} from '@nestjs/common';
import { Readable } from 'node:stream'
import { readdir, readFile } from 'node:fs/promises'
import { AppService } from './app.service';
import { FontResponse } from './app.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'node:path';

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

  @Get('api/fonts')
  async getList() {
    const fontFiles = await readdir(join(__dirname, '..', 'public/fonts'));
    return fontFiles;
  }

  @Get('api/fonts/json')
  async getOneJson(
    @Query('name') name:string
  ) {
    const filePath = join(__dirname, '..', 'public/fonts', name);
    console.log('hahaha: ', filePath);
    const fileBuffer = await readFile(filePath);
    const font = await this.appService.convertToFont(fileBuffer);
    return new StreamableFile(new Uint8Array(font.toArrayBuffer()));
  }

}
