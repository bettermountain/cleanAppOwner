import React from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ReviewsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">レビュー・評価</h1>
          <p className="text-gray-600">スタッフの評価とレビュー管理</p>
        </div>
        <Button>
          <Star className="h-4 w-4 mr-2" />
          評価を追加
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>評価履歴</CardTitle>
          <CardDescription>過去に投稿した評価とレビュー</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            まだ評価がありません
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
