import React from 'react'
import { Plus, Calendar, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/common/status-badge'
import { formatCurrency } from '@/lib/utils'

export function JobsPage() {
  const mockJobs = [
    {
      id: '1',
      propertyName: '渋谷アパートメント101',
      status: 'open' as const,
      jobDate: '2024-01-20',
      startTime: '10:00',
      expectedHours: 2,
      payType: 'fixed' as const,
      payAmount: 5000,
      description: '通常清掃'
    },
    {
      id: '2',
      propertyName: '新宿マンション205', 
      status: 'assigned' as const,
      jobDate: '2024-01-21',
      startTime: '14:00',
      expectedHours: 3,
      payType: 'hourly' as const,
      payAmount: 1500,
      description: 'チェックアウト後清掃'
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">依頼管理</h1>
          <p className="text-gray-600">清掃依頼の作成・管理</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規依頼作成
        </Button>
      </div>

      <div className="grid gap-4">
        {mockJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.propertyName}</CardTitle>
                  <CardDescription>{job.description}</CardDescription>
                </div>
                <StatusBadge status={job.status} type="job" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  {job.jobDate}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {job.startTime} ({job.expectedHours}時間)
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                  {job.payType === 'fixed' 
                    ? formatCurrency(job.payAmount)
                    : `${formatCurrency(job.payAmount)}/時間`
                  }
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    詳細
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
