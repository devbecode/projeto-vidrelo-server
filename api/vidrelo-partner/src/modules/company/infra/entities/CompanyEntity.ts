import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Company, STATUS_COMPANY } from '../../domain/Company';

@Entity('company')
export class CompanyEntity extends Company {
  @PrimaryColumn()
  public id: string;

  @Column()
  public corporate_name: string;

  @Column()
  public status: string;

  @Column()
  public responsible: string;

  @Column()
  public cnpj: string;

  @Column()
  public telephone: string;

  @Column()
  public email: string;

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
