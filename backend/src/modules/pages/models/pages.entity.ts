import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pages {

    @PrimaryGeneratedColumn()
    id: number;

}