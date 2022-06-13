import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createItemTable1647889494806 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accessory_value', true);
    await queryRunner.dropTable('accessory', true);

    await queryRunner.createTable(
      new Table({
        name: 'item',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'varchar',
            length: '150',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '150',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive'],
            isNullable: false,
          },
          {
            name: 'measure',
            type: 'enum',
            enum: ['unity', 'meter'],
            isNullable: false,
          },
          {
            name: 'value',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'hash',
            type: 'varchar',
            length: '250',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'date',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'category_id',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item', true);
  }
}
