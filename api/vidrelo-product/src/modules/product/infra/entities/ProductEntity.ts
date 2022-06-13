import { Column, PrimaryColumn, Entity, CreateDateColumn } from 'typeorm';

import { Product } from '../../domain/Product';

@Entity('product')
export class ProductEntity extends Product {
  @PrimaryColumn()
  public id: string;

  @Column()
  public status: string;

  @Column()
  public name: string;

  @Column()
  public full_description: string;

  @Column()
  public short_description: string;

  @Column()
  public cover: string;

  @Column()
  public installation: string;

  @Column()
  public public: boolean;

  @CreateDateColumn()
  public created_at: string;
}
