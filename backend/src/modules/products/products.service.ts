import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { BasketRows } from '../basket-rows/models/basket-rows.entity';
import { ProductBrands } from '../product-brands/models/product-brands.entity';
import { ProductImagesDto } from '../product-images/dto/product-images.dto';
import { ProductsDto } from './dto/products.dto';
import { ProductInput } from './inputs/create-product-input';
import { Products } from './models/products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>) { }

    async getProductById(id: number): Promise<Products> {
        return await this.productRepository.findOne(id);
    }

    async getProductsByProductCtatalogeId(id: number): Promise<Products[]> {

        const products = await this.productRepository.createQueryBuilder("product")
            .where(`product.productCategoriesId in (select id from product_categories where "parentId"=${id}) or product.productCategoriesId=${id}`)
            .orderBy("product.productCategoriesId", 'ASC')
            .getMany();
        return products;
    }
    async getProductByUuid1c(uuid: string): Promise<Products> {
        return await this.productRepository.findOne({ where: { uuid_1c: uuid } });
    }
    async getAllProducts(): Promise<Products[]> {
        return await this.productRepository.find();
    }

    async getSearchProducts(search: string): Promise<Products[]> {

        const products = await getConnection()
            .createQueryBuilder()
            .select()
            .from(`(select ts_rank_cd(p."documentTsv", plainto_tsquery('${search}')) AS score,p.* FROM products as p)`, 's')
            .where('s.score<>0')
            .orderBy('s.score', 'DESC')
            .getRawMany();
        return await products;
    }

    async getLastNewsProducts(): Promise<Products[]> {
        return await this.productRepository.find({ order: { updatedAt: "DESC" }, take: 15 });
    }

    async getBrandByProductId(id: number): Promise<ProductBrands> {
        const { productBrands } = await this.productRepository.findOne(id, { relations: ["productBrands"] });
        return productBrands;
    }

    async getCategoryByProductId(id: number): Promise<ProductBrands> {
        const { productCategories } = await this.productRepository.findOne(id, { relations: ["productCategories"] });
        return productCategories;
    }

    async createProduct(data: ProductInput): Promise<ProductsDto> {
        return await this.productRepository.save(data);
    }

}
