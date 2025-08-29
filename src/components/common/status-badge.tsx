import { Chip } from '@mui/material'

interface StatusBadgeProps {
  status: string
  type?: 'job' | 'assignment' | 'invoice' | 'offer'
  label?: string
}

const statusConfig = {
  job: {
    draft: { label: '下書き', color: 'default' as const },
    open: { label: '公開中', color: 'primary' as const },
    assigned: { label: 'アサイン済み', color: 'info' as const },
    in_progress: { label: '作業中', color: 'warning' as const },
    cancelled: { label: 'キャンセル', color: 'error' as const },
    completed: { label: '完了', color: 'success' as const },
  },
  assignment: {
    assigned: { label: 'アサイン済み', color: 'info' as const },
    checked_in: { label: '到着済み', color: 'primary' as const },
    in_progress: { label: '作業中', color: 'warning' as const },
    submitted: { label: '提出済み', color: 'secondary' as const },
    approved: { label: '承認済み', color: 'success' as const },
    rework: { label: '差戻し', color: 'error' as const },
    cancelled: { label: 'キャンセル', color: 'error' as const },
  },
  invoice: {
    draft: { label: '下書き', color: 'default' as const },
    issued: { label: '発行済み', color: 'primary' as const },
    paid: { label: '支払済み', color: 'success' as const },
    overdue: { label: '期限切れ', color: 'error' as const },
    void: { label: '無効', color: 'default' as const },
  },
  offer: {
    sent: { label: '送信済み', color: 'primary' as const },
    accepted: { label: '承諾済み', color: 'success' as const },
    declined: { label: '辞退', color: 'error' as const },
    expired: { label: '期限切れ', color: 'default' as const },
  },
}

export function StatusBadge({ status, type = 'job', label }: StatusBadgeProps) {
  if (label) {
    return <Chip label={label} size="small" />
  }

  const typeConfig = statusConfig[type]
  if (!typeConfig) {
    return <Chip label={status} size="small" />
  }

  let config: { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' } | undefined

  if (type === 'job') {
    config = statusConfig.job[status as keyof typeof statusConfig.job]
  } else if (type === 'assignment') {
    config = statusConfig.assignment[status as keyof typeof statusConfig.assignment]
  } else if (type === 'invoice') {
    config = statusConfig.invoice[status as keyof typeof statusConfig.invoice]
  } else if (type === 'offer') {
    config = statusConfig.offer[status as keyof typeof statusConfig.offer]
  }
  
  if (!config) {
    return <Chip label={status} size="small" />
  }

  return (
    <Chip 
      label={config.label} 
      color={config.color}
      size="small"
      variant="filled"
    />
  )
}
