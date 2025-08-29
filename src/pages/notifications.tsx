import { useMemo } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Chip,
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import FilterListIcon from '@mui/icons-material/FilterList'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import DeleteIcon from '@mui/icons-material/Delete'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DescriptionIcon from '@mui/icons-material/Description'
import ErrorIcon from '@mui/icons-material/Error'
import PaymentIcon from '@mui/icons-material/Payment'
import CancelIcon from '@mui/icons-material/Cancel'
import StarIcon from '@mui/icons-material/Star'
import DoneIcon from '@mui/icons-material/Done'

import { PageContainer } from '@/components/layout/page-container'
import { mockNotifications } from '@/data/notifications'
import type { Notification } from '@/schemas'

/**
 * 通知ページ: オーナー向けの各種通知を一覧表示する
 * Material UI を用いてシンプルかつ使いやすいUIを実現
 */
export function NotificationsPage() {
  // 型付けされた通知データ
  const notifications = mockNotifications as Notification[]

  // 未読件数を集計
  const unreadCount = notifications.filter(n => !n.readAt).length

  /**
   * 通知タイプごとにアイコンを返す
   */
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job_application':
        return <PeopleAltIcon />
      case 'job_submitted':
        return <CheckCircleIcon />
      case 'job_started':
        return <PlayArrowIcon />
      case 'invoice_issued':
        return <DescriptionIcon />
      case 'job_rework_requested':
        return <ErrorIcon />
      case 'payment_received':
        return <PaymentIcon />
      case 'job_cancelled':
        return <CancelIcon />
      case 'worker_rating':
        return <StarIcon />
      case 'offer_accepted':
        return <DoneIcon />
      default:
        return <NotificationsIcon />
    }
  }

  /**
   * 通知タイプごとの色設定を返す
   */
  const getNotificationColors = (type: string) => {
    switch (type) {
      case 'job_application':
        return { bg: 'success.light', color: 'success.main' }
      case 'job_submitted':
        return { bg: 'secondary.light', color: 'secondary.main' }
      case 'job_started':
        return { bg: 'warning.light', color: 'warning.main' }
      case 'invoice_issued':
        return { bg: 'info.light', color: 'info.main' }
      case 'job_rework_requested':
        return { bg: 'error.light', color: 'error.main' }
      case 'payment_received':
        return { bg: 'success.light', color: 'success.main' }
      case 'job_cancelled':
        return { bg: 'warning.light', color: 'warning.main' }
      case 'worker_rating':
        return { bg: 'secondary.light', color: 'secondary.main' }
      case 'offer_accepted':
        return { bg: 'success.light', color: 'success.main' }
      default:
        return { bg: 'grey.100', color: 'text.primary' }
    }
  }

  /**
   * 指定日時からの経過時間を「〜分前」の形式で返す
   */
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}時間前`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}日前`
  }

  /**
   * 通知内容をタイプ別に整形して返す
   */
  const getNotificationMessage = (notification: Notification) => {
    const { payload } = notification
    switch (notification.type) {
      case 'job_application':
        return `${payload.workerName}さんが${payload.propertyName}の清掃案件に応募しました。`
      case 'job_submitted':
        return `${payload.workerName}さんが${payload.propertyName}の清掃を完了し、${payload.photosCount}枚の写真を提出しました。`
      case 'job_started':
        return `${payload.workerName}さんが${payload.propertyName}の清掃作業を開始しました。`
      case 'invoice_issued':
        return `${payload.period}の請求書（¥${payload.amount?.toLocaleString()}）が発行されました。`
      case 'job_rework_requested':
        return `${payload.propertyName}の清掃について再作業が必要です。理由: ${payload.reason}`
      case 'payment_received':
        return `請求書の支払い（¥${payload.amount?.toLocaleString()}）を${payload.paymentMethod}で受領しました。`
      case 'worker_rating':
        return `${payload.workerName}さんの作業評価をお願いします。（${payload.propertyName}）`
      case 'job_cancelled':
        return `${payload.propertyName}の案件がキャンセルされました。理由: ${payload.reason}`
      case 'offer_accepted':
        return `${payload.workerName}さんが${payload.propertyName}のオファーを承諾しました。`
      default:
        return ''
    }
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
      {/* ページヘッダー */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight="bold">通知</Typography>
          <Typography variant="body2" color="text.secondary">
            {unreadCount > 0 ? `${unreadCount}件の未読通知があります` : 'すべての通知を確認済みです'}
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<FilterListIcon />}>フィルター</Button>
          <Button variant="outlined" startIcon={<DoneAllIcon />}>すべて既読</Button>
        </Box>
      </Box>

      {/* サマリーカード */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">未読</Typography>
                  <Typography variant="h5">{summary.unread}</Typography>
                </Box>
                <NotificationsIcon color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">応募通知</Typography>
                  <Typography variant="h5">{summary.application}</Typography>
                </Box>
                <PeopleAltIcon color="success" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">作業完了</Typography>
                  <Typography variant="h5">{summary.submitted}</Typography>
                </Box>
                <CheckCircleIcon color="secondary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">請求・支払</Typography>
                  <Typography variant="h5">{summary.billing}</Typography>
                </Box>
                <PaymentIcon color="success" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 通知リスト */}
      <List disablePadding>
        {notifications.map(notification => {
          const { bg, color } = getNotificationColors(notification.type)
          return (
            <ListItem
              key={notification.id}
              alignItems="flex-start"
              sx={{
                mb: 1,
                borderRadius: 1,
                bgcolor: notification.readAt ? 'background.paper' : 'action.hover',
              }}
              secondaryAction={
                <Box display="flex" alignItems="center">
                  {!notification.readAt && (
                    <Button size="small">既読</Button>
                  )}
                  <IconButton edge="end">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: bg, color }}>
                  {getNotificationIcon(notification.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {notification.title}
                    {!notification.readAt && (
                      <Chip label="未読" color="primary" size="small" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {getNotificationMessage(notification)}
                    </Typography>
                    <Typography variant="caption" color="text.disabled" mt={0.5} display="block">
                      {formatTimeAgo(notification.createdAt)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          )
        })}
      </List>

      {/* 最下部の案内メッセージ */}
      <Box textAlign="center" py={4}>
        <Typography variant="body2" color="text.secondary">
          すべての通知を表示しました
        </Typography>
      </Box>
    </PageContainer>
  )
}
