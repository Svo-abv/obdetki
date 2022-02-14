import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImages {

    @PrimaryGeneratedColumn()
    id: number;

}