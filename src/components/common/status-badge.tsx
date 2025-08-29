import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  type?: 'job' | 'assignment' | 'invoice' | 'offer'
  label?: string
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
  offer: {
    sent: { label: '送信済み', variant: 'default' as const },
    accepted: { label: '承諾済み', variant: 'secondary' as const },
    declined: { label: '辞退', variant: 'destructive' as const },
    expired: { label: '期限切れ', variant: 'outline' as const },
  },
}

export function StatusBadge({ status, type = 'job', label }: StatusBadgeProps) {
  if (label) {
    const variant = getVariantByStatus(status)
    return <Badge variant={variant}>{label}</Badge>
  }

  const typeConfig = statusConfig[type]
  if (!typeConfig) {
    return <Badge variant="outline">{status}</Badge>
  }

  let config: { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } | undefined

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
    return <Badge variant="outline">{status}</Badge>
  }

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  )
}

function getVariantByStatus(status: string) {
  switch (status) {
    case 'sent':
    case 'open':
    case 'assigned':
    case 'checked_in':
    case 'in_progress':
    case 'submitted':
    case 'issued':
      return 'default' as const
    case 'accepted':
    case 'approved':
    case 'completed':
    case 'paid':
      return 'secondary' as const
    case 'declined':
    case 'cancelled':
    case 'rework':
    case 'overdue':
      return 'destructive' as const
    case 'expired':
    case 'void':
    case 'draft':
      return 'outline' as const
    default:
      return 'outline' as const
  }
}
