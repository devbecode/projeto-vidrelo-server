import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1642431102694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            enumName: 'user_status',
            isNullable: false,
          },
          {
            name: 'profile',
            type: 'enum',
            enum: ['client', 'employee'],
            enumName: 'user_profile',
            isNullable: false,
          },
          {
            name: 'salt',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '150',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'telephone',
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '11',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '3',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '5',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '25',
            isNullable: true,
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
    await queryRunner.dropTable('user', true);
  }
}
