import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // user를 가져올 때 게시물도 함께 가져올 수 있도록
    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[]
}