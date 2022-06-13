import { Entity, Column, PrimaryColumn } from 'typeorm';

import { Order } from '../../domain/Order';

@Entity('order')
export class OrderEntity extends Order {
  @PrimaryColumn()
  public id: string;

  @Column()
  public status: string;

  @Column()
  public number: number;

  @Column()
  public created_at: string;

  @Column()
  public updated_at: string;

  @Column()
  public user_id: string;
}
