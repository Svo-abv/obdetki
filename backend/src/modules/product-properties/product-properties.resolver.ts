import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckAuthGuard } from 'src/utils/guards/checkauth.guards';
import { ProductPropertiesDto } from './dto/product-properties.dto';
import { ProductPropertiesInput } from './inputs/create-product-propery.input';
import { ProductProperties } from './models/product-properties.entity';
import { ProductPropertiesService } from './product-properties.service';

@Resolver(of => ProductProperties)
export class ProductPropertiesResolver {
    constructor(private readonly serviceProductProperties: ProductPropertiesService) { }

    @Query(returns => ProductProperties)
    async getProductPropertyById(@Args('id') id: number): Promise<ProductProperties> {
        const productPropertyRow = await this.serviceProductProperties.getProductPropertyById(id);
        if (!productPropertyRow) {
            throw new NotFoundException(id);
        }
        return productPropertyRow;
    }

    @Query(returns => ProductProperties)
    async getProductPropertyByName(@Args('name') name: string): Promise<ProductProperties> {
        const productPropertyRow = await this.serviceProductProperties.getProductPropertyByName(name);
        if (!productPropertyRow) {
            throw new NotFoundException(name);
        }
        return productPropertyRow;
    }

    @Query(returns => [ProductProperties])
    async getAllProductProperties(): Promise<ProductProperties[]> {
        const productPropertyRows = await this.serviceProductProperties.getAllProductProperties();
        if (!productPropertyRows) {
            throw new NotFoundException();
        }
        return productPropertyRows;
    }

    @UseGuards(CheckAuthGuard)
    @Mutation(returns => ProductPropertiesDto)
    async createProductProperty(@Args('data') data: ProductPropertiesInput): Promise<ProductPropertiesDto> {
        return this.serviceProductProperties.createProductProperty(data);
    }

}
