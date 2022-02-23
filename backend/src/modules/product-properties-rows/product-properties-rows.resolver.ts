import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { ProductPropertiesRowsDto } from './dto/product-properties-rows.dto';
import { ProductPropertiesRowsInput } from './inputs/create-product-property-rows.input';
import { ProductPropertiesRows } from './models/product-properties-rows.entity';
import { ProductPropertiesRowsService } from './product-properties-rows.service';

@Resolver(of => ProductPropertiesRows)
export class ProductPropertiesRowsResolver {
    constructor(private serviceProductsPropertiesRows: ProductPropertiesRowsService) { }

    @Query(returns => ProductPropertiesRows)
    async getProductPropertyRowById(@Args('id') id: number): Promise<ProductPropertiesRows> {
        const productProperty = await this.serviceProductsPropertiesRows.getProductPropertyRowById(id);
        if (!productProperty) {
            throw new NotFoundException(id);
        }
        return productProperty;
    }

    @Query(returns => [ProductPropertiesRows])
    async getProductPropertyRowByProductId(@Args('id') id: number): Promise<ProductPropertiesRows[]> {
        const productProperties = await this.serviceProductsPropertiesRows.getProductPropertyRowByProductId(id);
        if (!productProperties) {
            throw new NotFoundException();
        }
        return productProperties;
    }

    @Query(returns => ProductPropertiesRows, { nullable: true })
    async getProductPropertyRowByProductIdAndProperyId(@Args('productId') productId: number,
        @Args('propertyId') propertyId: number): Promise<ProductPropertiesRows> {
        const productProperties = await this.serviceProductsPropertiesRows.getProductPropertyRowByProductIdAndProperyId(productId, propertyId);
        // if (!productProperties) {
        //     throw new NotFoundException();
        // }
        return productProperties;
    }

    @Query(returns => [ProductPropertiesRows])
    async getAllProductPropertiesRows(): Promise<ProductPropertiesRows[]> {
        const productProperties = await this.serviceProductsPropertiesRows.getAllProductPropertiesRows();
        if (!productProperties) {
            throw new NotFoundException();
        }
        return productProperties;
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => ProductPropertiesRowsDto)
    async createProductPropertyRows(@Args('data') data: ProductPropertiesRowsInput): Promise<ProductPropertiesRowsDto> {
        return this.serviceProductsPropertiesRows.createProductPropertyRows(data);
    }
}
