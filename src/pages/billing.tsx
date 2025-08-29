import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/common/status-badge'
import { Download, Search, Calendar, Filter, FileText, CreditCard, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { mockInvoices } from '@/data/invoices'
import { PageContainer } from '@/components/layout/page-container'

// Billing page shows invoice history and revenue summary
export function BillingPage() {
  // Calculate key invoice metrics for summary cards
  const totalRevenue = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0)
  const unpaidAmount = mockInvoices.filter(inv => ['issued', 'overdue'].includes(inv.status)).reduce((sum, inv) => sum + inv.total, 0)
  const overdueAmount = mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0)
  const currentMonthJobs = mockInvoices[0]?.completedJobs || 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-50 border-green-200'
      case 'issued': return 'bg-blue-50 border-blue-200'
      case 'overdue': return 'bg-red-50 border-red-200'
      case 'draft': return 'bg-gray-50 border-gray-200'
      case 'void': return 'bg-gray-50 border-gray-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <PageContainer className="animate-fade-in">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">請求・支払管理</h1>
          <p className="text-muted-foreground mt-1">請求書の管理と支払い状況の確認</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Download className="mr-2 h-4 w-4" />
            CSV出力
          </Button>
          <Button variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">
            <FileText className="mr-2 h-4 w-4" />
            PDF出力
          </Button>
        </div>
      </div>

      <div className="glass-effect rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="請求書番号で検索..."
              className="pl-10 border-0 bg-background/50 focus:bg-background transition-colors"
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Calendar className="mr-2 h-4 w-4" />
            期間フィルター
          </Button>
          <Button variant="outline" className="shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            ステータス
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">総売上</p>
                <p className="text-2xl font-bold text-green-900">¥{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12.5% 前月比</p>
              </div>
              <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">未払い金額</p>
                <p className="text-2xl font-bold text-blue-900">¥{unpaidAmount.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">{mockInvoices.filter(inv => ['issued', 'overdue'].includes(inv.status)).length}件の請求書</p>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">延滞金額</p>
                <p className="text-2xl font-bold text-red-900">¥{overdueAmount.toLocaleString()}</p>
                <p className="text-xs text-red-600 mt-1">{mockInvoices.filter(inv => inv.status === 'overdue').length}件が延滞中</p>
              </div>
              <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">今月の案件数</p>
                <p className="text-2xl font-bold text-purple-900">{currentMonthJobs}</p>
                <p className="text-xs text-purple-600 mt-1">完了済み案件</p>
              </div>
              <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockInvoices.map((invoice, index) => (
          <Card key={invoice.id} className={`group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-slide-in border-0 shadow-md ${getStatusColor(invoice.status)}`} style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {invoice.id}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(invoice.periodFrom).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}
                  </p>
                </div>
                <StatusBadge status={invoice.status} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">請求金額</p>
                  <p className="text-lg font-semibold">¥{invoice.total.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">税込</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">案件数</p>
                  <p className="text-lg font-semibold">{invoice.jobsCount}件</p>
                  <p className="text-xs text-muted-foreground">完了: {invoice.completedJobs}件</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">支払期限</p>
                  <p className="text-lg font-semibold">{new Date(invoice.dueDate).toLocaleDateString('ja-JP')}</p>
                  {invoice.status === 'overdue' && (
                    <p className="text-xs text-red-600">期限超過</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">支払日</p>
                  <p className="text-lg font-semibold">
                    {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString('ja-JP') : '未払い'}
                  </p>
                  {invoice.paidAt && (
                    <p className="text-xs text-green-600">支払済み</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">手数料</p>
                  <p className="text-lg font-semibold">¥{invoice.platformFee.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">8%</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  発行日: {new Date(invoice.issuedAt).toLocaleDateString('ja-JP')}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">
                    詳細
                  </Button>
                  {invoice.status === 'issued' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CreditCard className="mr-2 h-4 w-4" />
                      支払い
                    </Button>
                  )}
                  {invoice.status === 'overdue' && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      至急支払い
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
