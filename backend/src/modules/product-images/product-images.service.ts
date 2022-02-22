import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImagesDto } from './dto/product-images.dto';
import { ProductImagesInput } from './inputs/create-product-image.input';
import { ProductImages } from './models/product-images.entity';

@Injectable()
export class ProductImagesService {
    constructor(
        @InjectRepository(ProductImages)
        private productImagesRepository: Repository<ProductImages>) { }

    async getImagesById(id: number): Promise<ProductImages> {
        return await this.productImagesRepository.findOne(id);
    }

    async getImagesByUuid1c(uuid: string): Promise<ProductImages> {
        return await this.productImagesRepository.findOne({ where: { uuid_1c: uuid } });
    }
    async getImagesByProductId(id: number): Promise<ProductImages[]> {
        return await this.productImagesRepository.find({ where: { productId: id } });
    }

    async getDefaultImagesByProductId(id: number): Promise<ProductImages> {
        return await this.productImagesRepository.findOne({ where: { productId: id, default: true } });
    }

    async createProductImages(data: ProductImagesInput): Promise<ProductImagesDto> {
        return await this.productImagesRepository.save(data);
    }
}
