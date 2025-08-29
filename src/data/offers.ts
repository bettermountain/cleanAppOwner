export interface Offer {
  id: string
  jobId: string
  workerId: string
  workerName: string
  workerRating: number
  workerSpecialties: string[]
  propertyName: string
  jobDate: string
  startTime: string
  payAmount: number
  payType: 'hourly' | 'fixed'
  status: 'sent' | 'accepted' | 'declined' | 'expired'
  sentAt: string
  expiresAt: string
  message?: string
  responseMessage?: string
  respondedAt?: string
}

export const mockOffers: Offer[] = [
  {
    id: 'offer-001',
    jobId: 'job-001',
    workerId: 'worker-001',
    workerName: '田中 美咲',
    workerRating: 4.9,
    workerSpecialties: ['バスルーム清掃', 'キッチン清掃', '窓清掃'],
    propertyName: '渋谷アパートメント101',
    jobDate: '2025-09-02',
    startTime: '10:00',
    payAmount: 15000,
    payType: 'fixed',
    status: 'accepted',
    sentAt: '2025-08-28T09:00:00Z',
    expiresAt: '2025-08-30T23:59:59Z',
    message: 'いつもお世話になっております。今回も丁寧に清掃させていただきます。',
    responseMessage: 'ありがとうございます。よろしくお願いいたします。',
    respondedAt: '2025-08-28T14:30:00Z'
  },
  {
    id: 'offer-002',
    jobId: 'job-003',
    workerId: 'worker-003',
    workerName: '佐藤 花子',
    workerRating: 4.8,
    workerSpecialties: ['エアコン清掃', 'カーペット清掃', '整理整頓'],
    propertyName: '新宿マンション205',
    jobDate: '2025-09-03',
    startTime: '14:00',
    payAmount: 2500,
    payType: 'hourly',
    status: 'sent',
    sentAt: '2025-08-29T08:15:00Z',
    expiresAt: '2025-08-31T23:59:59Z',
    message: 'エアコン清掃が得意です。丁寧に作業いたします。'
  },
  {
    id: 'offer-003',
    jobId: 'job-005',
    workerId: 'worker-005',
    workerName: '山田 太郎',
    workerRating: 4.7,
    workerSpecialties: ['ベッドメイキング', 'アメニティ補充', '玄関清掃'],
    propertyName: '池袋ゲストハウス',
    jobDate: '2025-09-01',
    startTime: '11:00',
    payAmount: 12000,
    payType: 'fixed',
    status: 'declined',
    sentAt: '2025-08-27T16:20:00Z',
    expiresAt: '2025-08-29T23:59:59Z',
    message: 'ベッドメイキングを中心に清掃いたします。',
    responseMessage: '申し訳ございませんが、他の予定と重なってしまいました。',
    respondedAt: '2025-08-28T10:45:00Z'
  },
  {
    id: 'offer-004',
    jobId: 'job-007',
    workerId: 'worker-002',
    workerName: '鈴木 次郎',
    workerRating: 4.6,
    workerSpecialties: ['フローリング清掃', 'ゴミ処理', '消毒作業'],
    propertyName: '原宿スタジオ',
    jobDate: '2025-09-04',
    startTime: '09:00',
    payAmount: 18000,
    payType: 'fixed',
    status: 'expired',
    sentAt: '2025-08-26T12:00:00Z',
    expiresAt: '2025-08-28T23:59:59Z',
    message: '消毒作業も含めて徹底的に清掃いたします。'
  },
  {
    id: 'offer-005',
    jobId: 'job-009',
    workerId: 'worker-007',
    workerName: '高橋 麻衣',
    workerRating: 4.9,
    workerSpecialties: ['洗濯', 'アイロンがけ', 'タオル交換'],
    propertyName: '六本木タワー1203',
    jobDate: '2025-09-05',
    startTime: '13:00',
    payAmount: 3000,
    payType: 'hourly',
    status: 'sent',
    sentAt: '2025-08-29T07:30:00Z',
    expiresAt: '2025-09-01T23:59:59Z',
    message: 'リネン類の管理が得意です。丁寧に対応いたします。'
  },
  {
    id: 'offer-006',
    jobId: 'job-011',
    workerId: 'worker-004',
    workerName: '伊藤 健一',
    workerRating: 4.5,
    workerSpecialties: ['バルコニー清掃', '外窓清掃', '植物の水やり'],
    propertyName: '恵比寿ガーデン402',
    jobDate: '2025-09-06',
    startTime: '15:00',
    payAmount: 14000,
    payType: 'fixed',
    status: 'accepted',
    sentAt: '2025-08-28T11:45:00Z',
    expiresAt: '2025-08-30T23:59:59Z',
    message: 'バルコニーと外窓の清掃を中心に作業いたします。',
    responseMessage: 'よろしくお願いします。時間通りに伺います。',
    respondedAt: '2025-08-28T18:20:00Z'
  }
]
