import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/common/status-badge'
import { Plus, Search, Calendar, Clock, MapPin, DollarSign, Users, Star, ArrowRight, Filter } from 'lucide-react'
import { mockJobs } from '@/data/jobs'
import { Link } from 'react-router-dom'

export function JobsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-50 border-green-200'
      case 'assigned': return 'bg-blue-50 border-blue-200'
      case 'in_progress': return 'bg-yellow-50 border-yellow-200'
      case 'completed': return 'bg-gray-50 border-gray-200'
      case 'submitted': return 'bg-purple-50 border-purple-200'
      case 'approved': return 'bg-emerald-50 border-emerald-200'
      case 'cancelled': return 'bg-red-50 border-red-200'
      case 'rework': return 'bg-orange-50 border-orange-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getPayTypeLabel = (payType: string) => {
    return payType === 'hourly' ? '時給' : '固定'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">案件管理</h1>
          <p className="text-muted-foreground mt-1">清掃案件の作成・管理・進捗確認</p>
        </div>
        <Button className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          新規案件作成
        </Button>
      </div>

      <div className="glass-effect rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="案件名、物件名で検索..."
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
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">公開中</p>
                <p className="text-2xl font-bold text-green-900">{mockJobs.filter(j => j.status === 'open').length}</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">進行中</p>
                <p className="text-2xl font-bold text-blue-900">{mockJobs.filter(j => ['assigned', 'in_progress'].includes(j.status)).length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">確認待ち</p>
                <p className="text-2xl font-bold text-purple-900">{mockJobs.filter(j => j.status === 'submitted').length}</p>
              </div>
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Search className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">完了</p>
                <p className="text-2xl font-bold text-emerald-900">{mockJobs.filter(j => ['completed', 'approved'].includes(j.status)).length}</p>
              </div>
              <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockJobs.map((job, index) => (
          <Card key={job.id} className={`group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-slide-in border-0 shadow-md ${getStatusColor(job.status)}`} style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {job.property.name}の清掃
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.property.address}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{job.description}</p>
                </div>
                <StatusBadge status={job.status} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{new Date(job.jobDate).toLocaleDateString('ja-JP')}</div>
                    <div className="text-xs text-muted-foreground">{job.startTime}</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{job.expectedHours}時間</div>
                    <div className="text-xs text-muted-foreground">予定</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">¥{job.payAmount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{getPayTypeLabel(job.payType)}</div>
                  </div>
                </div>
                <div className="text-sm">
                  {job.status === 'open' && job.applications && (
                    <div>
                      <div className="font-medium text-green-600">{job.applications}件の応募</div>
                      <div className="text-xs text-muted-foreground">応募中</div>
                    </div>
                  )}
                  {job.assignedWorker && (
                    <div>
                      <div className="font-medium">{job.assignedWorker.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                        {job.assignedWorker.rating}
                      </div>
                    </div>
                  )}
                  {job.status === 'completed' && job.rating && (
                    <div>
                      <div className="font-medium flex items-center">
                        {'★'.repeat(job.rating)}
                      </div>
                      <div className="text-xs text-muted-foreground">評価済み</div>
                    </div>
                  )}
                  {job.status === 'submitted' && job.photosCount && (
                    <div>
                      <div className="font-medium text-purple-600">{job.photosCount}枚の写真</div>
                      <div className="text-xs text-muted-foreground">確認待ち</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {job.publicOrInvite === 'invite_only' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      指名限定
                    </span>
                  )}
                  {job.tipAllowed && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      チップ可
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    詳細
                  </Button>
                  <Link to={`/jobs/${job.id}`}>
                    <Button size="sm" className="group">
                      管理
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
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
