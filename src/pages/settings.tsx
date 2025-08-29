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
  Chip
} from '@mui/material'
import { Settings as SettingsIcon, User, CreditCard, Link } from 'lucide-react'

// Settings page for account and integration options
export function SettingsPage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
          設定
        </Typography>
        <Typography variant="body1" color="text.secondary">
          アカウント設定と外部連携
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <User size={20} style={{ marginRight: 8 }} />
            <Typography variant="h6" component="h2">
              プロフィール設定
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            基本情報と事業者区分の設定
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>事業者区分</InputLabel>
              <Select defaultValue="個人" label="事業者区分">
                <MenuItem value="個人">個人</MenuItem>
                <MenuItem value="個人事業主">個人事業主</MenuItem>
                <MenuItem value="法人">法人</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="会社名・屋号"
              placeholder="会社名または屋号を入力"
            />
            
            <TextField
              fullWidth
              label="連絡先メールアドレス"
              type="email"
              placeholder="contact@example.com"
            />
            
            <Button variant="contained">
              設定を保存
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CreditCard size={20} style={{ marginRight: 8 }} />
            <Typography variant="h6" component="h2">
              請求・支払設定
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            請求書の送付先と支払方法
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="請求書送付先"
              type="email"
              placeholder="billing@example.com"
            />
            
            <FormControl fullWidth>
              <InputLabel>支払方法</InputLabel>
              <Select defaultValue="クレジットカード" label="支払方法">
                <MenuItem value="クレジットカード">クレジットカード</MenuItem>
                <MenuItem value="銀行振込">銀行振込</MenuItem>
                <MenuItem value="請求書払い">請求書払い</MenuItem>
              </Select>
            </FormControl>
            
            <Button variant="outlined">
              請求書払い申請
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Link size={20} style={{ marginRight: 8 }} />
            <Typography variant="h6" component="h2">
              外部連携
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Airbnb、Booking.comとの連携設定
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Airbnb
                  </Typography>
                  <Chip label="未連携" size="small" color="default" />
                </Box>
                <Button variant="outlined" size="small">
                  連携する
                </Button>
              </Box>
            </Paper>
            
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Booking.com
                  </Typography>
                  <Chip label="未連携" size="small" color="default" />
                </Box>
                <Button variant="outlined" size="small">
                  連携する
                </Button>
              </Box>
            </Paper>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SettingsIcon size={20} style={{ marginRight: 8 }} />
            <Typography variant="h6" component="h2">
              システム設定
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            通知設定とその他の設定
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" fontWeight={500}>
                  メール通知
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  新着応募や作業完了の通知
                </Typography>
              </Box>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label=""
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" fontWeight={500}>
                  プッシュ通知
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ブラウザでの通知表示
                </Typography>
              </Box>
              <FormControlLabel
                control={<Switch />}
                label=""
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
