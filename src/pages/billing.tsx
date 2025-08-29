import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FilterListIcon from '@mui/icons-material/FilterList';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PageContainer } from '@/components/layout/page-container';
import { mockInvoices } from '@/data/invoices';

// 請求ページ: Material UI を活用した UX 向上版
export function BillingPage() {
  // --- サマリーカード用の数値を集計 --------------------------------------
  const totalRevenue = mockInvoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);
  const unpaidAmount = mockInvoices
    .filter((inv) => inv.status === 'issued' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = mockInvoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total, 0);
  const currentMonthJobs = mockInvoices[0]?.completedJobs ?? 0;

  // --- ステータスに応じた Chip の表示設定を取得 ----------------------------
  const getStatusProps = (status: string) => {
    switch (status) {
      case 'paid':
        return { label: '支払済み', color: 'success' as const };
      case 'issued':
        return { label: '発行済み', color: 'info' as const };
      case 'overdue':
        return { label: '延滞', color: 'error' as const };
      case 'draft':
        return { label: '下書き', color: 'default' as const };
      case 'void':
        return { label: '無効', color: 'default' as const };
      default:
        return { label: status, color: 'default' as const };
    }
  };

  return (
    // ページ全体のコンテナ（余白・幅を統一）
    <PageContainer>
      {/* --- ページヘッダー ------------------------------------------------ */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            請求・支払管理
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            請求書の管理と支払い状況の確認
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            CSV出力
          </Button>
          <Button variant="outlined" startIcon={<PictureAsPdfIcon />}>
            PDF出力
          </Button>
        </Stack>
      </Stack>

      {/* --- 検索・フィルターエリア ---------------------------------------- */}
      <Card>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <TextField
              fullWidth
              placeholder="請求書番号で検索..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" startIcon={<CalendarTodayIcon />}>
              期間フィルター
            </Button>
            <Button variant="outlined" startIcon={<FilterListIcon />}>
              ステータス
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* --- サマリーカード ------------------------------------------------ */}
      <Grid container spacing={3}>
        {/* 総売上カード: シンプルな背景で統一感を出す */}
        <Grid item xs={12} md={6} lg={3}>
          <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    総売上
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ¥{totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    +12.5% 前月比
                  </Typography>
                </Box>
                {/* 売上増加を示すアイコン */}
                <TrendingUpIcon color="success" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 未払い金額カード */}
        <Grid item xs={12} md={6} lg={3}>
          <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    未払い金額
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ¥{unpaidAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {
                      mockInvoices.filter(
                        (inv) => inv.status === 'issued' || inv.status === 'overdue',
                      ).length
                    }
                    件の請求書
                  </Typography>
                </Box>
                {/* 支払待ちを示すアイコン */}
                <AccessTimeIcon color="info" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 延滞金額カード */}
        <Grid item xs={12} md={6} lg={3}>
          <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    延滞金額
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ¥{overdueAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {mockInvoices.filter((inv) => inv.status === 'overdue').length}
                    件が延滞中
                  </Typography>
                </Box>
                {/* 延滞注意を示すアイコン */}
                <WarningAmberIcon color="error" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 今月の案件数カード */}
        <Grid item xs={12} md={6} lg={3}>
          <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    今月の案件数
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {currentMonthJobs}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    完了済み案件
                  </Typography>
                </Box>
                {/* 完了済み案件を示すアイコン */}
                <CheckCircleIcon color="primary" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- 請求書一覧 ---------------------------------------------------- */}
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>請求書ID</TableCell>
                <TableCell>請求金額</TableCell>
                <TableCell>支払期限</TableCell>
                <TableCell>支払日</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockInvoices.map((invoice) => {
                const statusProps = getStatusProps(invoice.status);
                return (
                  <TableRow key={invoice.id} hover>
                    <TableCell>
                      <Typography fontWeight="bold">{invoice.id}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(invoice.periodFrom).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>¥{invoice.total.toLocaleString()}</TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString('ja-JP')}</TableCell>
                    <TableCell>
                      {invoice.paidAt
                        ? new Date(invoice.paidAt).toLocaleDateString('ja-JP')
                        : '未払い'}
                    </TableCell>
                    <TableCell>
                      {/* ステータスを示す Chip は色を抑えるためアウトライン表示 */}
                      <Chip
                        size="small"
                        label={statusProps.label}
                        color={statusProps.color}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="outlined" size="small" startIcon={<DownloadIcon />}>
                          PDF
                        </Button>
                        <Button variant="outlined" size="small">
                          詳細
                        </Button>
                        {invoice.status === 'issued' && (
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            startIcon={<CreditCardIcon />}
                          >
                            支払い
                          </Button>
                        )}
                        {invoice.status === 'overdue' && (
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            startIcon={<WarningAmberIcon />}
                          >
                            至急支払い
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* --- 追加読み込みボタン -------------------------------------------- */}
      <Box textAlign="center">
        <Button variant="outlined">さらに表示</Button>
      </Box>
    </PageContainer>
  );
}
