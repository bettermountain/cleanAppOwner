import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { LoginPage } from '@/pages/login'
import { PropertiesPage } from '@/pages/properties'
import { JobsPage } from '@/pages/jobs'
import { JobDetailPage } from '@/pages/job-detail'
import { OffersPage } from '@/pages/offers'
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
    <div className="h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/properties" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
