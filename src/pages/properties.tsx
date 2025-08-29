import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  InputAdornment,
  Chip
} from '@mui/material'
import { Plus, Search, MapPin, Home, Users, Star, Calendar } from 'lucide-react'
import { mockProperties } from '@/data/properties'

export function PropertiesPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            物件管理
          </Typography>
          <Typography variant="body1" color="text.secondary">
            登録物件の管理と新規物件の追加
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Plus size={20} />}>
          新規物件登録
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="物件名、住所で検索..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" startIcon={<MapPin size={16} />}>
            地図表示
          </Button>
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
        {mockProperties.map((property) => (
          <Paper key={property.id} sx={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={property.imageUrl}
                  alt={property.name}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <Chip
                  label={property.type}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    ¥{property.pricePerNight.toLocaleString()}/泊
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ flex: 1, mr: 1 }}>
                    {property.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Home size={16} style={{ marginRight: 4 }} />
                    <Typography variant="body2">
                      {property.rooms}部屋
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, color: 'text.secondary' }}>
                  <MapPin size={16} style={{ marginRight: 8, marginTop: 2, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                    {property.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Users size={16} style={{ marginRight: 4 }} />
                    <Typography variant="body2">
                      最大{property.maxGuests}名
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffa726' }}>
                    <Star size={14} style={{ marginRight: 4 }} />
                    <Typography variant="body2" fontWeight={500}>
                      4.8
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                  <Calendar size={14} style={{ marginRight: 4 }} />
                  <Typography variant="caption">
                    更新: {new Date(property.updatedAt).toLocaleDateString('ja-JP')}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <Button variant="outlined" size="small" sx={{ flex: 1 }}>
                    詳細
                  </Button>
                  <Button variant="contained" size="small" sx={{ flex: 1 }}>
                    編集
                  </Button>
                </Box>
              </Box>
            </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="outlined">
          さらに表示
        </Button>
      </Box>
    </Box>
  )
}
