import { useMemo, useRef, useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  IconButton,
  InputAdornment,
  Chip,
  Divider,
  useMediaQuery,
  type Theme,
  Button,
} from '@mui/material'
import { Send as SendIcon, Search as SearchIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { mockChatThreads, type ChatThread, type ChatMessage } from '@/data/chats'
// No PageContainer: full-bleed layout for desktop

export function ChatPage() {
  const [threads, setThreads] = useState<ChatThread[]>(mockChatThreads)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(threads[0]?.id ?? null)
  const isMobile = useMediaQuery((t: Theme) => t.breakpoints.down('sm'))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return threads
    return threads.filter(t =>
      t.workerName.toLowerCase().includes(q) ||
      t.messages.some(m => m.content.toLowerCase().includes(q))
    )
  }, [threads, query])

  const selected = useMemo(() => threads.find(t => t.id === selectedId) || null, [threads, selectedId])

  const setRead = (threadId: string) => {
    setThreads(prev => prev.map(t => {
      if (t.id !== threadId) return t
      const updated = t.messages.map(m => ({ ...m, read: true }))
      return { ...t, messages: updated, unreadCount: 0 }
    }))
  }

  useEffect(() => {
    if (selected) setRead(selected.id)
  }, [selectedId])

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} px={{ xs: 0, sm: 1 }}>
        <Typography variant="h4" fontWeight={700}>チャット</Typography>
        {isMobile && selected && (
          <Button startIcon={<ArrowBackIcon />} onClick={() => setSelectedId(null)}>スレッド一覧</Button>
        )}
      </Box>
      <Box sx={{
        flex: 1,
        minHeight: 0,
        borderTop: 1,
        borderColor: 'divider',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'clamp(260px, 24vw, 360px) 1fr' },
      }}>
          {/* Threads list */}
          <Box sx={{ display: isMobile && selected ? 'none' : 'block', height: '100%', borderRight: { sm: 1, xs: 0 }, borderColor: 'divider' }}>
            <Box sx={{ p: 1 }}>
              <TextField
                fullWidth size="small" placeholder="ワーカー名・メッセージ検索"
                value={query} onChange={(e) => setQuery(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
              />
            </Box>
            <Divider />
            <List sx={{ height: { xs: 360, sm: 'calc(100% - 57px)' }, overflowY: 'auto' }}>
              {filtered.map(t => (
                <ListItem
                  key={t.id}
                  button
                  selected={t.id === selectedId}
                  onClick={() => setSelectedId(t.id)}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar src={t.workerAvatar}>{t.workerName.at(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography fontWeight={700}>{t.workerName}</Typography>
                        <UnreadBadge count={t.unreadCount || 0} />
                      </Box>
                    }
                     secondary={
                       <Typography variant="body2" color="text.secondary" noWrap>
                         {t.messages[t.messages.length - 1]?.content}
                       </Typography>
                     }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Conversation */}
          <Box sx={{ borderLeft: { sm: 1, xs: 0 }, borderColor: 'divider', display: isMobile && !selected ? 'none' : 'block', height: '100%' }}>
            {selected ? (
              <Conversation
                thread={selected}
                onSend={(content) => {
                  const message: ChatMessage = {
                    id: `local-${Date.now()}`,
                    threadId: selected.id,
                    sender: 'owner',
                    content,
                    createdAt: new Date().toISOString(),
                    read: true,
                  }
                  setThreads(prev => prev.map(t => t.id === selected.id
                    ? { ...t, messages: [...t.messages, message], lastMessageAt: message.createdAt }
                    : t
                  ))
                }}
              />
            ) : (
              <Box minHeight={360} display="flex" alignItems="center" justifyContent="center" color="text.secondary">
                スレッドを選択してください
              </Box>
            )}
          </Box>
        </Box>
    </Box>
  )
}

function Conversation({ thread, onSend }: { thread: ChatThread, onSend: (content: string) => void }) {
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread.messages.length])

  const handleSend = () => {
    const value = text.trim()
    if (!value) return
    onSend(value)
    setText('')
  }

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1, position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.paper' }}>
        <Avatar src={thread.workerAvatar} />
        <Box>
          <Typography fontWeight={700}>{thread.workerName}</Typography>
          <Typography variant="caption" color="text.secondary">会話を開始・ファイルや写真も共有可能</Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, overflowY: 'auto', background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0))' }}>
        {renderMessagesWithDates(thread.messages)}
        <div ref={bottomRef} />
      </Box>
      <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider', pb: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}>
        <TextField
          fullWidth
          placeholder="メッセージを入力..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          multiline
          minRows={1}
          maxRows={4}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary" onClick={handleSend} disabled={!text.trim()}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isMine = message.sender === 'owner'
  return (
    <Box display="flex" justifyContent={isMine ? 'flex-end' : 'flex-start'} mb={1.25}>
      <Box
        sx={{
          px: 1.5, py: 1,
          maxWidth: { xs: '85%', sm: '75%', md: '820px' },
          bgcolor: isMine ? 'primary.main' : 'grey.100',
          color: isMine ? 'primary.contrastText' : 'text.primary',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{message.content}</Typography>
        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
          {new Date(message.createdAt).toLocaleString('ja-JP')}
        </Typography>
      </Box>
    </Box>
  )
}

// Render messages with date separators for better readability
function renderMessagesWithDates(messages: ChatMessage[]) {
  const nodes: JSX.Element[] = []
  let lastDate = ''
  for (const m of messages) {
    const d = new Date(m.createdAt)
    const dateKey = d.toISOString().slice(0, 10)
    if (dateKey !== lastDate) {
      lastDate = dateKey
      nodes.push(
        <Box key={`sep-${dateKey}`} display="flex" justifyContent="center" my={1.5}>
          <Chip size="small" label={d.toLocaleDateString('ja-JP')} variant="outlined" />
        </Box>
      )
    }
    nodes.push(<MessageBubble key={m.id} message={m} />)
  }
  return nodes
}

export default ChatPage

function UnreadBadge({ count }: { count: number }) {
  if (!count) return null
  const label = count > 9 ? '9+' : String(count)
  return (
    <Box
      component="span"
      sx={{
        width: 18,
        height: 18,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        bgcolor: 'error.main',
        color: 'primary.contrastText',
        fontSize: 11,
        lineHeight: '18px',
        fontWeight: 700,
        flex: '0 0 auto',
      }}
    >
      {label}
    </Box>
  )
}
