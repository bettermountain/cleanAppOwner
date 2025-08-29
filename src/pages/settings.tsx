import React from 'react'
import { Settings as SettingsIcon, User, CreditCard, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PageContainer } from '@/components/layout/page-container'

// Settings page for account and integration options
export function SettingsPage() {
  return (
    <PageContainer>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">設定</h1>
        <p className="text-gray-600">アカウント設定と外部連携</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              プロフィール設定
            </CardTitle>
            <CardDescription>基本情報と事業者区分の設定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">事業者区分</label>
              <select className="w-full p-2 border rounded-md">
                <option>個人</option>
                <option>個人事業主</option>
                <option>法人</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">会社名・屋号</label>
              <Input placeholder="会社名または屋号を入力" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">連絡先メールアドレス</label>
              <Input type="email" placeholder="contact@example.com" />
            </div>
            <Button>設定を保存</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              請求・支払設定
            </CardTitle>
            <CardDescription>請求書の送付先と支払方法</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">請求書送付先</label>
              <Input type="email" placeholder="billing@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">支払方法</label>
              <select className="w-full p-2 border rounded-md">
                <option>クレジットカード</option>
                <option>銀行振込</option>
                <option>請求書払い</option>
              </select>
            </div>
            <Button variant="outline">請求書払い申請</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Link className="h-5 w-5 mr-2" />
              外部連携
            </CardTitle>
            <CardDescription>Airbnb、Booking.comとの連携設定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Airbnb</h4>
                <p className="text-sm text-gray-600">未連携</p>
              </div>
              <Button variant="outline" size="sm">連携する</Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Booking.com</h4>
                <p className="text-sm text-gray-600">未連携</p>
              </div>
              <Button variant="outline" size="sm">連携する</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" />
              システム設定
            </CardTitle>
            <CardDescription>通知設定とその他の設定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">メール通知</h4>
                <p className="text-sm text-gray-600">新着応募や作業完了の通知</p>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">プッシュ通知</h4>
                <p className="text-sm text-gray-600">ブラウザでの通知表示</p>
              </div>
              <input type="checkbox" className="toggle" />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
