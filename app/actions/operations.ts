'use server'

import { desc, eq } from 'drizzle-orm'
import { requireDb } from '@/lib/db'
import { activity, approvals, metrics, tasks } from '@/lib/db/schema'

const emptyOperations = { tasks: [], approvals: [], activity: [], metrics: [] }

function isMissingTable(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false

  const candidate = error as { code?: unknown; message?: unknown; cause?: unknown }
  if (candidate.code === '42P01') return true
  if (typeof candidate.message === 'string' && /relation .* does not exist/i.test(candidate.message)) return true

  return candidate.cause ? isMissingTable(candidate.cause) : false
}

export async function listOperations() {
  try {
    const db = requireDb()
    const [taskRows, approvalRows, activityRows, metricRows] = await Promise.all([
      db.select().from(tasks).orderBy(desc(tasks.createdAt)).limit(50),
      db.select().from(approvals).orderBy(desc(approvals.createdAt)).limit(20),
      db.select().from(activity).orderBy(desc(activity.createdAt)).limit(30),
      db.select().from(metrics).orderBy(desc(metrics.capturedAt)).limit(20),
    ])
    return { tasks: taskRows, approvals: approvalRows, activity: activityRows, metrics: metricRows }
  } catch (error) {
    if (isMissingTable(error)) return emptyOperations
    throw error
  }
}

export async function updateApproval(id: string, status: 'approved' | 'rejected') {
  try {
    const db = requireDb()
    await db.update(approvals).set({ status }).where(eq(approvals.id, id))
    await db.insert(activity).values({ id: crypto.randomUUID(), message: `Approval ${status}: ${id}`, department: 'brain', kind: 'approval' })
    return { ok: true as const }
  } catch (error) {
    if (isMissingTable(error)) return { ok: false as const, error: 'Operations storage is not initialized yet.' }
    throw error
  }
}

export async function createOfficeActivity(message: string) {
  const safeMessage = message.trim().slice(0, 200)
  if (!safeMessage) return { ok: false as const }
  try {
    const db = requireDb()
    await db.insert(activity).values({ id: crypto.randomUUID(), message: safeMessage, department: 'brain', kind: 'office' })
    return { ok: true as const }
  } catch (error) {
    if (isMissingTable(error)) return { ok: false as const }
    throw error
  }
}

export async function createTask(input: { title: string; department: string; priority?: string }) {
  const title = input.title.trim()
  if (!title || title.length > 200) return { ok: false as const, error: 'Enter a task title under 200 characters.' }
  try {
    const db = requireDb()
    const task = { id: crypto.randomUUID(), title, department: input.department, priority: input.priority ?? 'normal', status: 'queued' }
    await db.insert(tasks).values(task)
    await db.insert(activity).values({ id: crypto.randomUUID(), message: `Task queued: ${task.title}`, department: task.department, kind: 'task' })
    return { ok: true as const, task }
  } catch (error) {
    if (isMissingTable(error)) return { ok: false as const, error: 'Operations storage is not initialized yet.' }
    throw error
  }
}
