import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Chip,
  InputAdornment,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { mockWorkers } from '@/data/workers'
import { PageContainer } from '@/components/layout/page-container'

/**
 * お気に入りスタッフ一覧ページ
 * Material UI を用いて、ユーザーが登録したお気に入りスタッフを一覧表示します。
 */
export function FavoriteStaffPage() {
  // 検索キーワードの状態を管理
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // 名前でスタッフをフィルタリング
  const filteredWorkers = mockWorkers.filter((worker) =>
    worker.name.includes(query)
  )
  const paginated = filteredWorkers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <PageContainer>
      {/* ページのヘッダー */}
      <Box>
        <Typography variant="h4" fontWeight="bold">
          お気に入りスタッフ
        </Typography>
        <Typography variant="body2" color="text.secondary">
          よく利用するスタッフの一覧です
        </Typography>
      </Box>

      {/* 検索入力欄 */}
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="スタッフ名で検索"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      {/* スタッフ情報を表形式で表示 */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          {/* 表ヘッダー */}
          <TableHead>
            <TableRow>
              <TableCell>スタッフ</TableCell>
              <TableCell>評価 / 実績</TableCell>
              <TableCell>専門分野</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          {/* 表ボディ */}
          <TableBody>
            {paginated.map((worker) => (
              <TableRow key={worker.id} hover>
                {/* スタッフ名とアイコン */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={worker.profileImage} alt={worker.name} />
                    <Typography fontWeight="bold">{worker.name}</Typography>
                  </Box>
                </TableCell>
                {/* 評価と実績 */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Rating
                      name={`rating-${worker.id}`}
                      value={worker.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography variant="body2" color="text.secondary">
                      {worker.completedJobs}件
                    </Typography>
                  </Box>
                </TableCell>
                {/* 専門分野 */}
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {worker.specialties.map((spec) => (
                      <Chip key={spec} label={spec} size="small" />
                    ))}
                  </Box>
                </TableCell>
                {/* 操作ボタン */}
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Button size="small" variant="outlined">
                      詳細
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      startIcon={<FavoriteIcon />}
                    >
                      解除
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredWorkers.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="1ページあたり"
        />
      </TableContainer>
    </PageContainer>
  )
}
