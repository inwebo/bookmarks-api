import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user__user',
})
export class User {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  $id: number;

  @Column()
  name: string;

  @Column()
  password: string;
}
