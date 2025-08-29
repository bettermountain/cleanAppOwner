import { Link, useLocation } from 'react-router-dom'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import {
  Home,
  Building2,
  Briefcase,
  UserCheck,
  Activity,
  Star,
  CreditCard,
  Bell,
  Settings,
} from 'lucide-react'

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: Home },
  { name: '物件管理', href: '/properties', icon: Building2 },
  { name: '依頼管理', href: '/jobs', icon: Briefcase },
  { name: '指名オファー', href: '/offers', icon: UserCheck },
  { name: '進捗モニター', href: '/progress', icon: Activity },
  { name: 'レビュー', href: '/reviews', icon: Star },
  { name: '請求・支払', href: '/billing', icon: CreditCard },
  { name: '通知', href: '/notifications', icon: Bell },
  { name: '設定', href: '/settings', icon: Settings },
]

// Sidebar navigation using Material UI components for consistent styling
export function Sidebar() {
  const location = useLocation()

  return (
    <Box
      component="nav"
      sx={{
        width: 256,
        flexShrink: 0,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* Application title */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">CleanApp Owner</Typography>
      </Box>
      <List>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <ListItemButton
              key={item.name}
              component={Link}
              to={item.href}
              selected={isActive}
              // When selected, use theme colors to highlight the item
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}
