import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcrypt';

// 1. create interface
export interface IUser extends Document {
    username: string;
    password: string;
    name: string;
    bod: string;
    phone: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}

// 2. create entity
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    @Exclude()
    bod: string;

    @Column()
    phone: string;

    @Column()
    avatar: string;

    @BeforeInsert()
    @BeforeUpdate()
    async setPassword() {
        if (this.password) this.password = await bcrypt.hash(this.password, 10);
    }
}
