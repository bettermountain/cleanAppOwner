import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Mail, Lock, Eye, EyeOff, Building2, Sparkles } from 'lucide-react'

// ログインページ: Material UI コンポーネントで美しいフォームを構築
export function LoginPage() {
  // ユーザー入力と表示状態を管理
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // フォーム送信時にダッシュボードへ遷移
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    navigate('/properties')
  }

  return (
    // グラデーション背景にぼかしエフェクトを重ねた全画面コンテナ
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0f2fe, #ffffff, #ede9fe)',
        position: 'relative',
        overflow: 'hidden',
        py: 6,
      }}
    >
      {/* 角に配置したぼかし円で奥行きを演出 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(120px)',
            opacity: 0.4,
          },
          '&::before': {
            width: 320,
            height: 320,
            top: -160,
            right: -160,
            background: 'linear-gradient(135deg, #60a5fa66, #a78bfa66)',
          },
          '&::after': {
            width: 320,
            height: 320,
            bottom: -160,
            left: -160,
            background: 'linear-gradient(135deg, #34d39966, #60a5fa66)',
          },
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        {/* ブランドロゴと説明文 */}
        <Box textAlign="center" mb={5}>
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              boxShadow: 3,
              background: 'linear-gradient(135deg, #1e3a8a, #6d28d9)',
            }}
          >
            <Building2 color="#fff" size={32} />
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(90deg, #1e3a8a, #6d28d9)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            CleanApp Owner
          </Typography>
          <Typography color="text.secondary" mt={1}>
            民泊清掃管理システム
          </Typography>
        </Box>

        {/* ガラス風カードでフォームを表示 */}
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          <Stack spacing={3}>
            {/* 見出し */}
            <Box textAlign="center">
              <Typography
                variant="h5"
                component="h2"
                fontWeight="bold"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Sparkles size={20} color="#facc15" />
                ログイン
              </Typography>
              <Typography color="text.secondary" variant="body2" mt={0.5}>
                アカウントにアクセスして物件管理を開始
              </Typography>
            </Box>

            {/* 入力フォーム */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="メールアドレス"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="パスワード"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <FormControlLabel control={<Checkbox size="small" />} label="ログイン状態を保持" />
                  <MuiLink
                    href="#"
                    variant="body2"
                    sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    パスワードを忘れた方
                  </MuiLink>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{ py: 1.5, fontWeight: 'bold' }}
                >
                  {isLoading ? 'ログイン中...' : 'ログイン'}
                </Button>
              </Stack>
            </Box>

            {/* ソーシャルログイン */}
            <Divider>または</Divider>
            <Stack spacing={1.5}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                }
              >
                Googleでログイン
              </Button>
              <Button variant="outlined" fullWidth color="secondary">
                新規アカウント作成
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* フッター */}
        <Typography variant="body2" color="text.secondary" align="center" mt={8}>
          © 2025 CleanApp Owner. すべての権利を保有します。
        </Typography>
      </Container>
    </Box>
  )
}

