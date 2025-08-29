import { useMemo } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import RefreshIcon from '@mui/icons-material/Refresh'
import PersonIcon from '@mui/icons-material/Person'
import PlaceIcon from '@mui/icons-material/Place'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { PageContainer } from '@/components/layout/page-container'
import { StatusBadge } from '@/components/common/status-badge'
import { mockAssignments } from '@/data/assignments'

// 進捗モニターページ
export function ProgressPage() {
  // ステータスごとの件数を集計
  const summary = useMemo(() => ({
    assigned: mockAssignments.filter(a => a.status === 'assigned').length,
    checked_in: mockAssignments.filter(a => a.status === 'checked_in').length,
    in_progress: mockAssignments.filter(a => a.status === 'in_progress').length,
    submitted: mockAssignments.filter(a => a.status === 'submitted').length,
    approved: mockAssignments.filter(a => a.status === 'approved').length,
  }), [])

  // 指定日時からの経過時間を「〜分前」の形式で返す
  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}時間前`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}日前`
  }

  // サマリーカードの設定配列
  const summaryCards = [
    { label: 'アサイン済み', count: summary.assigned, icon: PersonIcon, color: 'info.main' },
    { label: '到着済み', count: summary.checked_in, icon: PlaceIcon, color: 'primary.main' },
    { label: '作業中', count: summary.in_progress, icon: PlayArrowIcon, color: 'warning.main' },
    { label: '提出済み', count: summary.submitted, icon: CameraAltIcon, color: 'secondary.main' },
    { label: '承認済み', count: summary.approved, icon: CheckCircleIcon, color: 'success.main' },
  ]

  return (
    <PageContainer>
      {/* ページヘッダー */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight="bold">進捗モニター</Typography>
          <Typography variant="body2" color="text.secondary">リアルタイムでの作業進捗確認</Typography>
        </Box>
        <Button variant="contained" startIcon={<RefreshIcon />}>更新</Button>
      </Box>

      {/* 検索バーとステータスフィルター */}
      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          placeholder="物件名、スタッフ名で検索..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" startIcon={<FilterListIcon />}>ステータス</Button>
      </Box>

      {/* ステータス概要カード */}
      <Box
        display="grid"
        gap={2}
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(auto-fit, minmax(180px, 1fr))',
            md: 'repeat(5, 1fr)',
          },
        }}
      >
        {summaryCards.map(({ label, count, icon: Icon, color }) => (
          <Card key={label} variant="outlined" sx={{ borderTop: 4, borderColor: color }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" color="text.secondary">{label}</Typography>
                  <Typography variant="h5">{count}</Typography>
                </Box>
                <Icon sx={{ color, fontSize: 32 }} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 各アサインメントの詳細カード */}
      <Stack spacing={2}>
        {mockAssignments.map((assignment) => (
          <Card key={assignment.id} variant="outlined">
            <CardHeader
              title={assignment.propertyName}
              subheader={`${assignment.workerName} - ${new Date(assignment.jobDate).toLocaleDateString('ja-JP')} ${assignment.startTime}`}
              action={<StatusBadge status={assignment.status} type="assignment" />}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  {/* 現在の作業 */}
                  <Box display="flex" alignItems="center">
                    <PlayArrowIcon sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{assignment.currentTask}</Typography>
                      <Typography variant="caption" color="text.secondary">現在の作業</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  {/* 進捗バー */}
                  <Box display="flex" alignItems="center">
                    <Box sx={{ width: 40, mr: 1 }}>
                      <Typography variant="body2" align="center" color="primary">{assignment.progress}%</Typography>
                    </Box>
                    <Box flexGrow={1}>
                      <Typography variant="body2">進捗 {assignment.progress}%</Typography>
                      <LinearProgress variant="determinate" value={assignment.progress} sx={{ mt: 1, height: 6, borderRadius: 1 }} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  {/* 提出済み写真枚数 */}
                  <Box display="flex" alignItems="center">
                    <CameraAltIcon sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{assignment.photosSubmitted}/{assignment.totalPhotosRequired}</Typography>
                      <Typography variant="caption" color="text.secondary">写真提出</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  {/* 経過時間 */}
                  <Box display="flex" alignItems="center">
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {assignment.status === 'in_progress' && assignment.startedAt ? formatTimeAgo(assignment.startedAt)
                          : assignment.status === 'checked_in' && assignment.checkedInAt ? formatTimeAgo(assignment.checkedInAt)
                          : assignment.status === 'submitted' && assignment.submittedAt ? formatTimeAgo(assignment.submittedAt)
                          : '-'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {assignment.status === 'in_progress' ? '作業開始'
                          : assignment.status === 'checked_in' ? '到着時刻'
                          : assignment.status === 'submitted' ? '提出時刻'
                          : '更新時刻'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* メモがある場合に表示 */}
              {assignment.notes && (
                <Box mt={2} p={2} bgcolor="action.hover" borderRadius={1}>
                  <Typography variant="caption" color="text.secondary">作業メモ:</Typography>
                  <Typography variant="body2">{assignment.notes}</Typography>
                </Box>
              )}

              {/* アクションボタン */}
              <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                <Button variant="outlined" size="small">詳細</Button>
                {assignment.status === 'submitted' && (
                  <Button variant="contained" size="small">写真確認</Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* 追加読み込みボタン */}
      <Box display="flex" justifyContent="center">
        <Button variant="outlined">さらに表示</Button>
      </Box>
    </PageContainer>
  )
}

export default ProgressPage
