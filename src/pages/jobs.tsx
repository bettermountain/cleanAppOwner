import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/page-container'
import { StatusBadge } from '@/components/common/status-badge'
import { mockJobs } from '@/data/jobs'
import { useMemo, useState } from 'react'

import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'

import {
  Add as AddIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarMonthIcon,
  AccessTime as AccessTimeIcon,
  Place as PlaceIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
} from '@mui/icons-material'

type Density = 'comfortable' | 'compact'

// Jobs page redesigned with Material UI for a minimal, information-first layout
export function JobsPage() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'all' | 'open' | 'progress' | 'submitted' | 'done'>('all')
  const [from, setFrom] = useState('') // YYYY-MM-DD
  const [to, setTo] = useState('')
  const [sort, setSort] = useState<'date_desc' | 'date_asc' | 'pay_desc' | 'pay_asc'>('date_desc')
  const [density, setDensity] = useState<Density>('comfortable')

  const getPayTypeLabel = (payType: string) => (payType === 'hourly' ? '時給' : '固定')

  const counts = useMemo(() => ({
    open: mockJobs.filter((j) => j.status === 'open').length,
    progress: mockJobs.filter((j) => ['assigned', 'in_progress'].includes(j.status)).length,
    submitted: mockJobs.filter((j) => j.status === 'submitted').length,
    done: mockJobs.filter((j) => ['completed', 'approved'].includes(j.status)).length,
  }), [])

  const filtered = useMemo(() => {
    const inTab = (status: string) => {
      if (tab === 'all') return true
      if (tab === 'open') return status === 'open'
      if (tab === 'progress') return ['assigned', 'in_progress'].includes(status)
      if (tab === 'submitted') return status === 'submitted'
      if (tab === 'done') return ['completed', 'approved'].includes(status)
      return true
    }

    const inDate = (d: string) => {
      if (from && d < from) return false
      if (to && d > to) return false
      return true
    }

    const q = query.trim().toLowerCase()

    return mockJobs
      .filter((j) => inTab(j.status))
      .filter((j) => inDate(j.jobDate))
      .filter((j) =>
        !q ||
        j.property.name.toLowerCase().includes(q) ||
        j.property.address.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
      )
  }, [tab, from, to, query])

  const data = useMemo(() => {
    const sorted = [...filtered]
    sorted.sort((a, b) => {
      if (sort === 'date_desc') return a.jobDate < b.jobDate ? 1 : -1
      if (sort === 'date_asc') return a.jobDate > b.jobDate ? 1 : -1
      if (sort === 'pay_desc') return b.payAmount - a.payAmount
      if (sort === 'pay_asc') return a.payAmount - b.payAmount
      return 0
    })
    return sorted
  }, [filtered, sort])

  const rowPy = density === 'compact' ? 0.75 : 1.25
  const fontSize = density === 'compact' ? '0.85rem' : '0.95rem'

  return (
    <PageContainer>
      {/* Title + Primary action */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight={700}>案件管理</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>清掃案件の作成・管理・進捗確認</Typography>
        </Box>
        <Button component={Link} to="/jobs/new" variant="contained" startIcon={<AddIcon />}>新規案件作成</Button>
      </Box>

      {/* Status tabs with counts */}
      <Paper variant="outlined" sx={{ borderRadius: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="all" label="すべて" />
          <Tab value="open" label={`公開中 (${counts.open})`} />
          <Tab value="progress" label={`進行中 (${counts.progress})`} />
          <Tab value="submitted" label={`確認待ち (${counts.submitted})`} />
          <Tab value="done" label={`完了 (${counts.done})`} />
        </Tabs>
      </Paper>

      {/* Filter toolbar */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
          <TextField
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="案件名・住所・説明を検索"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="開始日"
            type="date"
            size="small"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="終了日"
            type="date"
            size="small"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="sort-label">並び替え</InputLabel>
            <Select
              labelId="sort-label"
              label="並び替え"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
            >
              <MenuItem value="date_desc">日付(新しい順)</MenuItem>
              <MenuItem value="date_asc">日付(古い順)</MenuItem>
              <MenuItem value="pay_desc">報酬(高い順)</MenuItem>
              <MenuItem value="pay_asc">報酬(低い順)</MenuItem>
            </Select>
          </FormControl>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={density}
            onChange={(_, v) => v && setDensity(v)}
          >
            <ToggleButton value="comfortable">標準</ToggleButton>
            <ToggleButton value="compact">コンパクト</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Paper>

      {/* Results table */}
      <Paper variant="outlined" sx={{ borderRadius: 2 }}>
        <TableContainer sx={{ maxHeight: 560 }}>
          <Table stickyHeader size={density === 'compact' ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell>物件</TableCell>
                <TableCell>日付・時間</TableCell>
                <TableCell>想定時間</TableCell>
                <TableCell>報酬</TableCell>
                <TableCell>担当/応募</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box py={6} textAlign="center">
                      <Typography variant="subtitle1" fontWeight={700}>該当する案件がありません</Typography>
                      <Typography variant="body2" color="text.secondary" mt={0.5}>条件を調整してください</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {data.map((j) => (
                <TableRow key={j.id} hover sx={{ '& td': { py: rowPy, fontSize } }}>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle2" fontWeight={700}>{j.property.name}の清掃</Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <PlaceIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">{j.property.address}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        {j.publicOrInvite === 'invite_only' && <Chip label="指名限定" size="small" variant="outlined" color="info" />}
                        {j.tipAllowed && <Chip label="チップ可" size="small" variant="outlined" color="success" />}
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <CalendarMonthIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {new Date(j.jobDate).toLocaleDateString('ja-JP')} {j.startTime}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2">{j.expectedHours}時間</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <AttachMoneyIcon fontSize="small" color="action" />
                      <Typography variant="body2">¥{j.payAmount.toLocaleString()}・{getPayTypeLabel(j.payType)}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {j.assignedWorker ? (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="body2">{j.assignedWorker.name}</Typography>
                        <StarIcon sx={{ fontSize: 16 }} color="warning" />
                        <Typography variant="caption" color="text.secondary">{j.assignedWorker.rating}</Typography>
                      </Stack>
                    ) : j.status === 'open' && j.applications ? (
                      <Typography variant="body2" color="success.main" fontWeight={600}>{j.applications}件の応募</Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">—</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={j.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button component={Link} to={`/jobs/${j.id}`} size="small" variant="contained">管理</Button>
                      <Button size="small" variant="outlined">詳細</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </PageContainer>
  )
}
