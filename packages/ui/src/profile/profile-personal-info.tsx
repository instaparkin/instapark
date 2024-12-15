"use client"

import React from 'react'
import { Page } from '../components/page'
import { useSessionContext } from '@instapark/auth'
import { Skeleton } from '../components/skeleton'

export const ProfilePersonalInfo = () => {
  const session = useSessionContext();

  if (session.loading) {
    return (
      <Skeleton className='w-5 h-5' />
    )
  }
  return (
    <Page>
      {JSON.stringify(session.accessTokenPayload)}
    </Page>
  )
}
