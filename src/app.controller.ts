import { 
  Controller, Get, Post, Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder
} from '@nestjs/common';
import { AppService } from './app.service';
import { FontResponse } from './app.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('api/fonts/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(ttf|woff|woff2)$/
        })
        .build({
          fileIsRequired: true
        })
    ) file:Express.Multer.File
  ): Promise<FontResponse> {
    const font = await this.appService.convertToFont(file.buffer);
    
    console.log(font.toTables())

    return font.toTables()
  
  }


}
