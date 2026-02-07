'use client'

import React from "react"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, TrendingUp } from 'lucide-react'

interface AuthPageProps {
  onAuth: (user: { id: string; email: string }) => void
}

export default function AuthPage({ onAuth }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate auth with localStorage
    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    // Simple mock authentication
    setTimeout(() => {
      const userId = `user-${Date.now()}`
      onAuth({ id: userId, email })
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">FinanceAI</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Turn financial PDFs into actionable insights</p>
        </div>

        {/* Auth Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>{isLogin ? 'Sign In' : 'Create Account'}</CardTitle>
            <CardDescription>
              {isLogin ? 'Access your financial documents' : 'Get started with financial analysis'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-950 text-slate-500">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              disabled={isLoading}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: '📊', label: 'Charts' },
            { icon: '🤖', label: 'AI Analysis' },
            { icon: '💾', label: 'History' },
          ].map((feature) => (
            <div key={feature.label} className="text-center">
              <div className="text-2xl mb-1">{feature.icon}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
