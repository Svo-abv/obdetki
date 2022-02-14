import { ProductBrands } from "src/modules/product-brands/models/product-brands.entity";
import { ProductCategories } from "src/modules/product-categories/models/product-categories.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    price: number;

    @Column({ unique: true })
    uuid_1c: string;

    @OneToMany(type => ProductBrands, productBrand => productBrand.id)
    productBrands: ProductBrands[];

    @OneToMany(type => ProductCategories, productCategory => productCategory.id)
    productCategories: ProductCategories[];

}