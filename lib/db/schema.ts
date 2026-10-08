import { pgTable, text, integer, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core'

export const agents = pgTable('agents', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  department: text('department').notNull(),
  status: text('status').notNull().default('working'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  department: text('department').notNull(),
  status: text('status').notNull().default('queued'),
  priority: text('priority').notNull().default('normal'),
  assignedAgentId: text('assigned_agent_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const approvals = pgTable('approvals', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  requestedBy: text('requested_by').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const activity = pgTable('activity', {
  id: text('id').primaryKey(),
  message: text('message').notNull(),
  department: text('department').notNull(),
  kind: text('kind').notNull().default('update'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const metrics = pgTable('metrics', {
  id: text('id').primaryKey(),
  key: text('key').notNull(),
  value: integer('value').notNull(),
  unit: text('unit'),
  capturedAt: timestamp('captured_at').defaultNow().notNull(),
})

export const featureFlags = pgTable('feature_flags', {
  key: text('key').primaryKey(),
  enabled: boolean('enabled').notNull().default(true),
})

export type Task = typeof tasks.$inferSelect
export type Approval = typeof approvals.$inferSelect
export type Activity = typeof activity.$inferSelect
export type Metric = typeof metrics.$inferSelect
export type Agent = typeof agents.$inferSelect

export const appTables = { agents, tasks, approvals, activity, metrics, featureFlags }

// Apply this shape through the connected Neon SQL MCP before first production deploy.
export const schemaSql = `CREATE TABLE IF NOT EXISTS agents (id text PRIMARY KEY, name text NOT NULL, department text NOT NULL, status text NOT NULL DEFAULT 'working', metadata jsonb, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS tasks (id text PRIMARY KEY, title text NOT NULL, department text NOT NULL, status text NOT NULL DEFAULT 'queued', priority text NOT NULL DEFAULT 'normal', assigned_agent_id text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS approvals (id text PRIMARY KEY, title text NOT NULL, requested_by text NOT NULL, status text NOT NULL DEFAULT 'pending', created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS activity (id text PRIMARY KEY, message text NOT NULL, department text NOT NULL, kind text NOT NULL DEFAULT 'update', created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS metrics (id text PRIMARY KEY, key text NOT NULL, value integer NOT NULL, unit text, captured_at timestamptz NOT NULL DEFAULT now());`

