import React from 'react'
import { Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/common/status-badge'

export function ProgressPage() {
  const mockStats = {
    assigned: 2,
    checkedIn: 1,
    inProgress: 3,
    submitted: 2
  }

  const mockAssignments = [
    {
      id: '1',
      propertyName: '渋谷アパートメント101',
      workerName: '田中太郎',
      status: 'in_progress' as const,
      jobDate: '2024-01-20',
      startTime: '10:00'
    },
    {
      id: '2',
      propertyName: '新宿マンション205',
      workerName: '佐藤花子', 
      status: 'submitted' as const,
      jobDate: '2024-01-20',
      startTime: '14:00'
    }
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">進捗モニター</h1>
        <p className="text-gray-600">リアルタイムでの作業進捗確認</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アサイン済み</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.assigned}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">到着済み</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.checkedIn}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">作業中</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.inProgress}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">提出済み</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.submitted}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>進行中の作業</CardTitle>
          <CardDescription>現在進行中の清掃作業一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAssignments.map((assignment) => (
              <div key={assignment.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{assignment.propertyName}</h4>
                  <p className="text-sm text-gray-600">
                    担当: {assignment.workerName} | {assignment.jobDate} {assignment.startTime}
                  </p>
                </div>
                <StatusBadge status={assignment.status} type="assignment" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
