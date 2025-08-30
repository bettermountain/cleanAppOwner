import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import {
  Home,
  Building2,
  Briefcase,
  Heart,
  Activity,
  Star,
  CreditCard,
  Bell,
  Mail,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: Home },
  { name: '物件管理', href: '/properties', icon: Building2 },
  { name: '依頼管理', href: '/jobs', icon: Briefcase },
  { name: 'お気に入りスタッフ', href: '/favorites', icon: Heart },
  { name: '進捗モニター', href: '/progress', icon: Activity },
  { name: 'レビュー', href: '/reviews', icon: Star },
  { name: '請求・支払', href: '/billing', icon: CreditCard },
  { name: '通知', href: '/notifications', icon: Bell },
  { name: 'お問い合わせ', href: '/contact', icon: Mail },
  { name: '設定', href: '/settings', icon: Settings },
];

// Sidebar navigation using Material UI components for consistent styling
export function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 256,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 256,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h1" fontWeight={600}>
          CleanApp Owner
        </Typography>
      </Box>
      <List sx={{ pt: 2 }}>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const IconComponent = item.icon;
          return (
            <ListItem key={item.name} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                component={Link}
                to={item.href}
                selected={isActive}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'inherit' : 'text.secondary' }}>
                  <IconComponent size={20} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
