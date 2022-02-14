import { Users } from "src/modules/users/models/users.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Basket {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Users, user => user.id)
    user: Users;

}