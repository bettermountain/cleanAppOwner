import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
} from '@mui/material';
import { PageContainer } from '@/components/layout/page-container';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail as MailIcon, MessageSquare } from 'lucide-react';

// フォームの入力値を検証するためのスキーマを定義
const contactSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  message: z.string().min(1, 'お問い合わせ内容を入力してください'),
});

// スキーマから型を生成してフォームデータに利用
type ContactForm = z.infer<typeof contactSchema>;

// お問い合わせページ: ユーザーからの問い合わせを受け付けるフォームを提供
export function ContactPage() {
  // 送信完了メッセージの表示状態を管理
  const [open, setOpen] = useState(false);

  // React Hook Formを使用してフォーム状態とバリデーションを管理
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  // フォーム送信時の処理
  const onSubmit = (data: ContactForm) => {
    console.log('contact submit', data);
    setOpen(true);
    reset();
  };

  return (
    <PageContainer>
      {/* ページヘッダー */}
      <Box>
        <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
          お問い合わせ
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ご質問やご相談がありましたら、以下のフォームからお気軽にご連絡ください。
        </Typography>
      </Box>

      {/* お問い合わせフォーム */}
      <Paper sx={{ p: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="お名前"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User size={18} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="メールアドレス"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon size={18} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="お問い合わせ内容"
            multiline
            rows={4}
            fullWidth
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                  <MessageSquare size={18} />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
            送信する
          </Button>
        </Box>
      </Paper>

      {/* 送信完了メッセージ */}
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
          メッセージを送信しました。
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
