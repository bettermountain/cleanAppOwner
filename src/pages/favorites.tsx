import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  InputAdornment,
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

  // 名前でスタッフをフィルタリング
  const filteredWorkers = mockWorkers.filter((worker) =>
    worker.name.includes(query)
  )

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

      {/* スタッフカードのグリッド表示 */}
      <Grid container spacing={2}>
        {filteredWorkers.map((worker) => (
          <Grid key={worker.id} item xs={12} md={6} lg={4}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardHeader
                avatar={<Avatar src={worker.profileImage} alt={worker.name} />}
                title={worker.name}
                subheader={`評価 ${worker.rating.toFixed(1)} / 実績 ${worker.completedJobs}件`}
              />
              <CardContent>
                {/* 専門分野表示 */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                  専門分野
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {worker.specialties.map((spec) => (
                    <Chip key={spec} label={spec} size="small" />
                  ))}
                </Box>

                {/* 操作ボタン */}
                <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  )
}
