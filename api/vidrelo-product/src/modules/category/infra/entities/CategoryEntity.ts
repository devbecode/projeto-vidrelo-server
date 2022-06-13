import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public status: string;

  @Column()
  public created_at: string;
}
