import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Item } from '../../domain/Item';

@Entity('item_budget')
export class ItemEntity extends Item {
  @PrimaryColumn()
  public id: string;

  @Column()
  public status: string;

  @Column()
  public category: string;

  @Column()
  public item: string;

  @Column()
  public created_at: string;

  @Column()
  public updated_at: string;

  @Column()
  public budget_id: string;
}
