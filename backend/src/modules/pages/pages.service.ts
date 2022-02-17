import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pages } from './models/pages.entity';

@Injectable()
export class PagesService {

    constructor(@InjectRepository(Pages)
    private pagesRepository: Repository<Pages>) { }

    async getPageById(id: number): Promise<Pages> {
        return await this.pagesRepository.findOne(id);
    }

    async getAllPages(): Promise<Pages[]> {
        return await this.pagesRepository.find();
    }
}
