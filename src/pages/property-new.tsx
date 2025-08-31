import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid, Typography, TextField, Button, MenuItem, IconButton, Divider, Autocomplete, Stack } from '@mui/material'
import { PageContainer } from '@/components/layout/page-container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const schema = z.object({
  publicName: z.string().min(1, '必須項目です'),
  name: z.string().min(1, '必須項目です'),
  photos: z.any().optional(), // File[]
  houseType: z.string().min(1, '必須項目です'),
  size: z.string().optional(),
  rooms: z.number({ invalid_type_error: '数値を入力してください' }).int().nonnegative().default(1),
  maxGuests: z.number({ invalid_type_error: '数値を入力してください' }).int().positive().default(1),
  entryMethod: z.string().optional(),
  address: z.string().min(1, '必須項目です'),
  walkMinutes: z.number({ invalid_type_error: '数値を入力してください' }).int().nonnegative().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  trashStation: z.string().optional(),
  linenType: z.string().optional(),
  coinLaundry: z.string().optional(),
  supplies: z.string().optional(),
  wifi: z.string().optional(),
  notes: z.string().optional(),
  cleaningHours: z.number({ invalid_type_error: '数値を入力してください' }).positive().optional(),
  tasks: z.string().optional(),
  mustBring: z.string().optional(),
  attachments: z.any().optional(), // FileList
  workRequirements: z.string().optional(),
  requiredWorkers: z.number({ invalid_type_error: '数値を入力してください' }).int().positive().optional(),
  basePay: z.number({ invalid_type_error: '数値を入力してください' }).positive().optional(),
})

type FormValues = z.infer<typeof schema>

export function PropertyNewPage() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      houseType: 'マンション',
      rooms: 1,
      maxGuests: 2,
    },
  })

  const [images, setImages] = React.useState<File[]>([])

  const onSubmit = async (values: FormValues) => {
    // ここでAPI送信等を実装。今回はダミー遷移。
    // eslint-disable-next-line no-console
    console.log('submit property', values)
    navigate('/properties')
  }

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const next = [...images, ...files]
    setImages(next)
    setValue('photos', next as any)
  }

  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('attachments', e.target.files as any)
  }

  // テキストフィールド角の丸みを抑える共通スタイル
  const fieldSx = { '& .MuiOutlinedInput-root': { borderRadius: 1 } } as const

  return (
    <PageContainer sx={{ bgcolor: '#ffffff' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton component={Link} to="/properties" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" fontWeight={600}>物件を登録</Typography>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* 基本情報 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>基本情報</Typography>
          <Stack spacing={2}>
            <TextField fullWidth label="公開名" placeholder="例: 渋谷モダンアパートメント（公開）" {...register('publicName')} error={!!errors.publicName} helperText={errors.publicName?.message} sx={{ ...fieldSx, maxWidth: 720 }} />
            <TextField fullWidth label="物件名" placeholder="内部管理用の名称" {...register('name')} error={!!errors.name} helperText={errors.name?.message} sx={{ ...fieldSx, maxWidth: 480 }} />
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 写真 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>写真</Typography>
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
              画像をアップロード
              <input type="file" hidden accept="image/*" multiple onChange={handleFilesChange} />
            </Button>
            <Typography variant="body2" color="text.secondary">JPG/PNG、複数可（サムネイルから削除できます）</Typography>
          </Box>
          {images.length > 0 && (
            <Grid container spacing={1} mt={1}>
              {images.map((file, idx) => {
                const url = URL.createObjectURL(file)
                return (
                  <Grid item key={idx}>
                    <Box sx={{ position: 'relative', width: 160, height: 120, borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                      <Box component="img" src={url} alt={file.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} onLoad={() => URL.revokeObjectURL(url)} />
                      <IconButton size="small" aria-label="削除" onClick={() => {
                        const next = images.filter((_, i) => i !== idx)
                        setImages(next)
                        setValue('photos', next as any)
                      }} sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,0.55)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' } }}>
                        ✕
                      </IconButton>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 物件情報 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>物件情報</Typography>
          <Stack spacing={2}>
            <Controller
              name="houseType"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  fullWidth
                  freeSolo
                  options={['一軒家','マンション','アパートメント','一戸建て','ロフト','町家','スイート']}
                  value={field.value || ''}
                  onChange={(_, v) => field.onChange(v || '')}
                  onInputChange={(_, v) => field.onChange(v)}
                  renderInput={(params) => (
                    <TextField {...params} label="種別" placeholder="マンション など" sx={{ ...fieldSx, maxWidth: 320 }} />
                  )}
                  sx={{ maxWidth: 320 }}
                />
              )}
            />
            <TextField fullWidth label="広さ" placeholder="例: 45㎡" {...register('size')} sx={{ ...fieldSx, maxWidth: 200 }} />
            <TextField fullWidth type="number" label="部屋数" inputProps={{ min: 0 }} {...register('rooms', { valueAsNumber: true })} error={!!errors.rooms} helperText={errors.rooms?.message} sx={{ ...fieldSx, maxWidth: 160 }} />
            <TextField fullWidth type="number" label="最大宿泊人数" inputProps={{ min: 1 }} {...register('maxGuests', { valueAsNumber: true })} error={!!errors.maxGuests} helperText={errors.maxGuests?.message} sx={{ ...fieldSx, maxWidth: 200 }} />
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* アクセス/チェックイン */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>アクセス・チェックイン</Typography>
          <Stack spacing={2}>
            <TextField fullWidth label="住所" placeholder="都道府県 市区町村 番地 建物名など" {...register('address')} error={!!errors.address} helperText={errors.address?.message} sx={{ ...fieldSx }} />
            <TextField fullWidth type="time" label="チェックイン" InputLabelProps={{ shrink: true }} {...register('checkIn')} sx={{ ...fieldSx, maxWidth: 220 }} />
            <TextField fullWidth type="time" label="チェックアウト" InputLabelProps={{ shrink: true }} {...register('checkOut')} sx={{ ...fieldSx, maxWidth: 220 }} />
            <TextField fullWidth label="最寄駅から徒歩（分）" type="number" inputProps={{ min: 0 }} {...register('walkMinutes', { valueAsNumber: true })} sx={{ ...fieldSx, maxWidth: 160 }} />
            <TextField fullWidth label="入室方法" placeholder="キーボックス、スマートロック、暗証番号など" {...register('entryMethod')} sx={{ ...fieldSx, maxWidth: 600 }} />
            <TextField fullWidth label="Wi-Fi情報" placeholder="SSID / パスワード" {...register('wifi')} sx={{ ...fieldSx, maxWidth: 480 }} />
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 運用情報 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>運用情報</Typography>
          <Stack spacing={2}>
            <TextField fullWidth label="ゴミ捨て場" placeholder="場所、曜日、分別ルールなど" {...register('trashStation')} sx={{ ...fieldSx, maxWidth: 720 }} />
            <TextField select fullWidth label="リネン種別" defaultValue="" {...register('linenType')} sx={{ ...fieldSx, maxWidth: 280 }}>
              <MenuItem value="">未選択</MenuItem>
              <MenuItem value="自社リネン">自社リネン</MenuItem>
              <MenuItem value="現地リネン">現地リネン</MenuItem>
              <MenuItem value="レンタル">レンタル</MenuItem>
            </TextField>
            <TextField fullWidth label="近くのコインランドリー" placeholder="名称・住所・営業時間など" {...register('coinLaundry')} sx={{ ...fieldSx, maxWidth: 600 }} />
            <TextField fullWidth label="消耗品について" placeholder="補充場所、補充頻度、保管場所" {...register('supplies')} sx={{ ...fieldSx, maxWidth: 720 }} />
            <TextField fullWidth multiline minRows={4} label="特記事項" placeholder="注意点やハウスルール" {...register('notes')} sx={{ ...fieldSx }} />
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 清掃・業務 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>清掃・業務</Typography>
          <Stack spacing={2}>
            <TextField fullWidth type="number" inputProps={{ min: 0, step: 0.5 }} label="清掃目安時間（時間）" {...register('cleaningHours', { valueAsNumber: true })} sx={{ ...fieldSx, maxWidth: 160 }} />
            <TextField fullWidth multiline minRows={4} label="業務内容" placeholder="チェックリスト、必須作業など" {...register('tasks')} sx={{ ...fieldSx }} />
            <TextField fullWidth label="持ち物" placeholder="必要な道具や消耗品" {...register('mustBring')} sx={{ ...fieldSx, maxWidth: 720 }} />
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 契約・条件・報酬 */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>契約・条件・報酬</Typography>
          <Stack spacing={2}>
            <TextField fullWidth multiline minRows={4} label="働くための条件" placeholder="応募条件、必要資格、注意事項など" {...register('workRequirements')} sx={{ ...fieldSx }} />
            <TextField fullWidth type="number" inputProps={{ min: 1 }} label="必要人数" {...register('requiredWorkers', { valueAsNumber: true })} sx={{ ...fieldSx, maxWidth: 160 }} />
            <TextField fullWidth type="number" inputProps={{ min: 0, step: 100 }} label="基本報酬（円）" {...register('basePay', { valueAsNumber: true })} sx={{ ...fieldSx, maxWidth: 240 }} />
            <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>契約書等の添付
              <input type="file" hidden multiple onChange={handleDocsChange} />
            </Button>
          </Stack>
        </Box>

        {/* Sticky action bar */}
        <Box sx={{ position: 'sticky', bottom: 0, p: 2, display: 'flex', gap: 1, justifyContent: 'flex-end', alignItems: 'center', bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button component={Link} to="/properties" color="inherit">キャンセル</Button>
          <Button type="button" variant="outlined" onClick={() => {/* 下書き保存の実装余地 */}}>下書き保存</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>登録する</Button>
        </Box>
      </Box>
    </PageContainer>
  )
}

export default PropertyNewPage
