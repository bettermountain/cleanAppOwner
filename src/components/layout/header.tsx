
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import { Bell, Search, User } from 'lucide-react'

// Responsive application header built with Material UI for a clean UX
export function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {/* Toolbar arranges content horizontally and provides proper spacing */}
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Search input with icon adornment */}
        <TextField
          placeholder="検索..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* Lucide icon keeps visual consistency with rest of app */}
                <Search size={18} />
              </InputAdornment>
            ),
          }}
          sx={{ width: '100%', maxWidth: 400, backgroundColor: 'background.paper', borderRadius: 1 }}
        />

        {/* Action buttons on the right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notification bell with badge indicating unread count */}
          <Tooltip title="通知">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Avatar represents current user; tooltip clarifies action */}
          <Tooltip title="プロフィール">
            <IconButton color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
