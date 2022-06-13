import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeLargeField1648083847599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product',
      'short_description',
      new TableColumn({
        name: 'short_description',
        type: 'text',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'product',
      'full_description',
      new TableColumn({
        name: 'full_description',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product',
      'short_description',
      new TableColumn({
        name: 'short_description',
        type: 'varchar',
        length: '700',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'product',
      'full_description',
      new TableColumn({
        name: 'full_description',
        type: 'varchar',
        length: '700',
        isNullable: false,
      }),
    );
  }
}
