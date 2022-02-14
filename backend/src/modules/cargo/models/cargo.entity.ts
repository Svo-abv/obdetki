import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cargo {

    @PrimaryGeneratedColumn()
    id: number;

}