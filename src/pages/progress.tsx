import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/common/status-badge'
import { Search, MapPin, Clock, User, Camera, CheckCircle, AlertCircle, Play, Pause, Filter, RefreshCw } from 'lucide-react'
import { mockAssignments } from '@/data/assignments'

export function ProgressPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-50 border-blue-200'
      case 'checked_in': return 'bg-green-50 border-green-200'
      case 'in_progress': return 'bg-yellow-50 border-yellow-200'
      case 'submitted': return 'bg-purple-50 border-purple-200'
      case 'approved': return 'bg-emerald-50 border-emerald-200'
      case 'rework': return 'bg-orange-50 border-orange-200'
      case 'cancelled': return 'bg-red-50 border-red-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned': return <User className="h-4 w-4" />
      case 'checked_in': return <MapPin className="h-4 w-4" />
      case 'in_progress': return <Play className="h-4 w-4" />
      case 'submitted': return <Camera className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rework': return <AlertCircle className="h-4 w-4" />
      case 'cancelled': return <Pause className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}時間前`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}日前`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">進捗モニター</h1>
          <p className="text-muted-foreground mt-1">リアルタイムでの作業進捗確認</p>
        </div>
        <Button className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <RefreshCw className="mr-2 h-4 w-4" />
          更新
        </Button>
      </div>

      <div className="glass-effect rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="物件名、スタッフ名で検索..."
              className="pl-10 border-0 bg-background/50 focus:bg-background transition-colors"
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            ステータス
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">アサイン済み</p>
                <p className="text-2xl font-bold text-blue-900">{mockAssignments.filter(a => a.status === 'assigned').length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">到着済み</p>
                <p className="text-2xl font-bold text-green-900">{mockAssignments.filter(a => a.status === 'checked_in').length}</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">作業中</p>
                <p className="text-2xl font-bold text-yellow-900">{mockAssignments.filter(a => a.status === 'in_progress').length}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">提出済み</p>
                <p className="text-2xl font-bold text-purple-900">{mockAssignments.filter(a => a.status === 'submitted').length}</p>
              </div>
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">承認済み</p>
                <p className="text-2xl font-bold text-emerald-900">{mockAssignments.filter(a => a.status === 'approved').length}</p>
              </div>
              <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockAssignments.map((assignment, index) => (
          <Card key={assignment.id} className={`group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-slide-in border-0 shadow-md ${getStatusColor(assignment.status)}`} style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {assignment.propertyName}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <User className="mr-1 h-4 w-4" />
                    {assignment.workerName} - {new Date(assignment.jobDate).toLocaleDateString('ja-JP')} {assignment.startTime}
                  </div>
                </div>
                <StatusBadge status={assignment.status} type="assignment" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm">
                  <div className="mr-2 h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    {getStatusIcon(assignment.status)}
                  </div>
                  <div>
                    <div className="font-medium">{assignment.currentTask}</div>
                    <div className="text-xs text-muted-foreground">現在の作業</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <div className="mr-2 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="text-xs font-bold text-blue-600">{assignment.progress}%</div>
                  </div>
                  <div>
                    <div className="font-medium">進捗 {assignment.progress}%</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${assignment.progress}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Camera className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{assignment.photosSubmitted}/{assignment.totalPhotosRequired}</div>
                    <div className="text-xs text-muted-foreground">写真提出</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {assignment.status === 'in_progress' && assignment.startedAt ? formatTimeAgo(assignment.startedAt) : 
                       assignment.status === 'checked_in' && assignment.checkedInAt ? formatTimeAgo(assignment.checkedInAt) : 
                       assignment.status === 'submitted' && assignment.submittedAt ? formatTimeAgo(assignment.submittedAt) : '-'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {assignment.status === 'in_progress' ? '作業開始' :
                       assignment.status === 'checked_in' ? '到着時刻' :
                       assignment.status === 'submitted' ? '提出時刻' : '更新時刻'}
                    </div>
                  </div>
                </div>
              </div>

              {assignment.location && (
                <div className="mb-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    現在地:
                  </div>
                  <p className="text-sm text-muted-foreground">{assignment.location.address}</p>
                </div>
              )}

              {assignment.notes && (
                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm font-medium mb-1 text-primary">作業メモ:</div>
                  <p className="text-sm text-muted-foreground">{assignment.notes}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {assignment.status === 'in_progress' && (
                    <span className="text-yellow-600 flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      作業進行中
                    </span>
                  )}
                  {assignment.status === 'submitted' && (
                    <span className="text-purple-600 flex items-center gap-1">
                      <Camera className="h-3 w-3" />
                      承認待ち
                    </span>
                  )}
                  {assignment.status === 'rework' && (
                    <span className="text-orange-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      再作業中
                    </span>
                  )}
                  {assignment.status === 'approved' && assignment.approvedAt && (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      承認済み ({formatTimeAgo(assignment.approvedAt)})
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    詳細
                  </Button>
                  {assignment.status === 'submitted' && (
                    <Button size="sm" className="hover:bg-primary/90 transition-colors">
                      写真確認
                    </Button>
                  )}
                  {assignment.location && (
                    <Button variant="outline" size="sm" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">
                      地図表示
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
