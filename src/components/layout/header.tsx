import { AppBar, Toolbar, TextField, IconButton, Badge, Box } from '@mui/material'
import { Search, Bell, User, Menu } from 'lucide-react'

type HeaderProps = {
  onMenuClick?: () => void
  onToggleSidebar?: () => void
}

// Responsive application header built with Material UI for a clean UX
export function Header({ onMenuClick, onToggleSidebar }: HeaderProps) {
  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      elevation={1}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }}>
        {/* Mobile: open temporary drawer */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton color="inherit" onClick={onMenuClick} aria-label="open navigation">
            <Menu size={20} />
          </IconButton>
        </Box>

        {/* Desktop: collapse/expand sidebar */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <IconButton color="inherit" onClick={onToggleSidebar} aria-label="toggle sidebar">
            <Menu size={20} />
          </IconButton>
        </Box>

        <Box sx={{ maxWidth: { xs: 220, sm: 400 }, width: '100%' }}>
          <TextField
            size="small"
            placeholder="検索..."
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <Search size={16} style={{ marginRight: 8, color: '#757575' }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.default',
              },
              display: { xs: 'none', sm: 'block' }
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Bell size={20} />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit">
            <User size={20} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
