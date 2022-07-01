import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity({
  name: 'bookmarks__bookmark',
})
export class Bookmark {
  @PrimaryGeneratedColumn()
  $id: number;

  @Column({
    unique: true,
    length: 32,
  })
  md5: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: true })
  isPublic: boolean;

  @ManyToMany(() => Tag, (tag) => tag.$id, { cascade: true })
  @JoinTable({
    name: 'bookmarks_has_tags',
  })
  tags: Tag[];
}
