import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductBrands } from './models/product-brands.entity';
import { ProductBrandsService } from './product-brands.service';

@Resolver()
export class ProductBrandsResolver {
    constructor(
        private readonly productBrandsService: ProductBrandsService,
    ) { }

    @Query(returns => ProductBrands)
    async getProductBrandsById(@Args('id') id: number): Promise<ProductBrands> {

        const productBrand = await this.productBrandsService.getProductBrandsById(id);
        if (!productBrand) {
            throw new NotFoundException(id);
        }
        return productBrand;
    }
    @Query(returns => [ProductBrands])
    async getAllProductsBrands(): Promise<ProductBrands[]> {

        const productsBrands = await this.productBrandsService.getAllProductsBrands();
        if (!productsBrands) {
            throw new NotFoundException();
        }
        return productsBrands;
    }
}
