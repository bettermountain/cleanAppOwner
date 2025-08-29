import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Check, Filter, Trash2, FileText, CreditCard, Star, AlertCircle, CheckCircle, Clock, Users } from 'lucide-react'
import { mockNotifications } from '@/data/notifications'

export function NotificationsPage() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job_application': return <Users className="h-4 w-4" />
      case 'job_submitted': return <CheckCircle className="h-4 w-4" />
      case 'job_started': return <Clock className="h-4 w-4" />
      case 'invoice_issued': return <FileText className="h-4 w-4" />
      case 'job_rework_requested': return <AlertCircle className="h-4 w-4" />
      case 'payment_received': return <CreditCard className="h-4 w-4" />
      case 'job_cancelled': return <AlertCircle className="h-4 w-4" />
      case 'worker_rating': return <Star className="h-4 w-4" />
      case 'offer_accepted': return <CheckCircle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'job_application': return 'bg-green-100 text-green-600'
      case 'job_submitted': return 'bg-blue-100 text-blue-600'
      case 'job_started': return 'bg-yellow-100 text-yellow-600'
      case 'invoice_issued': return 'bg-purple-100 text-purple-600'
      case 'job_rework_requested': return 'bg-red-100 text-red-600'
      case 'payment_received': return 'bg-emerald-100 text-emerald-600'
      case 'job_cancelled': return 'bg-orange-100 text-orange-600'
      case 'worker_rating': return 'bg-amber-100 text-amber-600'
      case 'offer_accepted': return 'bg-teal-100 text-teal-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分前`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}時間前`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}日前`
    }
  }

  const unreadCount = mockNotifications.filter(n => !n.readAt).length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">通知</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount}件の未読通知があります` : 'すべての通知を確認済みです'}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Filter className="mr-2 h-4 w-4" />
            フィルター
          </Button>
          <Button variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">
            <Check className="mr-2 h-4 w-4" />
            すべて既読
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">未読</p>
                <p className="text-2xl font-bold text-blue-900">{unreadCount}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bell className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">応募通知</p>
                <p className="text-2xl font-bold text-green-900">{mockNotifications.filter(n => n.type === 'job_application').length}</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">作業完了</p>
                <p className="text-2xl font-bold text-purple-900">{mockNotifications.filter(n => n.type === 'job_submitted').length}</p>
              </div>
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">請求・支払</p>
                <p className="text-2xl font-bold text-emerald-900">{mockNotifications.filter(n => ['invoice_issued', 'payment_received'].includes(n.type)).length}</p>
              </div>
              <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification, index) => (
          <Card key={notification.id} className={`group transition-all duration-300 hover:shadow-xl hover:scale-[1.01] animate-slide-in border-0 shadow-md ${!notification.readAt ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 rounded-full ${getNotificationColor(notification.type)} group-hover:scale-110 transition-transform`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {notification.title}
                    </CardTitle>
                    <div className="mt-2 space-y-1">
                      {notification.type === 'job_application' && (
                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">{notification.payload.workerName}</span>さんが<span className="font-medium">{notification.payload.propertyName}</span>の清掃案件に応募しました。</p>
                        </div>
                      )}
                      {notification.type === 'job_submitted' && (
                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">{notification.payload.workerName}</span>さんが<span className="font-medium">{notification.payload.propertyName}</span>の清掃を完了し、<span className="font-medium">{notification.payload.photosCount}枚</span>の写真を提出しました。</p>
                        </div>
                      )}
                      {notification.type === 'job_started' && (
                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">{notification.payload.workerName}</span>さんが<span className="font-medium">{notification.payload.propertyName}</span>の清掃作業を開始しました。</p>
                        </div>
                      )}
                      {notification.type === 'invoice_issued' && (
                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">{notification.payload.period}</span>の請求書（<span className="font-medium">¥{notification.payload.amount?.toLocaleString()}</span>）が発行されました。支払期限: {notification.payload.dueDate ? new Date(notification.payload.dueDate).toLocaleDateString('ja-JP') : '未定'}</p>
                        </div>
                      )}
                      {notification.type === 'job_rework_requested' && (
                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">{notification.payload.propertyName}</span>の清掃について再作業が必要です。理由: {notification.payload.reason}</p>
                        </div>
                      )}
                      {notification.type === 'payment_received' && (
                        <div className="text-sm text-muted-foreground">
                          <p>請求書の支払い（<span className="font-medium">¥{notification.payload.amount?.toLocaleString()}</span>）を{notification.payload.paymentMethod}で受領しました。</p>
                        </div>
                      )}
                      {notification.type === 'worker_rating' && (
                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">{notification.payload.workerName}</span>さんの作業評価をお願いします。（{notification.payload.propertyName}）</p>
                        </div>
                      )}
                      {notification.type === 'offer_accepted' && (
                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">{notification.payload.workerName}</span>さんが<span className="font-medium">{notification.payload.propertyName}</span>のオファーを承諾しました。</p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeAgo(notification.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 shrink-0">
                  {!notification.readAt && (
                    <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                      既読
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="hover:bg-destructive hover:text-destructive-foreground transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
          <Check className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">すべての通知を表示しました</p>
      </div>
    </div>
  )
}
