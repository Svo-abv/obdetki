import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductBrands {

    @PrimaryGeneratedColumn()
    id: number;

}