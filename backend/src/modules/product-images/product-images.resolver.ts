import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductImages } from './models/product-images.entity';
import { ProductImagesService } from './product-images.service';

@Resolver()
export class ProductImagesResolver {
    constructor(
        private readonly productImagesService: ProductImagesService,
    ) { }
    @Query(returns => ProductImages)
    async getImagesById(@Args('id') id: number): Promise<ProductImages> {

        const img = await this.productImagesService.getImagesById(id);
        if (!img) {
            throw new NotFoundException(id);
        }
        return img;
    }

    @Query(returns => [ProductImages], { nullable: true })
    async getImagesByProductId(@Args('id') id: number): Promise<ProductImages[]> {

        const img = await this.productImagesService.getImagesByProductId(id);
        console.log(img);
        if (!img) {
            throw new NotFoundException(id);
        }
        return img;
    }
}
