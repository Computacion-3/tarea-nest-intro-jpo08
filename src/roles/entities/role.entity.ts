import { User } from 'src/users/entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles, { eager: true })
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions: Permission[];
}