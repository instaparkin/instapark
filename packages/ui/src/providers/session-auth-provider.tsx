"use client"

import React, { ReactNode } from 'react'
import { AuthProvider } from './auth-provider'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'

export const SessionAuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <AuthProvider>
        <SessionAuth>
          {children}
        </SessionAuth>
      </AuthProvider>
    </main>
  )
}
