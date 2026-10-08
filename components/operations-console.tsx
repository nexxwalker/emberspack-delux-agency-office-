'use client'

import { useState, useTransition } from 'react'
import { Check, CircleDot, Plus, X } from 'lucide-react'
import { createTask, updateApproval } from '@/app/actions/operations'

type Approval = { id: string; title: string; requestedBy: string; status: string }
type Task = { id: string; title: string; department: string; status: string; priority: string }

export function OperationsConsole({ approvals, tasks }: { approvals: Approval[]; tasks: Task[] }) {
  const [items, setItems] = useState(approvals)
  const [taskRows, setTaskRows] = useState(tasks)
  const [isPending, startTransition] = useTransition()
  const [title, setTitle] = useState('')

  function decide(id: string, status: 'approved' | 'rejected') {
    startTransition(async () => {
      const result = await updateApproval(id, status)
      if (!result.ok) return
      setItems((rows) => rows.map((row) => row.id === id ? { ...row, status } : row))
    })
  }

  function addTask() {
    if (!title.trim()) return
    startTransition(async () => {
      const result = await createTask({ title, department: 'ops' })
      if (!result.ok) return
      setTaskRows((rows) => [result.task, ...rows])
      setTitle('')
    })
  }

  return <section className="ops-console" aria-label="Operations console">
    <div className="ops-console__header"><div><p className="eyebrow">COMMAND CENTRE</p><h1>Work, approvals, and signal.</h1></div><span className="live-pill"><CircleDot size={12} /> LIVE</span></div>
    <div className="ops-console__grid">
      <div className="console-card console-card--wide"><div className="console-card__title"><span>Approval queue</span><strong>{items.filter((item) => item.status === 'pending').length} waiting</strong></div><div className="approval-list">
        {items.length ? items.map((item) => <article className="approval-row" key={item.id}><div><strong>{item.title}</strong><small>{item.requestedBy}</small></div><div className="row-actions">{item.status === 'pending' ? <><button aria-label={`Approve ${item.title}`} onClick={() => decide(item.id, 'approved')} disabled={isPending}><Check size={15} /></button><button aria-label={`Reject ${item.title}`} onClick={() => decide(item.id, 'rejected')} disabled={isPending}><X size={15} /></button></> : <span className="status-label">{item.status}</span>}</div></article>) : <p className="empty-copy">No approval rows yet. Neon will populate this queue.</p>}
      </div></div>
      <div className="console-card"><div className="console-card__title"><span>Quick task</span><Plus size={16} /></div><div className="task-create"><input aria-label="Task title" value={title} onChange={(event) => setTitle(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) addTask() }} placeholder="What needs moving?" /><button onClick={addTask} disabled={isPending}>Queue</button></div><div className="mini-list">{taskRows.slice(0, 5).map((task) => <div key={task.id}><span>{task.title}</span><small>{task.status}</small></div>)}</div></div>
    </div>
  </section>
}
