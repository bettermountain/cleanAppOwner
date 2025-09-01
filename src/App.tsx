import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from '@/components/layout/sidebar';
import { useState } from 'react';
import { LoginPage } from '@/pages/login';
import { PropertiesPage } from '@/pages/properties';
import { PropertyNewPage } from '@/pages/property-new';
import { JobsPage } from '@/pages/jobs';
import { JobNewPage } from '@/pages/job-new';
import { JobDetailPage } from '@/pages/job-detail';
import { FavoriteStaffPage } from '@/pages/favorites';
import { ProgressPage } from '@/pages/progress';
import { BillingPage } from '@/pages/billing';
import { NotificationsPage } from '@/pages/notifications';
import { SettingsPage } from '@/pages/settings';
import { ContactPage } from '@/pages/contact';
import { DashboardPage } from '@/pages/dashboard';
import { ChatPage } from '@/pages/chat';

const drawerWidth = 256;

function App() {
  const isAuthenticated = localStorage.getItem('auth_token');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        drawerWidth={drawerWidth}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          ml: { sm: sidebarCollapsed ? '72px' : `${drawerWidth}px` },
        }}
      >
        {/* No header as requested */}
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', p: { xs: 2, sm: 3 } }}>
          <Routes>
            {/* Dashboard displayed at root path */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/new" element={<PropertyNewPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/new" element={<JobNewPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/favorites" element={<FavoriteStaffPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
