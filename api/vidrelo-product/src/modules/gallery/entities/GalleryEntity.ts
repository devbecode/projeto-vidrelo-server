import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Item } from '@modules/item/domain/Item';

import { Gallery } from '../domain/Gallery';

@Entity('gallery')
export class GalleryEntity extends Gallery {
  @PrimaryColumn()
  public id: string;

  @Column()
  public image: string;

  @Column()
  public created_at: string;

  @Column()
  public product_id?: string;

  @Column()
  public item_id?: string;
}
