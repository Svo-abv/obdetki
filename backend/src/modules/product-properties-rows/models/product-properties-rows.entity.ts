import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductPropertiesRows {

    @PrimaryGeneratedColumn()
    id: number;

}