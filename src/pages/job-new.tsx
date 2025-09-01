import React from 'react'
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton,
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PeopleIcon from '@mui/icons-material/People'
import DoorFrontIcon from '@mui/icons-material/DoorFront'
import { PageContainer } from '@/components/layout/page-container'
import { mockProperties } from '@/data/properties'
import AppTextField from '@/components/common/app-text-field'

const schema = z.object({
  propertyId: z.string().min(1, '物件を選択してください'),
  jobDate: z.string().min(1, '日付を入力してください'),
  startTime: z.string().min(1, '時間を入力してください'),
  payType: z.enum(['fixed', 'hourly'], { required_error: '報酬タイプを選択してください' }),
  payAmount: z.number({ invalid_type_error: '数値を入力してください' }).positive('1以上で入力してください'),
  nextGuests: z.number({ invalid_type_error: '数値を入力してください' }).int().positive('1以上で入力してください'),
  needsCheckIn: z.boolean().default(false),
  requiredWorkers: z.number({ invalid_type_error: '数値を入力してください' }).int().positive('1以上で入力してください'),
  expectedHours: z.number({ invalid_type_error: '数値を入力してください' }).positive('1以上で入力してください').optional(),
})

type FormValues = z.infer<typeof schema>

export function JobNewPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const presetPropertyId = params.get('propertyId') ?? ''

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      propertyId: presetPropertyId,
      jobDate: '',
      startTime: '',
      payType: 'fixed',
      payAmount: 10000,
      nextGuests: 2,
      needsCheckIn: false,
      requiredWorkers: 1,
      expectedHours: 3,
    },
  })

  const selectedProperty = React.useMemo(
    () => mockProperties.find((p) => p.id === watch('propertyId')) || null,
    [watch('propertyId')]
  )

  const onSubmit = async (values: FormValues) => {
    // ここでAPIに送信して作成。現状はダミー遷移。
    // eslint-disable-next-line no-console
    console.log('create job', values)
    navigate('/jobs')
  }

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{children}</Typography>
  )

  return (
    <PageContainer sx={{ bgcolor: '#ffffff' }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton component={RouterLink} to="/jobs" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" fontWeight={700}>新規依頼の作成</Typography>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* 物件を選択 */}
        <Box sx={{ mb: 2 }}>
          <SectionTitle>物件を選択</SectionTitle>
          <Box sx={{ p: 0 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>物件</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              対象となる物件を検索して選択
            </Typography>
            <Controller
              name="propertyId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  value={mockProperties.find((p) => p.id === field.value) || null}
                  onChange={(_, v) => field.onChange(v?.id ?? '')}
                  options={mockProperties}
                  getOptionLabel={(o) => o.name}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                  renderOption={(props, option) => (
                    <Box component="li" {...props} key={option.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box component="img" src={option.imageUrl} alt={option.name} sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover' }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{option.address}</Typography>
                      </Box>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref as React.Ref<HTMLDivElement>}>
                      <input
                        {...params.inputProps}
                        placeholder="物件名で検索"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                  )}
                />
              )}
            />
            {errors.propertyId?.message && (
              <Typography variant="caption" color="error">{errors.propertyId.message}</Typography>
            )}

            {selectedProperty && (
              <Box mt={2} display="flex" gap={2} alignItems="center">
                <Box component="img" src={selectedProperty.imageUrl} alt={selectedProperty.name} sx={{ width: 96, height: 72, borderRadius: 1, objectFit: 'cover' }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>{selectedProperty.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedProperty.address}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 日付・時間 */}
        <Box sx={{ mb: 2 }}>
          <SectionTitle>スケジュール</SectionTitle>
          <Box sx={{ p: 0 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <AppTextField
                type="date"
                label="日付"
                description="作業予定の日付"
                requiredMark
                {...register('jobDate')}
                error={errors.jobDate?.message}
                containerClassName="min-w-[220px]"
                prefix={<CalendarMonthIcon fontSize="small" />}
              />
              <AppTextField
                type="time"
                label="開始時間"
                description="作業開始の時刻"
                requiredMark
                {...register('startTime')}
                error={errors.startTime?.message}
                containerClassName="min-w-[220px]"
                prefix={<AccessTimeIcon fontSize="small" />}
              />
              <AppTextField
                type="number"
                label="想定時間（時間）"
                description="だいたいの作業時間"
                placeholder="例: 3"
                step={0.5}
                min={0.5}
                {...register('expectedHours', { valueAsNumber: true })}
                containerClassName="min-w-[200px]"
              />
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 条件 */}
        <Box sx={{ mb: 2 }}>
          <SectionTitle>条件</SectionTitle>
          <Box sx={{ p: 0 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
              <AppTextField
                type="number"
                label="次の宿泊人数"
                description="次回宿泊の予定人数"
                placeholder="例: 2"
                min={1}
                step={1}
                requiredMark
                {...register('nextGuests', { valueAsNumber: true })}
                error={errors.nextGuests?.message}
                containerClassName="min-w-[200px]"
                prefix={<PeopleIcon fontSize="small" />}
              />
              <FormControlLabel
                control={<Controller name="needsCheckIn" control={control} render={({ field }) => (
                  <Switch checked={field.value} onChange={(_, v) => field.onChange(v)} />
                )} />}
                label={<Box display="flex" alignItems="center" gap={0.5}><DoorFrontIcon color="action" fontSize="small" />インあり</Box>}
              />
              <AppTextField
                type="number"
                label="求人人数"
                description="募集する人数"
                placeholder="例: 1"
                min={1}
                step={1}
                requiredMark
                {...register('requiredWorkers', { valueAsNumber: true })}
                error={errors.requiredWorkers?.message}
                containerClassName="min-w-[200px]"
              />
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 報酬を設定 */}
        <Box sx={{ mb: 8 }}>
          <SectionTitle>報酬を設定</SectionTitle>
          <Box sx={{ p: 0 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
              <Controller
                name="payType"
                control={control}
                render={({ field }) => (
                  <ToggleButtonGroup
                    exclusive
                    value={field.value}
                    onChange={(_, v) => v && field.onChange(v)}
                    size="small"
                  >
                    <ToggleButton value="fixed">固定</ToggleButton>
                    <ToggleButton value="hourly">時給</ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
              <AppTextField
                type="number"
                label="金額"
                description="支払う報酬額"
                placeholder="例: 10000"
                min={0}
                step={100}
                requiredMark
                {...register('payAmount', { valueAsNumber: true })}
                error={errors.payAmount?.message}
                containerClassName="min-w-[220px]"
                prefix={<AttachMoneyIcon fontSize="small" />}
                suffix={watch('payType') === 'hourly' ? '円/時' : '円'}
              />
            </Stack>
          </Box>
        </Box>

        {/* Sticky action bar */}
        <Box sx={{ position: 'sticky', bottom: 0, p: 2, display: 'flex', gap: 1, justifyContent: 'flex-end', alignItems: 'center', bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button component={RouterLink} to="/jobs" color="inherit">キャンセル</Button>
          <Button type="button" variant="outlined" onClick={() => {/* 下書き保存の実装余地 */}}>下書き保存</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>公開する</Button>
        </Box>
      </Box>
    </PageContainer>
  )
}

export default JobNewPage
