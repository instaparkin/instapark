"use client";

import { signOut, useSessionContext } from '@instapark/auth';
import { Button } from '@instapark/ui/src/components/button';
import React from 'react'

const NotificationsPage = () => {
  const sessionContext = useSessionContext();

  if (sessionContext.loading === true) return null;

  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
      {sessionContext.userId}
    </div>
  )
}

export default NotificationsPage