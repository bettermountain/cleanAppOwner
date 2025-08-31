import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/page-container'
import { mockNotifications } from '@/data/notifications'
import { mockJobs } from '@/data/jobs'
import { mockInvoices } from '@/data/invoices'

import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  // IconButton,
  // Tooltip,
  // Divider,
} from '@mui/material'

import {
  Notifications as NotificationsIcon,
  WorkOutline as WorkOutlineIcon,
  EventAvailable as EventAvailableIcon,
  ReceiptLong as ReceiptLongIcon,
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material'

// オーナー向けダッシュボード
export function DashboardPage() {
  // 指標の集計
  const stats = useMemo(() => {
    const unread = mockNotifications.filter(n => !n.readAt).length
    const openJobs = mockJobs.filter(j => j.status === 'open').length
    const now = new Date()
    const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const upcomingThisWeek = mockJobs.filter(j => {
      const d = new Date(j.jobDate)
      return d >= new Date(now.toDateString()) && d <= in7days
    }).length
    const unpaid = mockInvoices.filter(inv => ['issued', 'overdue'].includes(inv.status)).length
    const unpaidTotal = mockInvoices
      .filter(inv => ['issued', 'overdue'].includes(inv.status))
      .reduce((sum, inv) => sum + inv.total, 0)
    return { unread, openJobs, upcomingThisWeek, unpaid, unpaidTotal }
  }, [])

  // 近日の清掃（5件）
  const upcomingJobs = useMemo(() => {
    const today = new Date(new Date().toDateString())
    return [...mockJobs]
      .filter(j => new Date(j.jobDate) >= today)
      .sort((a, b) => a.jobDate.localeCompare(b.jobDate))
      .slice(0, 5)
  }, [])

  // 最近の通知（5件）
  const recentNotifications = useMemo(() => {
    return [...mockNotifications]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5)
  }, [])

  const formatCurrency = (yen: number) => `¥${yen.toLocaleString('ja-JP')}`

  return (
    <PageContainer>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" component="h1">ダッシュボード</Typography>
          <Typography variant="body2" color="text.secondary">依頼の状況と最新アクティビティを確認</Typography>
        </Box>
        <Box display="flex" gap={1} flexWrap="wrap" width={{ xs: '100%', sm: 'auto' }} justifyContent={{ xs: 'flex-end', sm: 'flex-start' }}>
          <Button component={Link} to="/jobs" variant="contained" startIcon={<AddIcon />}>案件を作成</Button>
          <Button component={Link} to="/properties" variant="outlined">物件を追加</Button>
        </Box>
      </Box>

      {/* KPI cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2" color="primary">未読通知</Typography>
              <Typography variant="h4">{stats.unread}</Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <NotificationsIcon />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2" color="success.main">公開中の募集</Typography>
              <Typography variant="h4">{stats.openJobs}</Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'success.main' }}>
              <WorkOutlineIcon />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2" color="info.main">今週の清掃</Typography>
              <Typography variant="h4">{stats.upcomingThisWeek}</Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'info.main' }}>
              <EventAvailableIcon />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2" color="secondary">未払い請求</Typography>
              <Box display="flex" alignItems="baseline" gap={1}>
                <Typography variant="h4">{stats.unpaid}</Typography>
                <Typography variant="caption" color="text.secondary">合計 {formatCurrency(stats.unpaidTotal)}</Typography>
              </Box>
            </Box>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <ReceiptLongIcon />
            </Avatar>
          </Paper>
        </Grid>
      </Grid>

      {/* Content sections */}
      <Grid container spacing={2}>
        {/* Upcoming jobs */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6">近日の清掃予定</Typography>
              <Button component={Link} to="/jobs" endIcon={<ArrowForwardIcon />} size="small">すべて見る</Button>
            </Box>
            {upcomingJobs.length === 0 ? (
              <Box textAlign="center" py={6} color="text.secondary">予定はありません</Box>
            ) : (
              <List>
                {upcomingJobs.map(job => (
                  <ListItem key={job.id} divider secondaryAction={
                    <Chip size="small" label={job.status} color={['in_progress','assigned'].includes(job.status) ? 'primary' : job.status === 'open' ? 'default' : 'success'} />
                  }>
                    <ListItemAvatar>
                      <Avatar>
                        <EventAvailableIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography fontWeight={600}>{job.property?.name ?? '物件'}</Typography>
                          <Typography variant="body2" color="text.secondary">{job.jobDate} {job.startTime}</Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          所要時間 約{job.expectedHours}時間 ・ 報酬 {job.payType === 'hourly' ? '時給' : '固定'} {job.payAmount.toLocaleString()}円
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Recent notifications */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6">最近の通知</Typography>
              <Button component={Link} to="/notifications" endIcon={<ArrowForwardIcon />} size="small">すべて見る</Button>
            </Box>
            {recentNotifications.length === 0 ? (
              <Box textAlign="center" py={6} color="text.secondary">通知はありません</Box>
            ) : (
              <List>
                {recentNotifications.map(n => (
                  <ListItem key={n.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: n.readAt ? 'grey.300' : 'primary.light' }}>
                        <NotificationsIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography fontWeight={n.readAt ? 400 : 600}>{n.title}</Typography>
                          {!n.readAt && <Chip size="small" label="新着" color="primary" variant="outlined" />}
                        </Box>
                      }
                      secondary={
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <AccessTimeIcon fontSize="inherit" />
                          <Typography variant="caption" color="text.secondary">{new Date(n.createdAt).toLocaleString('ja-JP')}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Billing callout */}
      <Paper sx={{ p: 2, display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="subtitle1">請求管理</Typography>
          <Typography variant="body2" color="text.secondary">
            未払い {stats.unpaid} 件 ・ 合計 {formatCurrency(stats.unpaidTotal)}
          </Typography>
        </Box>
        <Button component={Link} to="/billing" variant="outlined" endIcon={<ArrowForwardIcon />} sx={{ alignSelf: { xs: 'flex-end', sm: 'center' } }}>請求を確認</Button>
      </Paper>
    </PageContainer>
  )
}
