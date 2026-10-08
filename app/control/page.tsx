import { listOperations } from '@/app/actions/operations'
import { OperationsConsole } from '@/components/operations-console'

export const dynamic = 'force-dynamic'

export default async function ControlPage() {
  let data = { approvals: [], tasks: [] }
  try {
    data = await listOperations()
  } catch {
    // The connected Neon schema is provisioned separately through the Neon SQL MCP.
  }
  return <main className="control-page"><OperationsConsole approvals={data.approvals} tasks={data.tasks} /></main>
}
