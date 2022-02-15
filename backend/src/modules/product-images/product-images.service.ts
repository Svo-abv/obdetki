import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImages } from './models/product-images.entity';

@Injectable()
export class ProductImagesService {
    constructor(
        @InjectRepository(ProductImages)
        private productImagesRepository: Repository<ProductImages>) { }

    async getImagesById(id: number): Promise<ProductImages> {
        return await this.productImagesRepository.findOne(id);
    }

    async getImagesByProductId(id: number): Promise<ProductImages[]> {
        return await this.productImagesRepository.find({ where: { product: id } });
    }
}
