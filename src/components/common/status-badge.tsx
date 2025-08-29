import React from 'react'
import { Badge } from "@/components/ui/badge"
import type { JobPost, Assignment, Invoice } from "@/schemas"

interface StatusBadgeProps {
  status: JobPost['status'] | Assignment['status'] | Invoice['status']
  type?: 'job' | 'assignment' | 'invoice'
}

const statusConfig = {
  job: {
    draft: { label: '下書き', variant: 'secondary' as const },
    open: { label: '公開中', variant: 'default' as const },
    assigned: { label: 'アサイン済み', variant: 'default' as const },
    in_progress: { label: '作業中', variant: 'default' as const },
    cancelled: { label: 'キャンセル', variant: 'destructive' as const },
    completed: { label: '完了', variant: 'secondary' as const },
  },
  assignment: {
    assigned: { label: 'アサイン済み', variant: 'default' as const },
    checked_in: { label: '到着済み', variant: 'default' as const },
    in_progress: { label: '作業中', variant: 'default' as const },
    submitted: { label: '提出済み', variant: 'default' as const },
    approved: { label: '承認済み', variant: 'secondary' as const },
    rework: { label: '差戻し', variant: 'destructive' as const },
    cancelled: { label: 'キャンセル', variant: 'destructive' as const },
  },
  invoice: {
    draft: { label: '下書き', variant: 'secondary' as const },
    issued: { label: '発行済み', variant: 'default' as const },
    paid: { label: '支払済み', variant: 'secondary' as const },
    overdue: { label: '期限切れ', variant: 'destructive' as const },
    void: { label: '無効', variant: 'outline' as const },
  },
}

export function StatusBadge({ status, type = 'job' }: StatusBadgeProps) {
  const typeConfig = statusConfig[type]
  const config = typeConfig[status as keyof typeof typeConfig]
  
  if (!config) {
    return <Badge variant="outline">{status}</Badge>
  }

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  )
}
