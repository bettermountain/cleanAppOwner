import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { LoginPage } from '@/pages/login'
import { PropertiesPage } from '@/pages/properties'
import { JobsPage } from '@/pages/jobs'
import { JobDetailPage } from '@/pages/job-detail'
import { FavoriteStaffPage } from '@/pages/favorites'
import { ProgressPage } from '@/pages/progress'
import { ReviewsPage } from '@/pages/reviews'
import { BillingPage } from '@/pages/billing'
import { NotificationsPage } from '@/pages/notifications'
import { SettingsPage } from '@/pages/settings'

function App() {
  const isAuthenticated = localStorage.getItem('auth_token')

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/properties" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/favorites" element={<FavoriteStaffPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

export default App
