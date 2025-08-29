import React from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, Clock, DollarSign, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/common/status-badge'
import { formatCurrency } from '@/lib/utils'
import { PageContainer } from '@/components/layout/page-container'

// Job detail page shows a single job with application list
export function JobDetailPage() {
  const { id } = useParams()
  
  const mockJob = {
    id: id || '1',
    propertyName: '渋谷アパートメント101',
    address: '東京都渋谷区渋谷1-1-1',
    status: 'open' as const,
    jobDate: '2024-01-20',
    startTime: '10:00',
    expectedHours: 2,
    payType: 'fixed' as const,
    payAmount: 5000,
    description: '通常清掃',
    applications: [
      { id: '1', workerName: '田中太郎', rating: 4.8, appliedAt: '2024-01-15T09:00:00Z' },
      { id: '2', workerName: '佐藤花子', rating: 4.9, appliedAt: '2024-01-15T10:30:00Z' }
    ]
  }

  return (
    <PageContainer>
      {/* Job overview */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{mockJob.propertyName}</h1>
          <p className="text-gray-600 flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {mockJob.address}
          </p>
        </div>
        <StatusBadge status={mockJob.status} type="job" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Details about the job itself */}
          <Card>
            <CardHeader>
              <CardTitle>依頼詳細</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{mockJob.jobDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{mockJob.startTime} ({mockJob.expectedHours}時間)</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                  <span>
                    {mockJob.payType === 'fixed' 
                      ? formatCurrency(mockJob.payAmount)
                      : `${formatCurrency(mockJob.payAmount)}/時間`
                    }
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">作業内容</h4>
                <p className="text-gray-600">{mockJob.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>応募者一覧 ({mockJob.applications.length}件)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockJob.applications.map((application) => (
                  <div key={application.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{application.workerName}</h4>
                      <p className="text-sm text-gray-600">
                        評価: ⭐ {application.rating} | 応募日時: {new Date(application.appliedAt).toLocaleString('ja-JP')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">プロフィール</Button>
                      <Button size="sm">アサイン</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>アクション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">指名オファー送信</Button>
              <Button variant="outline" className="w-full">依頼を編集</Button>
              <Button variant="destructive" className="w-full">依頼をキャンセル</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
