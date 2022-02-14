import { Products } from "src/modules/products/models/products.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategories {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    uuid_1c: string;

    @OneToMany(type => ProductCategories, productCategory => productCategory.id)
    parentCategory: ProductCategories[];

}