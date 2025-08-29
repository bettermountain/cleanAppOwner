import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/common/status-badge'
import { Plus, Search, Clock, Star, MessageSquare, Calendar, DollarSign, User, Filter, Send } from 'lucide-react'
import { mockOffers } from '@/data/offers'
import { PageContainer } from '@/components/layout/page-container'

// Offers page manages direct job offers to workers
export function OffersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-50 border-blue-200'
      case 'accepted': return 'bg-green-50 border-green-200'
      case 'declined': return 'bg-red-50 border-red-200'
      case 'expired': return 'bg-gray-50 border-gray-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }


  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return '1時間未満前'
    if (diffInHours < 24) return `${diffInHours}時間前`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}日前`
  }

  return (
    <PageContainer className="animate-fade-in">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">指名オファー</h1>
          <p className="text-muted-foreground mt-1">お気に入りスタッフへの指名オファー管理</p>
        </div>
        <Button className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          新規オファー作成
        </Button>
      </div>

      <div className="glass-effect rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="スタッフ名、物件名で検索..."
              className="pl-10 border-0 bg-background/50 focus:bg-background transition-colors"
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Calendar className="mr-2 h-4 w-4" />
            日付フィルター
          </Button>
          <Button variant="outline" className="shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            ステータス
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">送信済み</p>
                <p className="text-2xl font-bold text-blue-900">{mockOffers.filter(o => o.status === 'sent').length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">承諾済み</p>
                <p className="text-2xl font-bold text-green-900">{mockOffers.filter(o => o.status === 'accepted').length}</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">辞退</p>
                <p className="text-2xl font-bold text-red-900">{mockOffers.filter(o => o.status === 'declined').length}</p>
              </div>
              <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">期限切れ</p>
                <p className="text-2xl font-bold text-gray-900">{mockOffers.filter(o => o.status === 'expired').length}</p>
              </div>
              <div className="h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockOffers.map((offer, index) => (
          <Card key={offer.id} className={`group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-slide-in border-0 shadow-md ${getStatusColor(offer.status)}`} style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {offer.workerName}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="mr-1 h-4 w-4" />
                    {offer.propertyName} - {new Date(offer.jobDate).toLocaleDateString('ja-JP')} {offer.startTime}
                  </div>
                </div>
                <StatusBadge status={offer.status} type="offer" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm">
                  <Star className="mr-2 h-4 w-4 text-amber-500 fill-amber-500" />
                  <div>
                    <div className="font-medium">評価 {offer.workerRating}</div>
                    <div className="text-xs text-muted-foreground">スタッフ評価</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">¥{offer.payAmount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{offer.payType === 'hourly' ? '時給' : '固定'}</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{formatTimeAgo(offer.sentAt)}</div>
                    <div className="text-xs text-muted-foreground">送信日時</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">専門分野:</div>
                <div className="flex flex-wrap gap-1">
                  {offer.workerSpecialties.map((specialty, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {offer.message && (
                <div className="mb-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-sm font-medium mb-1">送信メッセージ:</div>
                  <p className="text-sm text-muted-foreground">{offer.message}</p>
                </div>
              )}

              {offer.responseMessage && (
                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm font-medium mb-1 text-primary">スタッフからの返信:</div>
                  <p className="text-sm text-muted-foreground">{offer.responseMessage}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    {offer.respondedAt && formatTimeAgo(offer.respondedAt)}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {offer.status === 'sent' && (
                    <span className="text-orange-600">
                      期限: {new Date(offer.expiresAt).toLocaleDateString('ja-JP')}
                    </span>
                  )}
                  {offer.status === 'expired' && (
                    <span className="text-red-600">
                      期限切れ: {new Date(offer.expiresAt).toLocaleDateString('ja-JP')}
                    </span>
                  )}
                  {offer.status === 'accepted' && offer.respondedAt && (
                    <span className="text-green-600">
                      承諾日: {new Date(offer.respondedAt).toLocaleDateString('ja-JP')}
                    </span>
                  )}
                  {offer.status === 'declined' && offer.respondedAt && (
                    <span className="text-red-600">
                      辞退日: {new Date(offer.respondedAt).toLocaleDateString('ja-JP')}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    詳細
                  </Button>
                  {offer.status === 'sent' && (
                    <Button size="sm" variant="destructive" className="hover:bg-destructive/90 transition-colors">
                      キャンセル
                    </Button>
                  )}
                  {offer.status === 'declined' && (
                    <Button size="sm" className="hover:bg-primary/90 transition-colors">
                      再送信
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
          さらに表示
        </Button>
      </div>
    </PageContainer>
  )
}
