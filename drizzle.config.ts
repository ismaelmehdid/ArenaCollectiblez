import { defineConfig } from 'drizzle-kit';

const isLocal = process.env.ENVIRONMENT === 'local';

export default defineConfig({
  schema: './backend/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: isLocal ? 'allow' : 'require',
  },
  verbose: true,
});
