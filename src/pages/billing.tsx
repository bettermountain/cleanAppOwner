import React from 'react'
import { Download, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/common/status-badge'
import { formatCurrency } from '@/lib/utils'

export function BillingPage() {
  const mockInvoices = [
    {
      id: '1',
      periodFrom: '2024-01-01',
      periodTo: '2024-01-31',
      total: 25000,
      status: 'paid' as const,
      issuedAt: '2024-02-01T00:00:00Z',
      paidAt: '2024-02-05T00:00:00Z'
    },
    {
      id: '2',
      periodFrom: '2024-02-01', 
      periodTo: '2024-02-29',
      total: 18500,
      status: 'issued' as const,
      issuedAt: '2024-03-01T00:00:00Z',
      paidAt: null
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">請求・支払管理</h1>
          <p className="text-gray-600">請求書の確認と支払履歴</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            CSV出力
          </Button>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            支払方法設定
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>請求書一覧</CardTitle>
          <CardDescription>月次請求書と支払状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div key={invoice.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">
                    {invoice.periodFrom} 〜 {invoice.periodTo}
                  </h4>
                  <p className="text-sm text-gray-600">
                    発行日: {new Date(invoice.issuedAt).toLocaleDateString('ja-JP')}
                    {invoice.paidAt && ` | 支払日: ${new Date(invoice.paidAt).toLocaleDateString('ja-JP')}`}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(invoice.total)}</div>
                    <StatusBadge status={invoice.status} type="invoice" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
