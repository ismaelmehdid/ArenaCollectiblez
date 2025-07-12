import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  avatar: text('avatar').notNull(),
  username: text('username').notNull(),
  wallet_address: text('wallet_address').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}

export enum loobBoxType {
  BlazehartSC = 'BlazehartSC',
  StormfoxFC = 'StormfoxFC',
}

export const lootBoxType = pgEnum('applicantSource', enumToPgEnum(loobBoxType));

export const lootBox = pgTable('loot_box', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  image: text('image').notNull(),
  type: lootBoxType('type').notNull(),
  price_to_open: integer('price_to_open').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
});

export const lootBoxPending = pgTable('loot_box_pending', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }).unique(),
});

export type UserSelect = typeof user.$inferSelect;
