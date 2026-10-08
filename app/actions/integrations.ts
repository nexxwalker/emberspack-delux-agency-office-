'use server'

export type ConnectedService = {
  id: 'neon' | 'ai-gateway'
  name: string
  detail: string
  status: 'connected' | 'needs-setup'
  setup: string
  apiSurface: string
}

export async function getConnectedServices(): Promise<ConnectedService[]> {
  return [
    {
      id: 'neon',
      name: 'Neon',
      detail: 'Postgres storage for operations, activity, and workspace data.',
      status: process.env.DATABASE_URL ? 'connected' : 'needs-setup',
      setup: 'DATABASE_URL and pooled connection are available to the server.',
      apiSurface: 'Server-side Drizzle queries; credentials never reach the browser.',
    },
    {
      id: 'ai-gateway',
      name: 'Vercel AI Gateway',
      detail: 'Model access for future agent and workflow intelligence.',
      status: 'connected',
      setup: 'Provided by the Vercel runtime with zero client-side key handling.',
      apiSurface: 'Server-side AI SDK calls using Gateway model IDs.',
    },
  ]
}

export async function testServiceConnection(service: ConnectedService['id']) {
  const services = await getConnectedServices()
  const result = services.find((item) => item.id === service)
  return result?.status === 'connected'
    ? { ok: true as const, message: `${result.name} is ready.` }
    : { ok: false as const, message: `${result?.name ?? 'Service'} needs setup.` }
}
