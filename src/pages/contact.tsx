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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
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

      {/* よくある質問 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
          よくある質問
        </Typography>
        <Box>
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="faq-panel-1" id="faq-header-1">
              <Typography fontWeight={600}>返信までどのくらい時間がかかりますか？</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                通常、1〜2営業日以内にご返信いたします。内容によってはお時間をいただく場合がございます。
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="faq-panel-2" id="faq-header-2">
              <Typography fontWeight={600}>電話での問い合わせは可能ですか？</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                現在はフォームまたはメールでの対応が中心です。緊急のご用件がある場合は本文にその旨をご記載ください。
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="faq-panel-3" id="faq-header-3">
              <Typography fontWeight={600}>添付ファイルは送れますか？</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                このフォームでは添付に対応していません。必要な場合は、折り返しのご連絡時にアップロードのご案内を差し上げます。
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="faq-panel-4" id="faq-header-4">
              <Typography fontWeight={600}>営業日・対応時間を教えてください。</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                平日10:00〜18:00に対応しています。土日祝は翌営業日の対応となります。
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="faq-panel-5" id="faq-header-5">
              <Typography fontWeight={600}>法人向けの問い合わせもできますか？</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                はい、可能です。ご希望の契約形態やご相談内容を本文にご記載ください。担当よりご案内します。
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      {/* 送信完了メッセージ */}
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
          メッセージを送信しました。
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
