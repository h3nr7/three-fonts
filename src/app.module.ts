import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const DEV_STATIC_ROOT = join(__dirname, '..', 'public')
const PROD_STATIC_ROOT = join(__dirname, '..', 'public')


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.env.NODE_ENV === 'production' ? PROD_STATIC_ROOT : DEV_STATIC_ROOT
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
