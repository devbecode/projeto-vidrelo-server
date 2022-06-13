import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public status: string;

  @Column()
  public profile: string;

  @Column()
  public salt: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public telephone: string;

  @Column()
  public first_password: boolean;

  @Column()
  public cep: string;

  @Column()
  public state: string;

  @Column()
  public city: string;

  @Column()
  public district: string;

  @Column()
  public street: string;

  @Column()
  public number: string;

  @Column()
  public complement: string;

  @Column()
  public created_at: string;
}
