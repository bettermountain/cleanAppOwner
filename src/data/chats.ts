export type ChatSender = 'owner' | 'worker'

export interface ChatMessage {
  id: string
  threadId: string
  sender: ChatSender
  content: string
  createdAt: string
  read?: boolean
}

export interface ChatThread {
  id: string
  workerId: string
  workerName: string
  workerAvatar?: string
  lastMessageAt: string
  unreadCount: number
  messages: ChatMessage[]
}

export const mockChatThreads: ChatThread[] = [
  {
    id: 'thread-001',
    workerId: 'worker-001',
    workerName: '田中 美咲',
    workerAvatar: 'https://i.pravatar.cc/100?img=5',
    lastMessageAt: '2025-09-02T10:12:00Z',
    unreadCount: 2,
    messages: [
      { id: 'm-001', threadId: 'thread-001', sender: 'owner', content: '本日の開始時間は10時でお願いします。', createdAt: '2025-09-02T08:30:00Z', read: true },
      { id: 'm-002', threadId: 'thread-001', sender: 'worker', content: '承知しました。10時に現地到着します。', createdAt: '2025-09-02T09:10:00Z', read: true },
      { id: 'm-003', threadId: 'thread-001', sender: 'worker', content: '駐車スペースは利用できますか？', createdAt: '2025-09-02T10:12:00Z', read: false },
      { id: 'm-004', threadId: 'thread-001', sender: 'worker', content: 'もし難しければ近隣のパーキングを利用します。', createdAt: '2025-09-02T10:12:30Z', read: false },
    ],
  },
  {
    id: 'thread-002',
    workerId: 'worker-004',
    workerName: '伊藤 健一',
    workerAvatar: 'https://i.pravatar.cc/100?img=12',
    lastMessageAt: '2025-09-01T18:05:00Z',
    unreadCount: 0,
    messages: [
      { id: 'm-101', threadId: 'thread-002', sender: 'worker', content: '写真を提出しました。ご確認お願いします。', createdAt: '2025-09-01T17:50:00Z', read: true },
      { id: 'm-102', threadId: 'thread-002', sender: 'owner', content: '確認しました。ありがとうございます！', createdAt: '2025-09-01T18:05:00Z', read: true },
    ],
  },
  {
    id: 'thread-003',
    workerId: 'worker-007',
    workerName: '高橋 麻衣',
    workerAvatar: 'https://i.pravatar.cc/100?img=32',
    lastMessageAt: '2025-08-31T12:40:00Z',
    unreadCount: 1,
    messages: [
      { id: 'm-201', threadId: 'thread-003', sender: 'owner', content: 'タオルの在庫が少ないので補充お願いします。', createdAt: '2025-08-31T12:10:00Z', read: true },
      { id: 'm-202', threadId: 'thread-003', sender: 'worker', content: '了解です。買い足しておきます。', createdAt: '2025-08-31T12:40:00Z', read: false },
    ],
  },
]

