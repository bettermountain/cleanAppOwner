import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, MapPin, Home, Users, Star, Calendar } from 'lucide-react'
import { mockProperties } from '@/data/properties'
import { PageContainer } from '@/components/layout/page-container'

// Properties page manages registered rental properties
export function PropertiesPage() {
  return (
    <PageContainer className="animate-fade-in">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">物件管理</h1>
          <p className="text-muted-foreground mt-1">登録物件の管理と新規物件の追加</p>
        </div>
        <Button className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          新規物件登録
        </Button>
      </div>

      <div className="glass-effect rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="物件名、住所で検索..."
              className="pl-10 border-0 bg-background/50 focus:bg-background transition-colors"
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <MapPin className="mr-2 h-4 w-4" />
            地図表示
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProperties.map((property, index) => (
          <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-in border-0 shadow-md overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="relative">
              <img 
                src={property.imageUrl} 
                alt={property.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                {property.type}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm font-medium">
                ¥{property.pricePerNight.toLocaleString()}/泊
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="truncate">{property.name}</span>
                <div className="flex items-center text-sm text-muted-foreground shrink-0 ml-2">
                  <Home className="mr-1 h-4 w-4" />
                  {property.rooms}部屋
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{property.address}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    最大{property.maxGuests}名
                  </div>
                  <div className="flex items-center text-amber-500">
                    <Star className="mr-1 h-3 w-3 fill-current" />
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  更新: {new Date(property.updatedAt).toLocaleDateString('ja-JP')}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors">
                    詳細
                  </Button>
                  <Button size="sm" className="flex-1">
                    編集
                  </Button>
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
