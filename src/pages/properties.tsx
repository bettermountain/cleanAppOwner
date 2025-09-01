import React from 'react'
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
  TableBody,
  TablePagination,
  TableSortLabel,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Plus, Search, MapPin } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { mockProperties } from '@/data/properties'
import { PageContainer } from '@/components/layout/page-container'
import { useNavigate } from 'react-router-dom'

// 操作用のスプリットボタン
type ActionKey = 'create' | 'copy' | 'edit' | 'view' | 'delete'

function ActionSplitButton({ propertyId }: { propertyId: string }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [selected, setSelected] = React.useState<ActionKey>('create')

  const handleMainClick = () => {
    switch (selected) {
      case 'create':
        // 依頼作成ページへ遷移（物件IDを引き継ぎ）
        navigate(`/jobs/new?propertyId=${propertyId}`)
        break
      case 'edit':
        // 物件編集ページが未定のため暫定で物件一覧に遷移
        navigate('/properties')
        break
      case 'view':
        navigate('/properties')
        break
      case 'copy':
      case 'delete':
      default:
        // eslint-disable-next-line no-console
        console.log(`${selected} 実行`, { propertyId })
    }
  }

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)
  const selectAndClose = (key: ActionKey) => () => {
    setSelected(key)
    setAnchorEl(null)
  }

  const menuItemSx = { fontSize: 14 }

  return (
    <>
      <ButtonGroup
        variant="contained"
        sx={{
          bgcolor: '#374151', // slate-700
          '&:hover': { bgcolor: '#323844' },
          boxShadow: 'none',
          '& .MuiButton-root': { color: '#fff', textWrap: 'nowrap' },
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: 'rgba(255,255,255,0.35)'
          },
        }}
      >
        <Button onClick={handleMainClick} sx={{ px: 2.5 }}>
          {selected === 'create' && '依頼を作成する'}
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
        <MenuItem onClick={selectAndClose('create')} sx={menuItemSx}>
          <ListItemIcon><AssignmentTurnedInIcon fontSize="small" /></ListItemIcon>
          <ListItemText>依頼を作成する</ListItemText>
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
      </Menu>
    </>
  )
}

// 物件管理ページ: 登録済み物件を表形式で表示
export function PropertiesPage() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = React.useState<'name' | 'publicName' | 'address'>('name')

  // Locale-aware comparator for Japanese strings
  const collator = React.useMemo(() => new Intl.Collator('ja', { numeric: true, sensitivity: 'base' }), [])
  const comparator = React.useCallback(
    (a: typeof mockProperties[number], b: typeof mockProperties[number]) => {
      const av = a[orderBy] as string
      const bv = b[orderBy] as string
      const result = collator.compare(av ?? '', bv ?? '')
      return order === 'asc' ? result : -result
    },
    [order, orderBy, collator]
  )

  const sorted = React.useMemo(() => [...mockProperties].sort(comparator), [comparator])
  const paginated = React.useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page, rowsPerPage]
  )

  const handleRequestSort = (property: 'name' | 'publicName' | 'address') => () => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setPage(0)
  }

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
        <Button component={RouterLink} to="/properties/new" variant="contained" startIcon={<Plus size={20} />}>物件登録</Button>
      </Box>

      {/* 検索バーと地図表示ボタン（カードなし） */}
      <Box sx={{ my: 2 }}>
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
          {/* <Button variant="outlined" startIcon={<MapPin size={16} />}>地図表示</Button> */}
        </Box>
      </Box>

      {/* 物件一覧テーブル */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100%' }}>
        <Table sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell sortDirection={orderBy === 'name' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={handleRequestSort('name')}
                >
                  物件名
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'publicName' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'publicName'}
                  direction={orderBy === 'publicName' ? order : 'asc'}
                  onClick={handleRequestSort('publicName')}
                >
                  公開名
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'address' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'address'}
                  direction={orderBy === 'address' ? order : 'asc'}
                  onClick={handleRequestSort('address')}
                >
                  住所
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((property) => (
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
                  <Typography variant="body2">{property.publicName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{property.address}</Typography>
                </TableCell>
                <TableCell align="center">
                  <ActionSplitButton propertyId={property.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={mockProperties.length}
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
