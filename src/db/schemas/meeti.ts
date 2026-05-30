import { pgTable, uuid, varchar, text, boolean, time, date, integer, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { communities } from "./community";
import { users } from "./auth";

export const meetis = pgTable('meetis', {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar('title', {length: 255}).notNull(),
  details: text('details').notNull(),
  availableSeats: integer('available_seats').notNull(),
  date: date('date', {mode: 'string'}).notNull(),
  time: time('time').notNull(),
  image: varchar('image', {length: 100}).notNull(),
  communityId: uuid('community_id').references(() => communities.id, {onDelete: 'cascade'}).notNull(),
  categoryId: uuid('category_id').notNull(),
  createdBy: text('created_by').references(() => users.id, {onDelete: 'cascade'}).notNull(),
  virtual: boolean('virtual').default(false).notNull()
})

export const meetisLocations = pgTable('meetis_locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  meetiId: uuid('meeti_id')
    .notNull()
    .references(() => meetis.id, { onDelete: 'cascade' }),
  placeName: varchar('place_name', {length: 255}).notNull(),
  address: varchar('address', {length: 255}).notNull(),
  city: varchar('city', {length: 100}).notNull(),
  country: varchar('country', {length: 100} ).notNull(),
  lat: doublePrecision("latitude").notNull(),   
  lng: doublePrecision("longitude").notNull(),
});

export const meetisAttendees = pgTable('meetisAttendes', {
    meetiId: uuid('meeti_id')
    .notNull()
    .references(() => meetis.id, { onDelete: 'cascade' }),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull()
})