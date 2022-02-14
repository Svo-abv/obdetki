import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesResolver } from './pages.resolver';

@Module({
  providers: [PagesService, PagesResolver]
})
export class PagesModule { }
