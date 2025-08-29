import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function PropertiesPage() {
  const mockProperties = [
    {
      id: '1',
      name: '渋谷アパートメント101',
      address: '東京都渋谷区渋谷1-1-1',
      accessNote: 'エントランスは暗証番号1234',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2', 
      name: '新宿マンション205',
      address: '東京都新宿区新宿2-2-2',
      accessNote: 'オートロック、管理人に連絡',
      updatedAt: '2024-01-14T15:30:00Z'
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">物件管理</h1>
          <p className="text-gray-600">登録済み物件の管理と新規物件の追加</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規物件登録
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{property.name}</CardTitle>
              <CardDescription>{property.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{property.accessNote}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  更新: {new Date(property.updatedAt).toLocaleDateString('ja-JP')}
                </span>
                <Button variant="outline" size="sm">
                  編集
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
