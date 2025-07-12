import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL ?? '';

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const deployed = process.env.VERCEL_ENV === 'production';

const conn =
  globalForDb.conn ??
  postgres(connectionString, {
    prepare: false,
    connection: {
      statement_timeout: 5000,
    },
    ssl: deployed ? 'require' : undefined,
  });

if (process.env.VERCEL_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, {
  schema: {
    ...schema,
  },
});
