export type TaskStatus =
  | 'QUEUED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'RETRYING'
  | 'DEAD_LETTER'

export type WorkerId = 'ashburn' | 'portland' | 'frankfurt'

export type WorkerStatus = 'ONLINE' | 'OFFLINE'

/** Human-readable label for each node, used in logs, cards, and the inspector. */
export const WORKER_LABELS: Record<WorkerId, string> = {
  ashburn: 'Ashburn',
  portland: 'Portland',
  frankfurt: 'Frankfurt',
}

export interface Task {
  id: string
  name: string
  status: TaskStatus
  node: WorkerId
  latencyMs: number
  ts: string
}

export interface Worker {
  id: WorkerId
  name: string
  status: WorkerStatus
  load: number
  region: string
  tasksHandled: number
  uptimeHours: number
}

export type LogLevel = 'info' | 'warn' | 'error'

export interface LogEvent {
  id: string
  ts: string
  source: string
  message: string
  level: LogLevel
  critical: boolean
}

export interface VelocityPoint {
  t: number
  tps: number
}
