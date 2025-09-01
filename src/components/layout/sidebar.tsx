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
  IconButton,
  Tooltip,
  useMediaQuery,
  type Theme,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material'
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
  MessageCircle,
} from 'lucide-react';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: Home },
  { name: '物件管理', href: '/properties', icon: Building2 },
  { name: '依頼管理', href: '/jobs', icon: Briefcase },
  { name: 'チャット', href: '/chat', icon: MessageCircle },
  { name: 'お気に入りスタッフ', href: '/favorites', icon: Heart },
  { name: '進捗モニター', href: '/progress', icon: Activity },
  { name: '請求・支払', href: '/billing', icon: CreditCard },
  { name: '通知', href: '/notifications', icon: Bell },
  { name: 'お問い合わせ', href: '/contact', icon: Mail },
  { name: '設定', href: '/settings', icon: Settings },
];

type SidebarProps = {
  mobileOpen: boolean
  onClose: () => void
  drawerWidth?: number
  collapsed?: boolean
  onToggleCollapse?: () => void
}

// Sidebar navigation using Material UI components for consistent styling
export function Sidebar({ mobileOpen, onClose, drawerWidth = 256, collapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const drawerContent = (
    <>
      <Box sx={{ px: 1.5, py: 1, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Collapse/expand (desktop only) */}
          <Tooltip title={collapsed ? '展開' : '折りたたみ'} placement="right" disableInteractive>
            <span>
              <IconButton size="small" onClick={onToggleCollapse} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
              </IconButton>
            </span>
          </Tooltip>
          {!collapsed && (
            <Typography variant="h6" component="h1" fontWeight={600} sx={{ ml: 0.5 }}>
              CleanApp Owner
            </Typography>
          )}
        </Box>
        {/* Close (mobile only) */}
        <IconButton size="small" onClick={onClose} sx={{ display: { xs: 'inline-flex', sm: 'none' } }} aria-label="close navigation">
          <Close fontSize="small" />
        </IconButton>
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
                onClick={!isDesktop ? onClose : undefined}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'inherit' : 'text.secondary', minWidth: collapsed ? 0 : 40 }}>
                  <IconComponent size={20} />
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ display: collapsed ? 'none' : 'block' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <>
      {/* Mobile: temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop: permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: collapsed ? 72 : drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
