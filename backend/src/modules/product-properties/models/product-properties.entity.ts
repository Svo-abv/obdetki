import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductProperties {

    @PrimaryGeneratedColumn()
    id: number;

}