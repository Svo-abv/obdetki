import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { ProductBrandsDto } from './dto/product-brands.dto';
import { ProductBrandsInput } from './inputs/create-product-brands.input';
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

    @Query(returns => ProductBrands)
    async getProductBrandsByUuid1c(@Args('uuid') uuid: string): Promise<ProductBrands> {
        const productBrand = await this.productBrandsService.getProductBrandsByUuid1c(uuid);
        if (!productBrand) {
            throw new NotFoundException(uuid);
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

    @Query(returns => [ProductBrands])
    async getAllProductsBrandsArrayId(): Promise<any[]> {
        const productsBrands = await this.productBrandsService.getAllProductsBrandsArrayId();
        if (!productsBrands) {
            throw new NotFoundException();
        }
        return productsBrands;
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => ProductBrandsDto)
    async createProductBrands(@Args('data') data: ProductBrandsInput): Promise<ProductBrandsDto> {
        return this.productBrandsService.createProductBrands(data);
    }

}
