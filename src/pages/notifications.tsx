import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography
} from '@mui/material'
import {
  AccessTime,
  Cancel,
  CheckCircle,
  Delete,
  DoneAll,
  FilterList,
  Group,
  Payment,
  ReceiptLong,
  Star
} from '@mui/icons-material'
import { mockNotifications } from '@/data/notifications'
import { PageContainer } from '@/components/layout/page-container'
import { mockNotifications } from '@/data/notifications'
import type { Notification } from '@/schemas'

// Single notification item type derived from mock data
type Notification = (typeof mockNotifications)[number]

/**
 * オーナー向け通知一覧ページ
 * MUIコンポーネントを用いてシンプルで直感的なUIを構築します。
 */
export function NotificationsPage() {
  /**
   * 通知タイプごとのアイコンを返すヘルパー
   */
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'job_application':
        return <Group fontSize="small" />
      case 'job_submitted':
        return <CheckCircle fontSize="small" />
      case 'job_started':
        return <AccessTime fontSize="small" />
      case 'invoice_issued':
        return <ReceiptLong fontSize="small" />
      case 'job_rework_requested':
        return <Cancel fontSize="small" />
      case 'payment_received':
        return <Payment fontSize="small" />
      case 'job_cancelled':
        return <Cancel fontSize="small" />
      case 'worker_rating':
        return <Star fontSize="small" />
      case 'offer_accepted':
        return <CheckCircle fontSize="small" />
      default:
        return <AccessTime fontSize="small" />
    }
  }

  /**
   * 通知タイプに応じたアバター背景色を返す
   */
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'job_application':
        return 'success.main'
      case 'job_submitted':
        return 'info.main'
      case 'job_started':
        return 'warning.main'
      case 'invoice_issued':
        return 'secondary.main'
      case 'job_rework_requested':
        return 'error.main'
      case 'payment_received':
        return 'success.dark'
      case 'job_cancelled':
        return 'error.main'
      case 'worker_rating':
        return 'warning.dark'
      case 'offer_accepted':
        return 'success.main'
      default:
        return 'grey.500'
    }
  }

  /**
   * 相対時間表示を生成（例: "3分前"）
   */
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
    return `${Math.floor(diffInMinutes / 1440)}日前`
  }

  // サマリー表示用の件数集計
  const summary = useMemo(
    () => ({
      unread: unreadCount,
      application: notifications.filter(n => n.type === 'job_application').length,
      submitted: notifications.filter(n => n.type === 'job_submitted').length,
      billing: notifications.filter(n => ['invoice_issued', 'payment_received'].includes(n.type)).length,
    }),
    [notifications, unreadCount]
  )

  return (
    <PageContainer>
      {/* ===== Header with actions ===== */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            通知
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {unreadCount > 0
              ? `${unreadCount}件の未読通知があります`
              : 'すべての通知を確認済みです'}
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<FilterList />}>
            フィルター
          </Button>
          <Button variant="outlined" startIcon={<DoneAll />}>
            すべて既読
          </Button>
        </Box>
      </Box>

      {/* ===== Summary cards ===== */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle2" color="primary">
                未読
              </Typography>
              <Typography variant="h5">{unreadCount}</Typography>
            </Box>
            <AccessTime color="primary" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle2" color="success">
                応募通知
              </Typography>
              <Typography variant="h5">
                {mockNotifications.filter(n => n.type === 'job_application').length}
              </Typography>
            </Box>
            <Group color="success" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle2" color="info">
                作業完了
              </Typography>
              <Typography variant="h5">
                {mockNotifications.filter(n => n.type === 'job_submitted').length}
              </Typography>
            </Box>
            <CheckCircle color="info" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle2" color="secondary">
                請求・支払
              </Typography>
              <Typography variant="h5">
                {mockNotifications.filter(n => ['invoice_issued', 'payment_received'].includes(n.type)).length}
              </Typography>
            </Box>
            <Payment color="secondary" />
          </Paper>
        </Grid>
      </Grid>

      {/* ===== Notification list ===== */}
      <List sx={{ width: '100%' }}>
        {mockNotifications.map(notification => (
          <Paper
            key={notification.id}
            sx={{
              mb: 2,
              bgcolor: notification.readAt ? 'background.paper' : 'action.hover'
            }}
          >
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Box>
                  {!notification.readAt && (
                    <Tooltip title="既読">
                      <IconButton edge="end" size="small" color="primary">
                        <CheckCircle fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="削除">
                    <IconButton edge="end" size="small" color="inherit">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getNotificationColor(notification.type) }}>
                  {getNotificationIcon(notification.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={600}>
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <Box component="span" sx={{ display: 'block', mt: 1 }}>
                    {/* 通知タイプごとの詳細メッセージ */}
                    {notification.type === 'job_application' && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{notification.payload.workerName}</strong>
                        さんが<strong>{notification.payload.propertyName}</strong>
                        の清掃案件に応募しました。
                      </Typography>
                    )}
                    {notification.type === 'job_submitted' && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{notification.payload.workerName}</strong>
                        さんが<strong>{notification.payload.propertyName}</strong>
                        の清掃を完了し、写真を提出しました。
                      </Typography>
                    )}
                    {notification.type === 'job_started' && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{notification.payload.workerName}</strong>
                        さんが<strong>{notification.payload.propertyName}</strong>
                        の清掃作業を開始しました。
                      </Typography>
                    )}
                    {notification.type === 'invoice_issued' && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{notification.payload.period}</strong>
                        の請求書が発行されました。支払期限:
                        {notification.payload.dueDate
                          ? new Date(notification.payload.dueDate).toLocaleDateString('ja-JP')
                          : '未定'}
                      </Typography>
                    )}
                    {notification.type === 'job_rework_requested' && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{notification.payload.propertyName}</strong>
                        の清掃について再作業が必要です。理由: {notification.payload.reason}
                      </Typography>
                    )}
                    {notification.type === 'payment_received' && (
                      <Typography variant="body2" color="text.secondary">
                        請求書の支払い（¥{notification.payload.amount?.toLocaleString()}）を受領しました。
                      </Typography>
                    )}
                    {notification.type === 'worker_rating' && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{notification.payload.workerName}</strong>さんの作業評価をお願いします。
                      </Typography>
                    )}
                    {notification.type === 'offer_accepted' && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{notification.payload.workerName}</strong>
                        さんが<strong>{notification.payload.propertyName}</strong>
                        のオファーを承諾しました。
                      </Typography>
                    )}
                    {/* 相対時間表示 */}
                    <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                      <AccessTime fontSize="inherit" />
                      <Typography variant="caption" color="text.secondary">
                        {formatTimeAgo(notification.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      {/* ===== End of list message ===== */}
      <Box textAlign="center" py={4}>
        <CheckCircle color="disabled" sx={{ fontSize: 40, mb: 2 }} />
        <Typography color="text.secondary">すべての通知を表示しました</Typography>
      </Box>
    </PageContainer>
  )
}

