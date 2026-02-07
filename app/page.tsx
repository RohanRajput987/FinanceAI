'use client'

import { useState } from 'react'
import AuthPage from '@/components/auth-page'
import DashboardPage from '@/components/dashboard-page'

export default function Page() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)

  if (!user) {
    return <AuthPage onAuth={setUser} />
  }

  return <DashboardPage user={user} onLogout={() => setUser(null)} />
}
