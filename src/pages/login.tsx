import { useState } from 'react'
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  IconButton,
  InputAdornment,
  Container,
  Checkbox,
  FormControlLabel,
  Divider
} from '@mui/material'
import { Mail, Lock, Eye, EyeOff, Building2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    localStorage.setItem('auth_token', 'dummy_token')
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    navigate('/properties')
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 64, 
              height: 64, 
              backgroundColor: 'primary.main',
              borderRadius: 2,
              mb: 2,
              boxShadow: 2
            }}
          >
            <Building2 size={32} color="white" />
          </Box>
          <Typography variant="h3" component="h1" fontWeight={600} color="primary.main" gutterBottom>
            CleanApp Owner
          </Typography>
          <Typography variant="body1" color="text.secondary">
            民泊清掃管理システム
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
            ログイン
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            アカウントにアクセスして物件管理を開始
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="パスワード"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="ログイン状態を保持"
              />
              <Button variant="text" size="small">
                パスワードを忘れた方
              </Button>
            </Box>

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              size="large"
              disabled={isLoading}
              sx={{ mb: 3 }}
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>または</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant="outlined" fullWidth size="large">
              Googleでログイン
            </Button>
            <Button variant="outlined" fullWidth size="large">
              新規アカウント作成
            </Button>
          </Box>
        </Paper>

        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
          © 2025 CleanApp Owner. すべての権利を保有します。
        </Typography>
      </Container>
    </Box>
  )
}
