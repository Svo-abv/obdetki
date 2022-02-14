import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategories {

    @PrimaryGeneratedColumn()
    id: number;

}