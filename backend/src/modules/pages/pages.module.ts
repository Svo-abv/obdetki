import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesResolver } from './pages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pages } from './models/pages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pages,])],
  providers: [PagesService, PagesResolver]
})
export class PagesModule { }
