import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductCategories } from './models/product-categories.entity';
import { ProductCategoriesService } from './product-categories.service';

@Resolver()
export class ProductCategoriesResolver {
    constructor(
        private readonly productCategoriesService: ProductCategoriesService,
    ) { }

    @Query(returns => ProductCategories)
    async getProductCategoriesById(@Args('id') id: number): Promise<ProductCategories> {

        const productCategory = await this.productCategoriesService.getProductCategoriesById(id);
        if (!productCategory) {
            throw new NotFoundException(id);
        }
        return productCategory;
    }

    @Query(returns => ProductCategories)
    async getProductCategoriesByUuid1c(@Args('uuid') uuid: string): Promise<ProductCategories> {
        const productCategory = await this.productCategoriesService.getProductCategoriesByUuid1c(uuid);
        if (!productCategory) {
            throw new NotFoundException(uuid);
        }
        return productCategory;
    }

    @Query(returns => [ProductCategories])
    async getAllProductsCategoriesBrands(): Promise<ProductCategories[]> {

        const productsCategories = await this.productCategoriesService.getAllProductsCategoriesBrands();
        if (!productsCategories) {
            throw new NotFoundException();
        }
        return productsCategories;
    }
}
