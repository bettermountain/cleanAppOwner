import { AppBar, Toolbar, TextField, IconButton, Badge, Box } from '@mui/material'
import { Search, Bell, User } from 'lucide-react'

export function Header() {
  return (
    <AppBar 
      position="static" 
      color="inherit" 
      elevation={1}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ maxWidth: 400, width: '100%' }}>
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
