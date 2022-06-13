import { Connection, getConnectionOptions, createConnection } from 'typeorm';

import { AppError } from '@shared/error/AppError';

type connectionName = 'dafault' | 'test';

const ormCreateConnection = async (
  connectionName: connectionName,
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  switch (connectionName) {
    case 'dafault':
      return createConnection(defaultOptions);
    case 'test':
      return createConnection({
        type: 'sqlite',
        database: ':memory:',
        entities: ['src/modules/**/entities/*{.ts,.js}'],
        migrations: ['src/**/migrations/*{.ts,.js}'],
        dropSchema: true,
        synchronize: true,
        logging: false,
      });
    default:
      throw new AppError('Connection name is not found', 500);
  }
};

export { ormCreateConnection };
