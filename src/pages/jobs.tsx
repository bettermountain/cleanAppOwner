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
  ButtonGroup,
  Menu,
  Divider,
  TablePagination,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import {
  Add as AddIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarMonthIcon,
  Place as PlaceIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
} from '@mui/icons-material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import { useNavigate } from 'react-router-dom'

type JobStatus =
  | 'open'
  | 'assigned'
  | 'in_progress'
  | 'submitted'
  | 'completed'
  | 'approved'
  | 'cancelled'
  | 'draft'
  | 'rework'

// Jobs page redesigned with Material UI for a minimal, information-first layout
export function JobsPage() {
  const [jobs, setJobs] = useState(mockJobs)
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'all' | 'open' | 'progress' | 'submitted' | 'done'>('all')
  const [from, setFrom] = useState('') // YYYY-MM-DD
  const [to, setTo] = useState('')
  const [sort, setSort] = useState<'date_desc' | 'date_asc' | 'pay_desc' | 'pay_asc'>('date_desc')
  // 常にコンパクト表示

  const getPayTypeLabel = (payType: string) => (payType === 'hourly' ? '時給' : '固定')

  const counts = useMemo(() => ({
    open: jobs.filter((j) => j.status === 'open').length,
    progress: jobs.filter((j) => ['assigned', 'in_progress'].includes(j.status)).length,
    submitted: jobs.filter((j) => j.status === 'submitted').length,
    done: jobs.filter((j) => ['completed', 'approved'].includes(j.status)).length,
  }), [jobs])

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

    return jobs
      .filter((j) => inTab(j.status))
      .filter((j) => inDate(j.jobDate))
      .filter((j) =>
        !q ||
        j.property.name.toLowerCase().includes(q) ||
        j.property.address.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
      )
  }, [tab, from, to, query, jobs])

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

  const rowPy = 0.75
  const fontSize = '0.85rem'
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const paginated = useMemo(() => data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [data, page, rowsPerPage])

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

      {/* Tabs header (no card) */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', position: 'sticky', top: 0, zIndex: 1 }}>
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
      </Box>

      {/* Filter row (no card) */}
      <Box sx={{ py: 0, px: 2, borderColor: 'divider', bgcolor: 'background.paper', position: 'sticky', top: 48, zIndex: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', md: 'center' }}>
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
          <Button size="small" color="inherit" onClick={() => { setQuery(''); setFrom(''); setTo(''); setSort('date_desc') }}>全クリア</Button>
        </Stack>
      </Box>

      {/* Results table */}
      <Paper variant="outlined" sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 560, overflowX: 'auto', width: '100%' }}>
          <Table stickyHeader size="small" sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.100' }}>
                <TableCell>物件</TableCell>
                <TableCell>日付・時間</TableCell>
                <TableCell>報酬</TableCell>
                <TableCell>担当/応募</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box py={6} textAlign="center">
                      <Typography variant="subtitle1" fontWeight={700}>該当する案件がありません</Typography>
                      <Typography variant="body2" color="text.secondary" mt={0.5}>条件を調整してください</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {paginated.map((j) => (
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
                  <TableCell align="center">
                    <JobActionSplitButton
                      jobId={j.id}
                      currentStatus={j.status as JobStatus}
                      onChangeStatus={(status) => {
                        setJobs((prev) => prev.map((row) => row.id === j.id ? { ...row, status } : row))
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="1ページあたり"
        />
      </Paper>
    </PageContainer>
  )
}

// 操作スプリットボタン（物件管理ページと同じスタイル）
type JobActionKey = 'manage' | 'copy' | 'edit' | 'view' | 'delete'

function JobActionSplitButton({ jobId, currentStatus, onChangeStatus }: { jobId: string, currentStatus: JobStatus, onChangeStatus: (s: JobStatus) => void }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [selected, setSelected] = useState<JobActionKey>('manage')
  const statusOptions: { value: JobStatus, label: string }[] = [
    { value: 'open', label: '公開中' },
    { value: 'assigned', label: '割当済み' },
    { value: 'in_progress', label: '作業中' },
    { value: 'submitted', label: '提出済み' },
    { value: 'completed', label: '完了' },
    { value: 'approved', label: '承認済み' },
    { value: 'rework', label: '再作業' },
    { value: 'cancelled', label: 'キャンセル' },
    { value: 'draft', label: '下書き' },
  ]

  const handleMainClick = () => {
    switch (selected) {
      case 'manage':
        navigate(`/jobs/${jobId}`)
        break
      case 'edit':
        // 編集画面未実装のため暫定で詳細に遷移
        navigate(`/jobs/${jobId}`)
        break
      case 'view':
        navigate(`/jobs/${jobId}`)
        break
      case 'copy':
      case 'delete':
      default:
        // eslint-disable-next-line no-console
        console.log(`${selected} 実行`, { jobId })
    }
  }

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)
  const selectAndClose = (key: JobActionKey) => () => {
    setSelected(key)
    setAnchorEl(null)
  }

  const menuItemSx = { fontSize: 14 }

  return (
    <>
      <ButtonGroup
        variant="contained"
        sx={{
          bgcolor: '#374151',
          '&:hover': { bgcolor: '#323844' },
          boxShadow: 'none',
          '& .MuiButton-root': { color: '#fff', textWrap: 'nowrap' },
          '& .MuiButtonGroup-grouped:not(:last-of-type)': { borderColor: 'rgba(255,255,255,0.35)' },
        }}
      >
        <Button onClick={handleMainClick} sx={{ px: 2.5 }}>
          {selected === 'manage' && '管理する'}
          {selected === 'copy' && 'コピーする'}
          {selected === 'edit' && '編集する'}
          {selected === 'view' && '確認する'}
          {selected === 'delete' && '削除する'}
        </Button>
        <Button onClick={handleToggle} sx={{ minWidth: 40, px: 1 }} aria-haspopup="menu" aria-expanded={open ? 'true' : undefined}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={selectAndClose('manage')} sx={menuItemSx}>
          <ListItemIcon><AssignmentTurnedInIcon fontSize="small" /></ListItemIcon>
          <ListItemText>管理する</ListItemText>
        </MenuItem>
        <MenuItem onClick={selectAndClose('copy')} sx={menuItemSx}>
          <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText>コピーする</ListItemText>
        </MenuItem>
        <MenuItem onClick={selectAndClose('edit')} sx={menuItemSx}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText>編集する</ListItemText>
        </MenuItem>
        <MenuItem onClick={selectAndClose('view')} sx={menuItemSx}>
          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
          <ListItemText>確認する</ListItemText>
        </MenuItem>
        <MenuItem onClick={selectAndClose('delete')} sx={{ ...menuItemSx, color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}><DeleteOutlineIcon fontSize="small" /></ListItemIcon>
          <ListItemText>削除する</ListItemText>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem disabled sx={{ fontSize: 12, color: 'text.secondary', cursor: 'default' }}>
          ステータス変更
        </MenuItem>
        {statusOptions.map((opt) => (
          <MenuItem
            key={opt.value}
            onClick={() => { onChangeStatus(opt.value); handleClose() }}
            disabled={currentStatus === opt.value}
            sx={{ fontSize: 14 }}
          >
            <ListItemText>{opt.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
