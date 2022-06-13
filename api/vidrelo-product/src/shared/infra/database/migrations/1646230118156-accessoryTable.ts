import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class accessoryTable1646230118156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accessory',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '50',
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['glass', 'iron'],
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'accessory_value',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '50',
            isPrimary: true,
          },
          {
            name: 'thickness',
            type: 'varchar',
            length: '4',
            isNullable: false,
          },
          {
            name: 'measure',
            type: 'enum',
            enum: ['meter', 'unity'],
            isNullable: false,
          },
          {
            name: 'price',
            type: 'float',
            length: '12',
            isNullable: false,
          },
          {
            name: 'hash',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'accessory_id',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'product_id',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_ACCESSORYVALUE_PRODUCTID',
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_ACCESSORYVALUE_ACCESSORYID',
            columnNames: ['accessory_id'],
            referencedTableName: 'accessory',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accessory', true);

    await queryRunner.dropForeignKey(
      'accessory_value',
      'FK_ACCESSORYVALUE_PRODUCTID',
    );

    await queryRunner.dropTable('accessory_value', true);
  }
}
