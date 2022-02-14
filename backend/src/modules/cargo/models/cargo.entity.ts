import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cargo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    minimalSumm: number;

}