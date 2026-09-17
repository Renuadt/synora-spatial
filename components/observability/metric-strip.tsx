'use client'

import { motion } from 'framer-motion'

interface Metrics {
  processed: number
  online: number
  total: number
  inFlight: number
  deadLetters: number
  successRate: number
  currentTps: number
}

interface MetricStripProps {
  metrics: Metrics
  delay?: number
}

interface Tile {
  label: string
  value: string
  sub: string
  accent: string
  alert?: boolean
}

function tiles(m: Metrics): Tile[] {
  return [
    {
      label: 'Tasks Processed',
      value: m.processed.toLocaleString('en-US'),
      sub: 'since midnight UTC',
      accent: '#a78bfa',
    },
    {
      label: 'Throughput',
      value: `${m.currentTps}`,
      sub: 'tasks / sec',
      accent: '#22d3ee',
    },
    {
      label: 'Success Rate',
      value: `${m.successRate.toFixed(1)}%`,
      sub: 'completed vs. failed',
      accent: m.successRate >= 99 ? '#34d399' : '#f59e0b',
    },
    {
      label: 'In Flight',
      value: `${m.inFlight}`,
      sub: 'running · retrying',
      accent: '#38bdf8',
    },
    {
      label: 'Nodes Online',
      value: `${m.online}/${m.total}`,
      sub: m.online === m.total ? 'all healthy' : 'degraded',
      accent: m.online === m.total ? '#34d399' : '#f43f5e',
      alert: m.online !== m.total,
    },
    {
      label: 'Dead Letters',
      value: `${m.deadLetters}`,
      sub: m.deadLetters ? 'needs review' : 'clear',
      accent: m.deadLetters ? '#f43f5e' : '#34d399',
      alert: m.deadLetters > 0,
    },
  ]
}

export function MetricStrip({ metrics, delay = 0 }: MetricStripProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {tiles(metrics).map((tile, i) => (
        <motion.div
          key={tile.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-2xl border p-4 backdrop-blur-2xl ${
            tile.alert
              ? 'border-rose-500/30 bg-rose-500/[0.06]'
              : 'border-white/10 bg-white/[0.04]'
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full blur-[48px]"
            style={{ backgroundColor: tile.accent, opacity: 0.35 }}
          />
          <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-neutral-500">
            {tile.label}
          </div>
          <div
            className="mt-2 font-mono text-2xl font-semibold tabular-nums"
            style={{ color: tile.accent }}
          >
            {tile.value}
          </div>
          <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">
            {tile.sub}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
