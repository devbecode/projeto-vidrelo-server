import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createCompositionTable1647892520385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'composition',
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
            enum: ['active', 'inactive'],
            isNullable: false,
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
          {
            name: 'item_id',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'product_id',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'item',
      new TableForeignKey({
        name: 'FK_ITEM_CATEGORY_ID',
        columnNames: ['category_id'],
        referencedTableName: 'category',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKeys('composition', [
      new TableForeignKey({
        name: 'FK_COMPOSITION_CATEGORY_ID',
        columnNames: ['category_id'],
        referencedTableName: 'category',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_COMPOSITION_ITEM_ID',
        columnNames: ['item_id'],
        referencedTableName: 'item',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FK_COMPOSITION_PRODUCT_ID',
        columnNames: ['product_id'],
        referencedTableName: 'product',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);

    await queryRunner.addColumn(
      'gallery',
      new TableColumn({
        name: 'item_id',
        type: 'varchar',
        length: '150',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'gallery',
      new TableForeignKey({
        name: 'FK_GALLERY_ITEM_ID',
        columnNames: ['item_id'],
        referencedTableName: 'item',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.changeColumn(
      'gallery',
      'product_id',
      new TableColumn({
        name: 'product_id',
        type: 'varchar',
        length: '150',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'gallery',
      'product_id',
      new TableColumn({
        name: 'product_id',
        type: 'varchar',
        length: '150',
        isNullable: true,
      }),
    );

    await queryRunner.dropForeignKey('gallery', 'FK_GALLERY_ITEM_ID');
    await queryRunner.dropColumn('gallery', 'item_id');

    await queryRunner.dropForeignKey(
      'composition',
      'FK_COMPOSITION_PRODUCT_ID',
    );
    await queryRunner.dropForeignKey('composition', 'FK_COMPOSITION_ITEM_ID');
    await queryRunner.dropForeignKey(
      'composition',
      'FK_COMPOSITION_CATEGORY_ID',
    );

    await queryRunner.dropForeignKey('composition', 'FK_ITEM_CATEGORY_ID');

    await queryRunner.dropTable('composition', true);
  }
}
