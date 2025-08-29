import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Chip,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material'
import { PageContainer } from '@/components/layout/page-container'
import { Settings as SettingsIcon, User, CreditCard, Link } from 'lucide-react'
import { useState } from 'react'

// Owner-focused settings with clear sections and sticky save bar
export function SettingsPage() {
  // Local state to simulate saving UX
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [snackOpen, setSnackOpen] = useState(false)

  // Basic profile
  const [bizType, setBizType] = useState<'個人' | '個人事業主' | '法人'>('個人')
  const [company, setCompany] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [serviceArea, setServiceArea] = useState('')

  // Defaults for jobs/properties
  const [defaultCheckout, setDefaultCheckout] = useState('10:00')
  const [bufferMinutes, setBufferMinutes] = useState(60)
  const [accessMethod, setAccessMethod] = useState<'キーボックス' | 'スマートロック' | '対面'>('キーボックス')
  const [accessNote, setAccessNote] = useState('')
  const [checklist, setChecklist] = useState<string[]>(['床掃除', '水回り清掃', 'ゴミ回収'])

  // Notification preferences
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyPush, setNotifyPush] = useState(false)
  const [notifyApplication, setNotifyApplication] = useState(true)
  const [notifyStarted, setNotifyStarted] = useState(true)
  const [notifySubmitted, setNotifySubmitted] = useState(true)
  const [notifyRework, setNotifyRework] = useState(true)
  const [notifyInvoice, setNotifyInvoice] = useState(true)
  const [notifyPayment, setNotifyPayment] = useState(true)

  // Billing
  const [billingEmail, setBillingEmail] = useState('')
  const [billingMethod, setBillingMethod] = useState<'クレジットカード' | '銀行振込' | '請求書払い'>('クレジットカード')
  const [autoPay, setAutoPay] = useState(true)
  const [invoiceNumber, setInvoiceNumber] = useState('') // 適格請求書発行事業者番号

  // Integrations status (mock)
  const [airbnbConnected, setAirbnbConnected] = useState(false)
  const [bookingConnected, setBookingConnected] = useState(false)
  const [icalUrl, setIcalUrl] = useState('')

  // Security
  const [twoFA, setTwoFA] = useState(false)

  const checklistOptions = ['床掃除', '水回り清掃', 'ゴミ回収', 'ベッドメイク', 'アメニティ補充', '換気', '写真撮影']

  const handleSave = () => {
    // Normally call API here; we just show feedback
    setSavedAt(new Date())
    setSnackOpen(true)
  }

  const toggleChecklist = (item: string) => {
    setChecklist((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    )
  }

  return (
    <PageContainer>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight={700}>設定</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          事業者情報、物件/案件のデフォルト、通知・請求、外部連携
        </Typography>
      </Box>

      {/* Grid sections */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
        {/* Left column (wider) */}
        <Box sx={{ gridColumn: { xs: '1 / -1', lg: '1 / span 8' }, display: 'grid', gap: 2 }}>
          {/* Profile */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <User size={20} />
              <Typography variant="h6">事業者プロフィール</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>
              支払や連絡に使用する基本情報を設定します。
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>事業者区分</InputLabel>
                <Select
                  label="事業者区分"
                  value={bizType}
                  onChange={(e) => setBizType(e.target.value as typeof bizType)}
                >
                  <MenuItem value="個人">個人</MenuItem>
                  <MenuItem value="個人事業主">個人事業主</MenuItem>
                  <MenuItem value="法人">法人</MenuItem>
                </Select>
              </FormControl>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField fullWidth label="会社名・屋号" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="株式会社〇〇 / 〇〇ハウス" />
                <TextField fullWidth label="対応エリア" value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} placeholder="例: 東京23区、那覇市など" />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField fullWidth type="email" label="連絡先メールアドレス" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="contact@example.com" />
                <TextField fullWidth label="電話番号" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="090-1234-5678" />
              </Stack>
            </Stack>
          </Paper>

          {/* Defaults for job posting */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <SettingsIcon size={20} />
              <Typography variant="h6">物件・案件のデフォルト</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>
              新規案件作成時に自動で適用される推奨設定。
            </Typography>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="標準チェックアウト時刻"
                  type="time"
                  value={defaultCheckout}
                  onChange={(e) => setDefaultCheckout(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth>
                  <InputLabel>開始までのバッファ</InputLabel>
                  <Select
                    label="開始までのバッファ"
                    value={bufferMinutes}
                    onChange={(e) => setBufferMinutes(Number(e.target.value))}
                  >
                    <MenuItem value={30}>30分</MenuItem>
                    <MenuItem value={60}>60分</MenuItem>
                    <MenuItem value={90}>90分</MenuItem>
                    <MenuItem value={120}>120分</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>入室方法</InputLabel>
                  <Select label="入室方法" value={accessMethod} onChange={(e) => setAccessMethod(e.target.value as typeof accessMethod)}>
                    <MenuItem value="キーボックス">キーボックス</MenuItem>
                    <MenuItem value="スマートロック">スマートロック</MenuItem>
                    <MenuItem value="対面">対面</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="入室/施錠の補足"
                  value={accessNote}
                  onChange={(e) => setAccessNote(e.target.value)}
                  placeholder="例: 建物前の黒いキーボックス、暗証は当日9時に通知"
                />
              </Stack>

              <Box>
                <Typography variant="subtitle2" gutterBottom>チェックリスト（テンプレート）</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {checklistOptions.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      color={checklist.includes(item) ? 'primary' : 'default'}
                      variant={checklist.includes(item) ? 'filled' : 'outlined'}
                      onClick={() => toggleChecklist(item)}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
                <Typography variant="caption" color="text.secondary">選択した項目は案件作成時に事前入力されます</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Notifications */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <SettingsIcon size={20} />
              <Typography variant="h6">通知設定</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>
              重要イベントを見逃さないよう通知方法と対象を選びます。
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <FormControlLabel control={<Switch checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} />} label="メール通知" />
                <FormControlLabel control={<Switch checked={notifyPush} onChange={(e) => setNotifyPush(e.target.checked)} />} label="プッシュ通知" />
              </Stack>
              <Divider sx={{ my: 1 }} />
              <FormControlLabel control={<Switch checked={notifyApplication} onChange={(e) => setNotifyApplication(e.target.checked)} />} label="応募があったとき" />
              <FormControlLabel control={<Switch checked={notifyStarted} onChange={(e) => setNotifyStarted(e.target.checked)} />} label="作業開始時" />
              <FormControlLabel control={<Switch checked={notifySubmitted} onChange={(e) => setNotifySubmitted(e.target.checked)} />} label="写真提出・完了報告" />
              <FormControlLabel control={<Switch checked={notifyRework} onChange={(e) => setNotifyRework(e.target.checked)} />} label="再作業リクエスト" />
              <FormControlLabel control={<Switch checked={notifyInvoice} onChange={(e) => setNotifyInvoice(e.target.checked)} />} label="請求書発行" />
              <FormControlLabel control={<Switch checked={notifyPayment} onChange={(e) => setNotifyPayment(e.target.checked)} />} label="入金確認" />
            </Stack>
          </Paper>

          {/* Security */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <SettingsIcon size={20} />
              <Typography variant="h6">セキュリティ</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>
              アカウント保護のための追加設定。
            </Typography>
            <Stack spacing={1.5}>
              <FormControlLabel control={<Switch checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />} label="二段階認証(2FA)を有効にする" />
              <Stack direction="row" spacing={1}>
                <Button variant="outlined">パスワード変更</Button>
                <Button variant="outlined">ログイン履歴</Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>

        {/* Right column */}
        <Box sx={{ gridColumn: { xs: '1 / -1', lg: '9 / -1' }, display: 'grid', gap: 2 }}>
          {/* Billing */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <CreditCard size={20} />
              <Typography variant="h6">請求・支払</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>
              入金方法と請求情報の管理。
            </Typography>
            <Stack spacing={2}>
              <TextField fullWidth type="email" label="請求書送付先" value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} placeholder="billing@example.com" />
              <FormControl fullWidth>
                <InputLabel>支払方法</InputLabel>
                <Select label="支払方法" value={billingMethod} onChange={(e) => setBillingMethod(e.target.value as typeof billingMethod)}>
                  <MenuItem value="クレジットカード">クレジットカード</MenuItem>
                  <MenuItem value="銀行振込">銀行振込</MenuItem>
                  <MenuItem value="請求書払い">請求書払い</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel control={<Switch checked={autoPay} onChange={(e) => setAutoPay(e.target.checked)} />} label="自動支払いを有効化（クレジットカード）" />
              <TextField fullWidth label="適格請求書発行事業者番号(任意)" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} placeholder="T1234567890123" />
              <Stack direction="row" spacing={1}>
                <Button variant="outlined">請求書払いの申請</Button>
                <Button variant="outlined">領収書の設定</Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Integrations */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <Link size={20} />
              <Typography variant="h6">外部連携</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Airbnb/Booking.com連携やiCal取り込みでスケジュールを自動化。
            </Typography>
            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1">Airbnb</Typography>
                    <Chip label={airbnbConnected ? '連携中' : '未連携'} size="small" color={airbnbConnected ? 'success' : 'default'} sx={{ mt: 0.5 }} />
                  </Box>
                  <Button variant={airbnbConnected ? 'outlined' : 'contained'} size="small" onClick={() => setAirbnbConnected((v) => !v)}>
                    {airbnbConnected ? '解除' : '連携する'}
                  </Button>
                </Stack>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1">Booking.com</Typography>
                    <Chip label={bookingConnected ? '連携中' : '未連携'} size="small" color={bookingConnected ? 'success' : 'default'} sx={{ mt: 0.5 }} />
                  </Box>
                  <Button variant={bookingConnected ? 'outlined' : 'contained'} size="small" onClick={() => setBookingConnected((v) => !v)}>
                    {bookingConnected ? '解除' : '連携する'}
                  </Button>
                </Stack>
              </Paper>
              <Divider />
              <Typography variant="subtitle2">iCal URL取り込み（任意）</Typography>
              <TextField fullWidth placeholder="https://example.com/calendar.ics" value={icalUrl} onChange={(e) => setIcalUrl(e.target.value)} />
              <Typography variant="caption" color="text.secondary">物件の予約カレンダーを取り込み、清掃案件を自動生成します。</Typography>
            </Stack>
          </Paper>
        </Box>
      </Box>

      {/* Sticky save bar */}
      <Paper elevation={3} sx={{ position: 'sticky', bottom: 0, p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.paper' }}>
        <Box>
          <Typography variant="subtitle2">変更を保存</Typography>
          <Typography variant="caption" color="text.secondary">
            {savedAt ? `前回保存: ${savedAt.toLocaleTimeString('ja-JP')}` : '未保存の変更があります'}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>上に戻る</Button>
          <Button variant="contained" onClick={handleSave}>保存する</Button>
        </Stack>
      </Paper>

      {/* Save feedback */}
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setSnackOpen(false)}>設定を保存しました</Alert>
      </Snackbar>
    </PageContainer>
  )
}
