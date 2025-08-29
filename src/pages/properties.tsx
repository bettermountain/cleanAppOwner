import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  InputAdornment,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import { Plus, Search, MapPin } from 'lucide-react'
import { mockProperties } from '@/data/properties'
import { PageContainer } from '@/components/layout/page-container'

// 物件管理ページ: 登録済み物件を表形式で表示
export function PropertiesPage() {
  return (
    <PageContainer>
      {/* ページヘッダー */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            物件管理
          </Typography>
          <Typography variant="body1" color="text.secondary">
            登録物件の管理と新規物件の追加
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Plus size={20} />}>新規物件登録</Button>
      </Box>

      {/* 検索バーと地図表示ボタン */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="物件名、住所で検索..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" startIcon={<MapPin size={16} />}>地図表示</Button>
        </Box>
      </Paper>

      {/* 物件一覧テーブル */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell>物件</TableCell>
              <TableCell>住所</TableCell>
              <TableCell align="center">部屋数</TableCell>
              <TableCell align="center">定員</TableCell>
              <TableCell align="right">料金/泊</TableCell>
              <TableCell align="right">更新日</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockProperties.map((property) => (
              <TableRow key={property.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* 物件画像と名前 */}
                    <Box
                      component="img"
                      src={property.imageUrl}
                      alt={property.name}
                      sx={{ width: 64, height: 64, borderRadius: 1, objectFit: 'cover', boxShadow: 1 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>{property.name}</Typography>
                      <Chip label={property.type} size="small" sx={{ mt: 0.5 }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{property.address}</Typography>
                </TableCell>
                <TableCell align="center">{property.rooms}</TableCell>
                <TableCell align="center">{property.maxGuests}</TableCell>
                <TableCell align="right">¥{property.pricePerNight.toLocaleString()}</TableCell>
                <TableCell align="right">{new Date(property.updatedAt).toLocaleDateString('ja-JP')}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button variant="outlined" size="small">詳細</Button>
                    <Button variant="contained" size="small">編集</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* さらに表示ボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined">さらに表示</Button>
      </Box>
    </PageContainer>
  )
}

