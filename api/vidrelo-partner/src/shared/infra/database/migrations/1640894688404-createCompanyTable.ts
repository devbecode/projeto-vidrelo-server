import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCompanyTable1640894688404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company',
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
          },
          {
            name: 'corporate_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'responsible',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            length: '14',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'telephone',
            type: 'varchar',
            length: '40',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '60',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '5',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'district',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '5',
            isNullable: false,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company', true);
  }
}
