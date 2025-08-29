import React from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function OffersPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">指名オファー</h1>
          <p className="text-gray-600">お気に入りスタッフへの指名オファー管理</p>
        </div>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          新規オファー作成
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>オファー履歴</CardTitle>
          <CardDescription>送信済みオファーの状況確認</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            まだオファーがありません
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
