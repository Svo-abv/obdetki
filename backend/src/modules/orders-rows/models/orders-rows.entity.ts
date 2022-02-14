import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrdersRows {

    @PrimaryGeneratedColumn()
    id: number;

}