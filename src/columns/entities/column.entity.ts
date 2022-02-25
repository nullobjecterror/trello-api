import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Card, (card) => card.column, {
    cascade: true,
  })
  cards?: Card[];

  @ManyToOne(() => User, (user) => user.columns, { onDelete: 'CASCADE' })
  user: User;
}
