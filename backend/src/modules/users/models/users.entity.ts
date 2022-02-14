import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    town: string;

    @Column()
    address: string;

    @Column({ unique: true })
    email: string;

    @Column()
    telephone: string;

    @Column({ default: "USER" })
    role: string;

    @Column({ unique: true })
    uuid_1c: string;


}