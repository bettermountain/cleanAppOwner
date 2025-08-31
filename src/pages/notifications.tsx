import React, { useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  AccessTime,
  Cancel,
  CheckCircle,
  Delete,
  DoneAll,
  FilterList,
  Group,
  Payment,
  ReceiptLong,
  Star,
  ExpandMore,
} from '@mui/icons-material';
import { mockNotifications } from '@/data/notifications';
import { PageContainer } from '@/components/layout/page-container';
import type { Notification } from '@/schemas';

/**
 * オーナー向け通知一覧ページ
 * MUIコンポーネントを用いてシンプルで直感的なUIを構築します。
 */
export function NotificationsPage() {
  // 状態管理
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filterType, setFilterType] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // フィルタリングされた通知一覧
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const typeMatch = filterType === 'all' || notification.type === filterType;
      const readMatch = !showUnreadOnly || !notification.readAt;
      return typeMatch && readMatch;
    });
  }, [notifications, filterType, showUnreadOnly]);

  // 統計情報
  const stats = useMemo(() => {
    const unreadCount = notifications.filter((n) => !n.readAt).length;
    const applicationCount = notifications.filter((n) => n.type === 'job_application').length;
    const submittedCount = notifications.filter((n) => n.type === 'job_submitted').length;
    const paymentCount = notifications.filter((n) => 
      ['invoice_issued', 'payment_received'].includes(n.type)
    ).length;
    
    return { unreadCount, applicationCount, submittedCount, paymentCount };
  }, [notifications]);

  /**
   * 通知を既読にする
   */
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, readAt: new Date().toISOString() }
          : notification
      )
    );
    showSnackbar('通知を既読にしました');
  };

  /**
   * すべての通知を既読にする
   */
  const markAllAsRead = () => {
    const now = new Date().toISOString();
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, readAt: now }))
    );
    showSnackbar('すべての通知を既読にしました');
  };

  /**
   * 通知を削除する
   */
  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    showSnackbar('通知を削除しました');
  };

  /**
   * スナックバーを表示
   */
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  /**
   * フィルターメニューを開く
   */
  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  /**
   * フィルターメニューを閉じる
   */
  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  /**
   * フィルタータイプを設定
   */
  const handleFilterChange = (type: string) => {
    setFilterType(type);
    handleFilterMenuClose();
  };

  /**
   * 通知タイプごとのアイコンを返すヘルパー
   */
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'job_application':
        return <Group fontSize="small" />;
      case 'job_submitted':
        return <CheckCircle fontSize="small" />;
      case 'job_started':
        return <AccessTime fontSize="small" />;
      case 'invoice_issued':
        return <ReceiptLong fontSize="small" />;
      case 'job_rework_requested':
        return <Cancel fontSize="small" />;
      case 'payment_received':
        return <Payment fontSize="small" />;
      case 'job_cancelled':
        return <Cancel fontSize="small" />;
      case 'worker_rating':
        return <Star fontSize="small" />;
      case 'offer_accepted':
        return <CheckCircle fontSize="small" />;
      default:
        return <AccessTime fontSize="small" />;
    }
  };

  /**
   * 通知タイプに応じたアバター背景色を返す
   */
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'job_application':
        return 'success.main';
      case 'job_submitted':
        return 'info.main';
      case 'job_started':
        return 'warning.main';
      case 'invoice_issued':
        return 'secondary.main';
      case 'job_rework_requested':
        return 'error.main';
      case 'payment_received':
        return 'success.dark';
      case 'job_cancelled':
        return 'error.main';
      case 'worker_rating':
        return 'warning.dark';
      case 'offer_accepted':
        return 'success.main';
      default:
        return 'grey.500';
    }
  };

  /**
   * 通知タイプの日本語名を取得
   */
  const getNotificationTypeName = (type: Notification['type']) => {
    switch (type) {
      case 'job_application':
        return '応募通知';
      case 'job_submitted':
        return '作業完了';
      case 'job_started':
        return '作業開始';
      case 'invoice_issued':
        return '請求書発行';
      case 'job_rework_requested':
        return '再作業依頼';
      case 'payment_received':
        return '支払い受領';
      case 'job_cancelled':
        return 'キャンセル';
      case 'worker_rating':
        return '評価依頼';
      case 'offer_accepted':
        return 'オファー承諾';
      default:
        return 'その他';
    }
  };

  /**
   * 相対時間表示を生成（例: "3分前"）
   */
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return '今';
    if (diffInMinutes < 60) return `${diffInMinutes}分前`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`;
    return `${Math.floor(diffInMinutes / 1440)}日前`;
  };

  // フィルターオプション
  const filterOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'job_application', label: '応募通知' },
    { value: 'job_submitted', label: '作業完了' },
    { value: 'job_started', label: '作業開始' },
    { value: 'invoice_issued', label: '請求書発行' },
    { value: 'payment_received', label: '支払い受領' },
    { value: 'worker_rating', label: '評価依頼' },
  ];

  return (
    <PageContainer>
      {/* ===== Header with actions ===== */}
      <Box display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={3}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            通知
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              {stats.unreadCount > 0
                ? `${stats.unreadCount}件の未読通知があります`
                : 'すべての通知を確認済みです'}
            </Typography>
            {showUnreadOnly && (
              <Chip 
                label="未読のみ" 
                size="small" 
                color="primary" 
                onDelete={() => setShowUnreadOnly(false)}
              />
            )}
            {filterType !== 'all' && (
              <Chip 
                label={getNotificationTypeName(filterType as Notification['type'])} 
                size="small" 
                color="secondary" 
                onDelete={() => setFilterType('all')}
              />
            )}
          </Box>
        </Box>
        <Box display="flex" gap={1} flexWrap="wrap" width={{ xs: '100%', sm: 'auto' }} justifyContent={{ xs: 'flex-end', sm: 'flex-start' }}>
          <Button 
            variant="outlined" 
            startIcon={<FilterList />}
            endIcon={<ExpandMore />}
            onClick={handleFilterMenuOpen}
          >
            フィルター
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<DoneAll />}
            onClick={markAllAsRead}
            disabled={stats.unreadCount === 0}
          >
            すべて既読
          </Button>
        </Box>
      </Box>

      {/* フィルターメニュー */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={handleFilterMenuClose}
      >
        {filterOptions.map((option) => (
          <MenuItem 
            key={option.value}
            onClick={() => handleFilterChange(option.value)}
            selected={filterType === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
        <MenuItem divider />
        <MenuItem onClick={() => setShowUnreadOnly(!showUnreadOnly)}>
          <CheckCircle fontSize="small" sx={{ mr: 1, opacity: showUnreadOnly ? 1 : 0.3 }} />
          未読のみ表示
        </MenuItem>
      </Menu>

      {/* ===== Summary cards ===== */}
      <Box mb={3}>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={3}>
          <Paper
            sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box>
              <Typography variant="subtitle2" color="primary">
                未読
              </Typography>
              <Typography variant="h5">{stats.unreadCount}</Typography>
            </Box>
            <AccessTime color="primary" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper
            sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box>
              <Typography variant="subtitle2" color="success">
                応募通知
              </Typography>
              <Typography variant="h5">{stats.applicationCount}</Typography>
            </Box>
            <Group color="success" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper
            sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box>
              <Typography variant="subtitle2" color="info">
                作業完了
              </Typography>
              <Typography variant="h5">{stats.submittedCount}</Typography>
            </Box>
            <CheckCircle color="info" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper
            sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box>
              <Typography variant="subtitle2" color="secondary">
                請求・支払
              </Typography>
              <Typography variant="h5">{stats.paymentCount}</Typography>
            </Box>
            <Payment color="secondary" />
          </Paper>
        </Grid>
      </Grid>
      </Box>

      {/* ===== Notification list ===== */}
      {filteredNotifications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle color="disabled" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            表示する通知がありません
          </Typography>
          <Typography variant="body2" color="text.secondary">
            フィルター条件を変更してください
          </Typography>
        </Paper>
      ) : (
        <List sx={{ width: '100%' }}>
          {filteredNotifications.map((notification) => (
            <Paper
              key={notification.id}
              sx={{
                mb: 2,
                bgcolor: notification.readAt ? 'background.paper' : 'action.hover',
                border: notification.readAt ? 'none' : '2px solid',
                borderColor: notification.readAt ? 'transparent' : 'primary.light',
              }}
            >
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <Box display="flex" gap={0.5}>
                    {!notification.readAt && (
                      <Tooltip title="既読にする">
                        <IconButton 
                          edge="end" 
                          size="small" 
                          color="primary"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="削除">
                      <IconButton 
                        edge="end" 
                        size="small" 
                        color="error"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getNotificationColor(notification.type) }}>
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1" fontWeight={notification.readAt ? 400 : 600}>
                        {notification.title}
                      </Typography>
                      {!notification.readAt && (
                        <Chip label="未読" size="small" color="primary" variant="outlined" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box component="span" sx={{ display: 'block', mt: 1 }}>
                      {/* 通知タイプごとの詳細メッセージ */}
                      {notification.type === 'job_application' && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{notification.payload.workerName}</strong>
                          さんが<strong>{notification.payload.propertyName}</strong>
                          の清掃案件に応募しました。
                        </Typography>
                      )}
                      {notification.type === 'job_submitted' && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{notification.payload.workerName}</strong>
                          さんが<strong>{notification.payload.propertyName}</strong>
                          の清掃を完了し、写真を提出しました。
                        </Typography>
                      )}
                      {notification.type === 'job_started' && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{notification.payload.workerName}</strong>
                          さんが<strong>{notification.payload.propertyName}</strong>
                          の清掃作業を開始しました。
                        </Typography>
                      )}
                      {notification.type === 'invoice_issued' && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{notification.payload.period}</strong>
                          の請求書が発行されました。支払期限:
                          {notification.payload.dueDate
                            ? new Date(notification.payload.dueDate).toLocaleDateString('ja-JP')
                            : '未定'}
                        </Typography>
                      )}
                      {notification.type === 'job_rework_requested' && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{notification.payload.propertyName}</strong>
                          の清掃について再作業が必要です。理由: {notification.payload.reason}
                        </Typography>
                      )}
                      {notification.type === 'payment_received' && (
                        <Typography variant="body2" color="text.secondary">
                          請求書の支払い（¥{notification.payload.amount?.toLocaleString()}
                          ）を受領しました。
                        </Typography>
                      )}
                      {notification.type === 'worker_rating' && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{notification.payload.workerName}</strong>
                          さんの作業評価をお願いします。
                        </Typography>
                      )}
                      {notification.type === 'offer_accepted' && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{notification.payload.workerName}</strong>
                          さんが<strong>{notification.payload.propertyName}</strong>
                          のオファーを承諾しました。
                        </Typography>
                      )}
                      {notification.type === 'job_cancelled' && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{notification.payload.propertyName}</strong>
                          の清掃案件がキャンセルされました。
                        </Typography>
                      )}
                      {/* 相対時間表示 */}
                      <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                        <AccessTime fontSize="inherit" color="disabled" />
                        <Typography variant="caption" color="text.secondary">
                          {formatTimeAgo(notification.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}

      {/* ===== End of list message ===== */}
      {filteredNotifications.length > 0 && (
        <Box textAlign="center" py={4}>
          <CheckCircle color="disabled" sx={{ fontSize: 40, mb: 2 }} />
          <Typography color="text.secondary">すべての通知を表示しました</Typography>
        </Box>
      )}

      {/* スナックバー */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
