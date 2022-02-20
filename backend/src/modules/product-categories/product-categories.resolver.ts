import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { ProductCategoriesDto } from './dto/product-categories.dto';
import { ProductCategoriesInput } from './inputs/create-product-categories.input';
import { ProductCategories } from './models/product-categories.entity';
import { ProductCategoriesService } from './product-categories.service';

@Resolver(of => ProductCategories)
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
    async getAllProductsCategories(): Promise<ProductCategories[]> {
        const productsCategories = await this.productCategoriesService.getAllProductsCategories();
        if (!productsCategories) {
            throw new NotFoundException();
        }
        return productsCategories;
    }


    @Query(returns => [ProductCategories])
    async getAllRootProductsCategories(): Promise<ProductCategories[]> {
        const productsCategories = await this.productCategoriesService.getAllRootProductsCategories();
        if (!productsCategories) {
            throw new NotFoundException();
        }
        return productsCategories;
    }

    @Query(returns => [ProductCategories])
    async getAllChildresnProductsCategoriesByParent(@Args('id') id: number): Promise<ProductCategories[]> {
        const productsCategories = await this.productCategoriesService.getAllChildresnProductsCategoriesByParent(id);
        if (!productsCategories) {
            throw new NotFoundException();
        }
        return productsCategories;
    }

    @ResolveField('children', returns => [ProductCategories])
    async resolveChildrenProductCategory(@Parent() row: ProductCategories) {
        const { id } = row;
        const productsCategories = await this.productCategoriesService.getAllChildresnProductsCategoriesByParent(id);
        if (!productsCategories) {
            throw new NotFoundException();
        }
        return productsCategories;
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => ProductCategoriesDto)
    async createProductCategories(@Args('data') data: ProductCategoriesInput): Promise<ProductCategoriesDto> {
        return this.productCategoriesService.createProductCategories(data);
    }

}
