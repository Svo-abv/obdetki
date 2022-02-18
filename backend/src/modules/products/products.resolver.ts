import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { ProductBrands } from '../product-brands/models/product-brands.entity';
import { ProductImages } from '../product-images/models/product-images.entity';
import { ProductImagesService } from '../product-images/product-images.service';
import { ProductsDto } from './dto/products.dto';
import { ProductInput } from './inputs/create-product-input';
import { Products } from './models/products.entity';
import { ProductsService } from './products.service';

@Resolver(of => Products)
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService,
        private readonly productImagesService: ProductImagesService,
    ) { }

    @Query(returns => Products)
    async getProductById(@Args('id') id: number): Promise<Products> {
        const product = await this.productsService.getProductById(id);
        if (!product) {
            throw new NotFoundException(id);
        }
        return product;
    }

    @Query(returns => Products)
    async getProductByUuid1c(@Args('uuid') uuid: string): Promise<Products> {
        const product = await this.productsService.getProductByUuid1c(uuid);
        if (!product) {
            throw new NotFoundException(uuid);
        }
        return product;
    }

    @Query(returns => [Products])
    async getAllProducts(): Promise<Products[]> {
        const products = await this.productsService.getAllProducts();
        if (!products) {
            throw new NotFoundException();
        }
        return products;
    }

    @ResolveField('productBrands', returns => ProductBrands)
    async getBrandByProductId(@Parent() product: Products) {
        const { id } = product;
        return this.productsService.getBrandByProductId(id);
    }

    @ResolveField('productCategories', returns => ProductBrands)
    async getCategoryByProductId(@Parent() product: Products) {
        const { id } = product;
        return this.productsService.getCategoryByProductId(id);
    }

    @ResolveField('productImages', returns => [ProductImages])
    async getImagesByProductId(@Parent() product: Products) {
        const { id } = product;
        return this.productImagesService.getImagesByProductId(id);
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => ProductsDto)
    async createProduct(@Args('data') data: ProductInput): Promise<ProductsDto> {
        return this.productsService.createProduct(data);
    }


    // @Query(returns => Basket, { nullable: true })
    // async getBasketByUserId(@Args('id') id: number): Promise<Basket> {

    //     const basket = await this.basketService.getBasketByUserId(id);
    //     if (!basket) {
    //         throw new NotFoundException(id);
    //     }
    //     return basket;
    // }

    // @ResolveField('basketRows', returns => [BasketRows], { nullable: true })
    // async getBasket(@Parent() basket: Basket) {
    //     const { id } = basket;
    //     return this.basketRowsService.getBasketRowsByBasketId(id);
    // }
}
