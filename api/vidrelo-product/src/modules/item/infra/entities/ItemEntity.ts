import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Gallery } from '@modules/gallery/domain/Gallery';
import { GalleryEntity } from '@modules/gallery/entities/GalleryEntity';

@Entity('item')
export class ItemEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public status: string;

  @Column()
  public measure: string;

  @Column()
  public value: string;

  @Column()
  public hash: string;

  @Column()
  public created_at: string;

  @Column()
  public category_id: string;

  // @OneToMany(() => Gallery, gallery => gallery.item_id)
  public gallerys?: GalleryEntity[];
}
