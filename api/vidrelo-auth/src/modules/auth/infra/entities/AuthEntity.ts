import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public access_token: string;

  @Column()
  public expires_in: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column()
  public user_id: string;
}
