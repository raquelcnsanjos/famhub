'use client'

import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Avatar } from '@mui/material'
import { Notifications as NotificationsIcon } from '@mui/icons-material'

export default function AppHeader({ title, onNotificationClick, notificationCount = 0, user }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#6366f1',
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ minHeight: '56px !important', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={onNotificationClick} size="small">
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {user && (
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '16px',
                bgcolor: 'rgba(255,255,255,0.2)',
              }}
            >
              {user.avatar}
            </Avatar>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
