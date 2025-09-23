import { User } from 'src/users/entities/user.entity';

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @ManyToOne(() => User, (user) => user.games, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
