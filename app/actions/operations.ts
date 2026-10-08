'use server'

import { desc, eq } from 'drizzle-orm'
import { requireDb } from '@/lib/db'
import { activity, approvals, metrics, tasks } from '@/lib/db/schema'

export async function listOperations() {
  const db = requireDb()
  const [taskRows, approvalRows, activityRows, metricRows] = await Promise.all([
    db.select().from(tasks).orderBy(desc(tasks.createdAt)).limit(50),
    db.select().from(approvals).orderBy(desc(approvals.createdAt)).limit(20),
    db.select().from(activity).orderBy(desc(activity.createdAt)).limit(30),
    db.select().from(metrics).orderBy(desc(metrics.capturedAt)).limit(20),
  ])
  return { tasks: taskRows, approvals: approvalRows, activity: activityRows, metrics: metricRows }
}

export async function updateApproval(id: string, status: 'approved' | 'rejected') {
  const db = requireDb()
  await db.update(approvals).set({ status }).where(eq(approvals.id, id))
  await db.insert(activity).values({ id: crypto.randomUUID(), message: `Approval ${status}: ${id}`, department: 'brain', kind: 'approval' })
  return { ok: true }
}

export async function createTask(input: { title: string; department: string; priority?: string }) {
  const db = requireDb()
  const task = { id: crypto.randomUUID(), title: input.title.trim(), department: input.department, priority: input.priority ?? 'normal', status: 'queued' }
  await db.insert(tasks).values(task)
  await db.insert(activity).values({ id: crypto.randomUUID(), message: `Task queued: ${task.title}`, department: task.department, kind: 'task' })
  return task
}
