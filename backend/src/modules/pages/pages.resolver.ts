import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pages } from './models/pages.entity';
import { PagesService } from './pages.service';

@Resolver()
export class PagesResolver {
    constructor(
        private readonly pagesService: PagesService,
    ) { }

    @Query(returns => Pages)
    async getPageById(@Args('id') id: number): Promise<Pages> {

        const page = await this.pagesService.getPageById(id);
        if (!page) {
            throw new NotFoundException(id);
        }
        return page;
    }
    @Query(returns => [Pages])
    async getAllPages(): Promise<Pages[]> {

        const pages = await this.pagesService.getAllPages();
        if (!pages) {
            throw new NotFoundException();
        }
        return pages;
    }

}
