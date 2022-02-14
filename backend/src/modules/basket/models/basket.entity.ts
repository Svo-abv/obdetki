import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Basket {

    @PrimaryGeneratedColumn()
    id: number;

}