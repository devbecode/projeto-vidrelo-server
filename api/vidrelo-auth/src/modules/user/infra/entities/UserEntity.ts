import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public status: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @CreateDateColumn()
  public created_at: string;
}
