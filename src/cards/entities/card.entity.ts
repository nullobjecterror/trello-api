import { ColumnEntity } from 'src/columns/entities/column.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Comment, (comment) => comment.card, {
    cascade: true,
  })
  comments?: Comment[];

  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: ColumnEntity;

  @Column()
  columnId: number;
}
