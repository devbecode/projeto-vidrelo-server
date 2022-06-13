import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class createFieldAtTheAccessoryValueTable1646949158709
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('accessory_value', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      }),
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: ['active', 'inactive'],
        isNullable: false,
      }),
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '150',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('accessory_value', [
      'status',
      'created_at',
      'name',
    ]);
  }
}
