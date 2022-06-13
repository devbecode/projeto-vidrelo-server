import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Budget } from '../../domain/Budget';

@Entity('budget')
export class BudgetEntity extends Budget {
  @PrimaryColumn()
  public id: string;

  @Column()
  public status: string;

  @Column()
  public width: number;

  @Column()
  public heigth: number;

  @Column()
  public thickness: number;

  @Column()
  public depth: number;

  @Column()
  public amount: number;

  @Column()
  public created_at: string;

  @Column()
  public updated_at?: string;

  @Column()
  public order_id: string;
}
