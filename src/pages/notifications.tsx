import React from 'react'
import { Bell, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function NotificationsPage() {
  const mockNotifications = [
    {
      id: '1',
      type: 'job_application',
      title: '新しい応募がありました',
      message: '渋谷アパートメント101の清掃依頼に田中太郎さんが応募しました',
      createdAt: '2024-01-20T10:00:00Z',
      readAt: null
    },
    {
      id: '2',
      type: 'work_submitted',
      title: '作業が完了しました',
      message: '新宿マンション205の清掃作業が完了し、写真が提出されました',
      createdAt: '2024-01-19T16:30:00Z',
      readAt: '2024-01-19T17:00:00Z'
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">通知</h1>
          <p className="text-gray-600">システムからの重要なお知らせ</p>
        </div>
        <Button variant="outline">
          <Check className="h-4 w-4 mr-2" />
          すべて既読にする
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>通知一覧</CardTitle>
          <CardDescription>最新の通知とお知らせ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg ${!notification.readAt ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Bell className="h-4 w-4 mr-2 text-gray-400" />
                      <h4 className="font-medium">{notification.title}</h4>
                      {!notification.readAt && (
                        <span className="ml-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString('ja-JP')}
                    </p>
                  </div>
                  {!notification.readAt && (
                    <Button variant="ghost" size="sm">
                      既読にする
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
