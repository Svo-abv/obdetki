import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductProperties {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    uuid_1c: string;

}