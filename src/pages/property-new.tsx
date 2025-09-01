import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid, Typography, Button, IconButton, Divider, Stack } from '@mui/material'
import { PageContainer } from '@/components/layout/page-container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AppTextField from '@/components/common/app-text-field'
import AppSelect from '@/components/common/app-select'

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
    register,
    setValue,
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

  // 共通ラッパー: ラベル+説明の下に入力
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{children}</Typography>
  )

  const Field = ({ label, caption, maxWidth, children }: { label: string, caption?: string, maxWidth?: number | string, children: React.ReactNode }) => (
    <Box sx={{ maxWidth: maxWidth ?? '100%' }}>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>{label}</Typography>
      {caption && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>{caption}</Typography>}
      {children}
    </Box>
  )

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
          <SectionTitle>基本情報</SectionTitle>
          <Stack spacing={2}>
            <Field label="公開名" caption="公開サイトに表示される名称" maxWidth={720}>
              <AppTextField placeholder="例: 渋谷モダンアパートメント" {...register('publicName')} error={errors.publicName?.message} />
            </Field>
            <Field label="物件名（内部管理用）" caption="社内向けの管理名" maxWidth={480}>
              <AppTextField placeholder="例: 渋谷A-102" {...register('name')} error={errors.name?.message} />
            </Field>
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 写真 */}
        <Box sx={{ mb: 2 }}>
          <SectionTitle>写真</SectionTitle>
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
          <SectionTitle>物件情報</SectionTitle>
          <Stack spacing={2}>
            <Field label="種別" caption="例: マンション・一軒家 など" maxWidth={320}>
              <AppTextField list="houseTypeList" placeholder="マンション" {...register('houseType')} error={errors.houseType?.message} />
              <datalist id="houseTypeList">
                <option value="一軒家" />
                <option value="マンション" />
                <option value="アパートメント" />
                <option value="一戸建て" />
                <option value="ロフト" />
                <option value="町家" />
                <option value="スイート" />
              </datalist>
            </Field>
            <Field label="広さ" caption="おおよその面積" maxWidth={200}>
              <AppTextField placeholder="例: 45㎡" {...register('size')} />
            </Field>
            <Field label="部屋数" caption="部屋の数（整数）" maxWidth={160}>
              <AppTextField type="number" placeholder="例: 2" {...register('rooms', { valueAsNumber: true })} error={errors.rooms?.message} min={0} />
            </Field>
            <Field label="最大宿泊人数" caption="同時に宿泊できる人数" maxWidth={200}>
              <AppTextField type="number" placeholder="例: 4" {...register('maxGuests', { valueAsNumber: true })} error={errors.maxGuests?.message} min={1} />
            </Field>
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* アクセス/チェックイン */}
        <Box sx={{ mb: 2 }}>
          <SectionTitle>アクセス・チェックイン</SectionTitle>
          <Stack spacing={2}>
            <Field label="住所" caption="都道府県・市区町村・番地・建物名など">
              <AppTextField placeholder="例: 東京都渋谷区神南1-1-1 ○○マンション101" {...register('address')} error={errors.address?.message} />
            </Field>
            <Field label="チェックイン" caption="開始可能な時刻" maxWidth={220}>
              <AppTextField type="time" {...register('checkIn')} />
            </Field>
            <Field label="チェックアウト" caption="終了目安の時刻" maxWidth={220}>
              <AppTextField type="time" {...register('checkOut')} />
            </Field>
            <Field label="最寄駅から徒歩（分）" caption="最寄駅からの徒歩分数" maxWidth={160}>
              <AppTextField type="number" placeholder="例: 8" {...register('walkMinutes', { valueAsNumber: true })} min={0} />
            </Field>
            <Field label="入室方法" caption="キーボックス・スマートロック・暗証番号など" maxWidth={600}>
              <AppTextField placeholder="例: 玄関横キーボックス（1234）" {...register('entryMethod')} />
            </Field>
            <Field label="Wi-Fi情報" caption="SSIDやパスワード" maxWidth={480}>
              <AppTextField placeholder="例: SSID: MyHome-24 / PW: 1a2b3c4d" {...register('wifi')} />
            </Field>
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 運用情報 */}
        <Box sx={{ mb: 2 }}>
          <SectionTitle>運用情報</SectionTitle>
          <Stack spacing={2}>
            <Field label="ゴミ捨て場" caption="場所・曜日・分別ルールなど" maxWidth={720}>
              <AppTextField placeholder="例: 建物裏 集積所／月・木 可燃、火 回収なし" {...register('trashStation')} />
            </Field>
            <Field label="リネン種別" caption="自社・現地・レンタルなど" maxWidth={280}>
              <AppSelect
                placeholder="選択してください"
                options={[
                  { value: '', label: '未選択', disabled: true },
                  { value: '自社リネン', label: '自社リネン' },
                  { value: '現地リネン', label: '現地リネン' },
                  { value: 'レンタル', label: 'レンタル' },
                ]}
                {...register('linenType')}
              />
            </Field>
            <Field label="近くのコインランドリー" caption="名称・住所・営業時間など" maxWidth={600}>
              <AppTextField placeholder="例: ○○ランドリー 渋谷店（徒歩3分）" {...register('coinLaundry')} />
            </Field>
            <Field label="消耗品について" caption="補充場所・頻度・保管場所など" maxWidth={720}>
              <AppTextField placeholder="例: 洗面台下に在庫、1回の清掃で各1点補充" {...register('supplies')} />
            </Field>
            <Field label="特記事項" caption="注意点やハウスルール">
              <AppTextField textarea rows={4} placeholder="例: 騒音注意、禁煙、ペット不可等" {...register('notes')} />
            </Field>
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 清掃・業務 */}
        <Box sx={{ mb: 2 }}>
          <SectionTitle>清掃・業務</SectionTitle>
          <Stack spacing={2}>
            <Field label="清掃目安時間（時間）" caption="おおよその作業時間" maxWidth={160}>
              <AppTextField type="number" placeholder="例: 2.5" step={0.5} min={0} {...register('cleaningHours', { valueAsNumber: true })} />
            </Field>
            <Field label="業務内容" caption="チェックリストや必須作業">
              <AppTextField textarea rows={4} placeholder="例: キッチン→浴室→トイレの順で清掃 など" {...register('tasks')} />
            </Field>
            <Field label="持ち物" caption="必要な道具や消耗品" maxWidth={720}>
              <AppTextField placeholder="例: ゴム手袋・替えスポンジ・マイクロファイバー" {...register('mustBring')} />
            </Field>
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 契約・条件・報酬 */}
        <Box sx={{ mb: 8 }}>
          <SectionTitle>契約・条件・報酬</SectionTitle>
          <Stack spacing={2}>
            <Field label="働くための条件" caption="応募条件・必要資格・注意事項など">
              <AppTextField textarea rows={4} placeholder="例: 身分証提示必須・写真提出あり など" {...register('workRequirements')} />
            </Field>
            <Field label="必要人数" caption="募集する人数" maxWidth={160}>
              <AppTextField type="number" placeholder="例: 1" min={1} {...register('requiredWorkers', { valueAsNumber: true })} />
            </Field>
            <Field label="基本報酬（円）" caption="ベースとなる報酬額" maxWidth={240}>
              <AppTextField type="number" placeholder="例: 8000" step={100} min={0} {...register('basePay', { valueAsNumber: true })} />
            </Field>
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
