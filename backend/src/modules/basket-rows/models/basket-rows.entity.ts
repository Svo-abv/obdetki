import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BasketRows {

    @PrimaryGeneratedColumn()
    id: number;

}