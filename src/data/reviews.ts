export interface Review {
  id: string
  jobId: string
  workerId: string
  workerName: string
  propertyName: string
  jobDate: string
  rating: number
  comment: string
  categories: {
    punctuality: number
    quality: number
    communication: number
    professionalism: number
  }
  photos?: string[]
  createdAt: string
  response?: {
    message: string
    createdAt: string
  }
}

export const mockReviews: Review[] = [
  {
    id: 'review-001',
    jobId: 'job-001',
    workerId: 'worker-001',
    workerName: '田中 美咲',
    propertyName: '渋谷アパートメント101',
    jobDate: '2025-08-25',
    rating: 5,
    comment: '非常に丁寧で迅速な作業でした。バスルームとキッチンが特にきれいになり、ゲストからも好評でした。時間通りに到着し、プロフェッショナルな対応でした。また次回もお願いしたいと思います。',
    categories: {
      punctuality: 5,
      quality: 5,
      communication: 5,
      professionalism: 5
    },
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
    ],
    createdAt: '2025-08-25T16:30:00Z',
    response: {
      message: 'ありがとうございます。今後ともよろしくお願いいたします。',
      createdAt: '2025-08-25T18:45:00Z'
    }
  },
  {
    id: 'review-002',
    jobId: 'job-003',
    workerId: 'worker-003',
    workerName: '佐藤 花子',
    propertyName: '新宿マンション205',
    jobDate: '2025-08-23',
    rating: 4,
    comment: 'エアコン清掃を中心にお願いしましたが、とても丁寧に作業していただきました。少し時間がかかりましたが、仕上がりは満足です。コミュニケーションも良好でした。',
    categories: {
      punctuality: 4,
      quality: 5,
      communication: 4,
      professionalism: 4
    },
    createdAt: '2025-08-23T17:15:00Z',
    response: {
      message: 'ご評価いただきありがとうございます。次回はより効率的に作業いたします。',
      createdAt: '2025-08-23T19:30:00Z'
    }
  },
  {
    id: 'review-003',
    jobId: 'job-005',
    workerId: 'worker-005',
    workerName: '山田 太郎',
    propertyName: '池袋ゲストハウス',
    jobDate: '2025-08-20',
    rating: 5,
    comment: 'ベッドメイキングが非常に美しく、アメニティの補充も完璧でした。ゲストハウスの清掃に慣れていらっしゃるようで、細かい部分まで気を配っていただきました。',
    categories: {
      punctuality: 5,
      quality: 5,
      communication: 5,
      professionalism: 5
    },
    photos: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400'
    ],
    createdAt: '2025-08-20T14:20:00Z'
  },
  {
    id: 'review-004',
    jobId: 'job-007',
    workerId: 'worker-002',
    workerName: '鈴木 次郎',
    propertyName: '原宿スタジオ',
    jobDate: '2025-08-18',
    rating: 3,
    comment: 'フローリングの清掃は良かったのですが、一部見落としがありました。消毒作業は丁寧でしたが、もう少し細かい部分まで確認していただけると良かったです。',
    categories: {
      punctuality: 4,
      quality: 3,
      communication: 3,
      professionalism: 4
    },
    createdAt: '2025-08-18T16:45:00Z',
    response: {
      message: '申し訳ございませんでした。次回はより注意深く作業いたします。',
      createdAt: '2025-08-18T20:15:00Z'
    }
  },
  {
    id: 'review-005',
    jobId: 'job-009',
    workerId: 'worker-007',
    workerName: '高橋 麻衣',
    propertyName: '六本木タワー1203',
    jobDate: '2025-08-15',
    rating: 5,
    comment: 'リネン類の管理が素晴らしく、洗濯からアイロンがけまで完璧でした。タオルの交換も丁寧で、ゲストが快適に過ごせる環境を整えていただきました。',
    categories: {
      punctuality: 5,
      quality: 5,
      communication: 4,
      professionalism: 5
    },
    photos: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
    ],
    createdAt: '2025-08-15T15:30:00Z'
  },
  {
    id: 'review-006',
    jobId: 'job-011',
    workerId: 'worker-004',
    workerName: '伊藤 健一',
    propertyName: '恵比寿ガーデン402',
    jobDate: '2025-08-12',
    rating: 4,
    comment: 'バルコニーと外窓の清掃をお願いしました。高所作業も安全に行っていただき、仕上がりもきれいでした。植物の水やりも丁寧にしていただきありがとうございました。',
    categories: {
      punctuality: 4,
      quality: 4,
      communication: 4,
      professionalism: 5
    },
    createdAt: '2025-08-12T17:00:00Z'
  }
]
