import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import storeUpload from 'src/utils/storeUpload';
import { ProductImagesDto } from './dto/product-images.dto';
import { ProductImagesInput } from './inputs/create-product-image.input';
import { ProductImageUploadInput } from './inputs/product-image-upload.input';
import { ProductImageUploadType } from './models/product-image.type';
import { ProductImages } from './models/product-images.entity';
import { ProductImagesService } from './product-images.service';

@Resolver(of => ProductImages)
export class ProductImagesResolver {
    constructor(
        private readonly productImagesService: ProductImagesService,
    ) { }

    @Query(returns => ProductImages)
    async getImagesById(@Args('id') id: number): Promise<ProductImages> {
        const productImage = await this.productImagesService.getImagesById(id);
        if (!productImage) {
            throw new NotFoundException(id);
        }
        return productImage;
    }

    @Query(returns => [ProductImages], { nullable: true })
    async getImagesByProductId(@Args('id') id: number): Promise<ProductImages[]> {
        const productImages = await this.productImagesService.getImagesByProductId(id);
        if (!productImages) {
            throw new NotFoundException(id);
        }
        return productImages;
    }

    @Query(returns => ProductImages)
    async getImagesByUuid1c(@Args('uuid') uuid: string): Promise<ProductImages> {
        const productImage = await this.productImagesService.getImagesByUuid1c(uuid);
        if (!productImage) {
            throw new NotFoundException(uuid);
        }
        return productImage;
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => ProductImageUploadType, { nullable: true })
    public async UploadProductImage(@Args('file') { file }: ProductImageUploadInput): Promise<ProductImageUploadType> {
        const result: ProductImageUploadType = { success: false };
        await storeUpload(file).then((name) => {
            result.success = true;
            result.filename = name;
            return result;
        });

        return result;
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => ProductImagesDto)
    async CreateProductImages(@Args('data') data: ProductImagesInput): Promise<ProductImagesDto> {
        return this.productImagesService.createProductImages(data);
    }
}
