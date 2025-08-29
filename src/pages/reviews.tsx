import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Star, MessageSquare, Calendar, User, Camera, Filter, ThumbsUp } from 'lucide-react'
import { mockReviews } from '@/data/reviews'

export function ReviewsPage() {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return '1時間未満前'
    if (diffInHours < 24) return `${diffInHours}時間前`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}日前`
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ))
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'punctuality': return '時間厳守'
      case 'quality': return '作業品質'
      case 'communication': return 'コミュニケーション'
      case 'professionalism': return 'プロ意識'
      default: return category
    }
  }

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">レビュー・評価</h1>
          <p className="text-muted-foreground mt-1">スタッフの評価とレビュー管理</p>
        </div>
        <Button className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          評価を追加
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
            評価フィルター
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">平均評価</p>
                <p className="text-2xl font-bold text-amber-900">{averageRating.toFixed(1)}</p>
              </div>
              <div className="h-8 w-8 bg-amber-500 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-white fill-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">総レビュー数</p>
                <p className="text-2xl font-bold text-green-900">{mockReviews.length}</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">高評価</p>
                <p className="text-2xl font-bold text-blue-900">{mockReviews.filter(r => r.rating >= 4).length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <ThumbsUp className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">写真付き</p>
                <p className="text-2xl font-bold text-purple-900">{mockReviews.filter(r => r.photos && r.photos.length > 0).length}</p>
              </div>
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockReviews.map((review, index) => (
          <Card key={review.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-slide-in border-0 shadow-md" style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {review.workerName}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="mr-1 h-4 w-4" />
                    {review.propertyName} - {new Date(review.jobDate).toLocaleDateString('ja-JP')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-lg font-bold text-amber-600">{review.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {Object.entries(review.categories).map(([category, rating]) => (
                  <div key={category} className="text-center">
                    <div className="text-sm font-medium mb-1">{getCategoryLabel(category)}</div>
                    <div className="flex justify-center mb-1">
                      {renderStars(rating)}
                    </div>
                    <div className="text-xs text-muted-foreground">{rating}/5</div>
                  </div>
                ))}
              </div>

              <div className="mb-4 p-4 bg-background/50 rounded-lg">
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  レビューコメント:
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>

              {review.photos && review.photos.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    添付写真:
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {review.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`作業写真 ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-border hover:scale-110 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              )}

              {review.response && (
                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm font-medium mb-1 text-primary">スタッフからの返信:</div>
                  <p className="text-sm text-muted-foreground">{review.response.message}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    {formatTimeAgo(review.response.createdAt)}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  投稿日: {formatTimeAgo(review.createdAt)}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    詳細
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">
                    編集
                  </Button>
                  {!review.response && (
                    <Button size="sm" className="hover:bg-primary/90 transition-colors">
                      返信
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
    </div>
  )
}
