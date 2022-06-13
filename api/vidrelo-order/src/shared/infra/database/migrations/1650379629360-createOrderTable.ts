import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrderTable1650379629360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '150',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'status',
            type: 'enum',
            enumName: 'order_status',
            enum: ['active', 'inactive'],
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '12',
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
            name: 'updated_at',
            type: 'date',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'budget',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'status',
            type: 'enum',
            enumName: 'order_status',
            enum: ['active', 'inactive'],
            isNullable: false,
          },
          {
            name: 'width',
            type: 'numeric',
            length: '6',
            isNullable: false,
          },
          {
            name: 'heigth',
            type: 'numeric',
            length: '6',
            isNullable: false,
          },
          {
            name: 'thickness',
            type: 'numeric',
            length: '6',
            isNullable: false,
          },
          {
            name: 'depth',
            type: 'numeric',
            length: '6',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'numeric',
            length: '12',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'order_id',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'item_budget',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '150',
            isPrimary: true,
          },
          {
            name: 'status',
            type: 'enum',
            enumName: 'item_status',
            enum: ['active', 'inactive'],
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'item',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'budget_id',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item_budget', true);
    await queryRunner.dropTable('budget', true);
    await queryRunner.dropTable('order', true);
  }
}
