import { relations, sql } from "drizzle-orm";
import {
  blob,
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";
import { nanoid } from "nanoid";
import { indices } from "../api/utils";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `thothica_${name}`);

export const resultGroup = createTable(
  "resultGroup",
  {
    id: text("id", { length: 255 }).notNull().primaryKey().$defaultFn(nanoid),
    query: text("query", { length: 255 }).notNull(),
    opensearchIds: text("opensearchIds", { mode: "json" })
      .notNull()
      .$type<string[]>(),
    opensearchIndex: text("opensearchIndex", { enum: indices }).notNull(),
    generatedSummary: blob("generatedSummary"),
    generatedPaper: blob("generatedPaper"),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },
  (savedResults) => ({
    savedResultuserIdIdx: index("resultGroup_userId_idx").on(
      savedResults.userId,
    ),
  }),
);

export const savedResultsRelation = relations(resultGroup, ({ one }) => ({
  user: one(users, { fields: [resultGroup.userId], references: [users.id] }),
}));

export const users = createTable("user", {
  id: text("id", { length: 255 }).notNull().primaryKey().$defaultFn(nanoid),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  savedResults: many(resultGroup),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const allowedEmails = createTable(
  "allowedEmail",
  {
    id: text("id", { length: 255 }).notNull().primaryKey().$defaultFn(nanoid),
    name: text("name", { length: 255 }),
    email: text("email", { length: 255 }).notNull(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  }),
);
