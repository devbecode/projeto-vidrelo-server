import { Column, Entity, PrimaryColumn } from 'typeorm';

import { ItemEntity } from '@modules/item/infra/entities/ItemEntity';

@Entity('composition')
export class CompositionEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public status: string;

  @Column()
  public hash: string;

  @Column()
  public created_at: string;

  @Column()
  public item_id: string;

  @Column()
  public product_id: string;

  @Column()
  public category_id: string;

  // @Column()
  public itens?: Array<ItemEntity>;
}
