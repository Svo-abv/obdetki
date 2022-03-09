import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { BasketRows } from '../basket-rows/models/basket-rows.entity';
import { ProductBrands } from '../product-brands/models/product-brands.entity';
import { ProductImagesDto } from '../product-images/dto/product-images.dto';
import { ProductsFiltersDto } from './dto/products-filter.dto';
import { ProductsDto } from './dto/products.dto';
import { ProductsUpdateDto } from './dto/update-product.dto';
import { ProductInput } from './inputs/create-product-input';
import { FilterProductInput } from './inputs/filter-product-input';
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

    async getProductsFiltersByProductCtatalogeId(id: number): Promise<ProductsFiltersDto[]> {

        const filters = await getConnection().createQueryBuilder()
            .select("p.name", "name")
            .addSelect("r.value", "value")
            .distinct(true)
            .from(`(select id,name from products as product where product."productCategoriesId" in (select id from product_categories where "parentId" = ${id} or "productCategoriesId" = ${id}))`, "tmp")
            .leftJoin("product_properties_rows", "r", `r."productId"=tmp.id`)
            .leftJoin("product_properties", "p", `r."propertyId"=p.id`)
            //.where(`product.productCategoriesId in (select id from product_categories where "parentId"=${id}) or product.productCategoriesId=${id}`)
            .orderBy("p.name", 'ASC')
            .getRawMany();
        //.getSql();
        //console.log(filters);
        return filters;
    }

    async getFiltredProducts(id: number, filters: FilterProductInput[]): Promise<Products[]> {

        let currQuery = '';
        let isfist = true;
        filters.map((curr) => {
            if (isfist) {
                currQuery = `(prop."name" ='${curr.name}' and UPPER(val."value")=UPPER('${curr.value}')) `
                isfist = false;
            } else {
                currQuery += `or (prop."name" ='${curr.name}' and UPPER(val."value")=UPPER('${curr.value}')) `
            }
        });

        const products = await getConnection().createQueryBuilder()
            .select()
            .from(`(
                select val."productId",count(val.*) as counts from product_properties_rows as val
                inner join product_properties as prop on prop.id=val."propertyId"
                where
                ${currQuery}	
                group by val."productId"
                order by count(*) desc)`, "tmp")
            .leftJoin("products", "product", `tmp."productId" = product.id`)
            .where(`product.productCategoriesId in (select id from product_categories where "parentId"=${id} or product.productCategoriesId=${id}) and counts>${filters.length - 1}`)
            .getRawMany();
        //.getSql();
        // console.log(products);
        return products;
        //return;
    }


    async getProductByUuid1c(uuid: string): Promise<Products> {
        return await this.productRepository.findOne({ where: { uuid_1c: uuid } });
    }

    async getAllProducts(): Promise<Products[]> {
        return await this.productRepository.find({ order: { updatedAt: 'DESC' } });
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

    async updateProduct(data: ProductInput): Promise<ProductsUpdateDto> {
        await this.productRepository.update({ uuid_1c: data.uuid_1c }, { price: data.price });
        return { updated: true };
    }
}
