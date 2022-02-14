import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    title: string;

    @Column({ type: "text" })
    content: string;

}