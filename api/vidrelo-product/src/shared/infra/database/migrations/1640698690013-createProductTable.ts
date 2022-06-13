import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProductTable1640698690013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '50',
            isPrimary: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive'],
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'short_description',
            type: 'varchar',
            length: '700',
            isNullable: true,
          },
          {
            name: 'full_description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'cover',
            type: 'varchar',
            length: '300',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product', true);
  }
}
