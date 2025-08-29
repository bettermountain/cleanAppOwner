export interface Assignment {
  id: string
  jobId: string
  workerId: string
  workerName: string
  propertyName: string
  jobDate: string
  startTime: string
  status: 'assigned' | 'checked_in' | 'in_progress' | 'submitted' | 'approved' | 'rework' | 'cancelled'
  checkedInAt?: string
  startedAt?: string
  submittedAt?: string
  approvedAt?: string
  progress: number
  currentTask?: string
  photosSubmitted: number
  totalPhotosRequired: number
  location?: {
    lat: number
    lng: number
    address: string
  }
  notes?: string
}

export const mockAssignments: Assignment[] = [
  {
    id: 'assignment-001',
    jobId: 'job-001',
    workerId: 'worker-001',
    workerName: '田中 美咲',
    propertyName: '渋谷アパートメント101',
    jobDate: '2025-09-02',
    startTime: '10:00',
    status: 'in_progress',
    checkedInAt: '2025-09-02T10:05:00Z',
    startedAt: '2025-09-02T10:10:00Z',
    progress: 65,
    currentTask: 'バスルーム清掃中',
    photosSubmitted: 8,
    totalPhotosRequired: 12,
    location: {
      lat: 35.6586,
      lng: 139.7454,
      address: '東京都渋谷区渋谷1-1-1'
    },
    notes: 'バスルームのカビ汚れが予想より多いため、追加時間が必要かもしれません。'
  },
  {
    id: 'assignment-002',
    jobId: 'job-003',
    workerId: 'worker-003',
    workerName: '佐藤 花子',
    propertyName: '新宿マンション205',
    jobDate: '2025-09-03',
    startTime: '14:00',
    status: 'assigned',
    progress: 0,
    currentTask: '開始待ち',
    photosSubmitted: 0,
    totalPhotosRequired: 10,
    location: {
      lat: 35.6938,
      lng: 139.7034,
      address: '東京都新宿区新宿2-2-2'
    }
  },
  {
    id: 'assignment-003',
    jobId: 'job-005',
    workerId: 'worker-005',
    workerName: '山田 太郎',
    propertyName: '池袋ゲストハウス',
    jobDate: '2025-09-01',
    startTime: '11:00',
    status: 'submitted',
    checkedInAt: '2025-09-01T11:00:00Z',
    startedAt: '2025-09-01T11:05:00Z',
    submittedAt: '2025-09-01T14:30:00Z',
    progress: 100,
    currentTask: '作業完了・承認待ち',
    photosSubmitted: 15,
    totalPhotosRequired: 15,
    location: {
      lat: 35.7295,
      lng: 139.7109,
      address: '東京都豊島区池袋3-3-3'
    },
    notes: 'すべての部屋の清掃が完了しました。写真もすべて提出済みです。'
  },
  {
    id: 'assignment-004',
    jobId: 'job-007',
    workerId: 'worker-002',
    workerName: '鈴木 次郎',
    propertyName: '原宿スタジオ',
    jobDate: '2025-09-04',
    startTime: '09:00',
    status: 'rework',
    checkedInAt: '2025-09-04T09:00:00Z',
    startedAt: '2025-09-04T09:10:00Z',
    submittedAt: '2025-09-04T12:45:00Z',
    progress: 80,
    currentTask: '再作業中',
    photosSubmitted: 12,
    totalPhotosRequired: 14,
    location: {
      lat: 35.6702,
      lng: 139.7016,
      address: '東京都渋谷区神宮前4-4-4'
    },
    notes: 'キッチンの清掃で一部見落としがあったため、再作業を行っています。'
  },
  {
    id: 'assignment-005',
    jobId: 'job-009',
    workerId: 'worker-007',
    workerName: '高橋 麻衣',
    propertyName: '六本木タワー1203',
    jobDate: '2025-09-05',
    startTime: '13:00',
    status: 'approved',
    checkedInAt: '2025-09-05T13:00:00Z',
    startedAt: '2025-09-05T13:05:00Z',
    submittedAt: '2025-09-05T16:20:00Z',
    approvedAt: '2025-09-05T17:30:00Z',
    progress: 100,
    currentTask: '作業完了・承認済み',
    photosSubmitted: 18,
    totalPhotosRequired: 18,
    location: {
      lat: 35.6627,
      lng: 139.7314,
      address: '東京都港区六本木6-6-6'
    },
    notes: 'リネン類の管理も含めて完璧に作業していただきました。'
  }
]
