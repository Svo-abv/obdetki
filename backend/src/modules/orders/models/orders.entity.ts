import { Cargo } from "src/modules/cargo/models/cargo.entity";
import { Users } from "src/modules/users/models/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @Column()
    date: Date;

    @Column({ unique: true })
    uuid_1c: string;

    @ManyToOne(type => Cargo, cargo => cargo.id)
    cargo: Cargo;

    @ManyToOne(type => Users, user => user.id)
    user: Users;

}