'use client'

import React from 'react'
import { EarningsStats } from './earnings-stats'
import { EarningsTransactions } from './earnings-transactions'
import { useAuth } from '../hooks/use-auth'

export function uuidToAlphanumeric(uuid: string): string {
  if (!/^[0-9a-fA-F-]{36}$/.test(uuid)) throw new Error("Invalid UUID format");

  const hex = uuid.replace(/-/g, ""); // Remove hyphens
  const binary = String.fromCharCode(...hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // Base64 URL encoding
}

export const EarningsMain = () => {
  const { userId } = useAuth()

  /**
   * TODO:
   * 1. Pass the props from here with proper type definitions
   */
  console.log(userId);
  
  return (
    <div className='space-y-6'>
      <EarningsStats userId={userId} vendorId={uuidToAlphanumeric(userId)} />
      <h2 className='text-lg font-semibold'>Transactions</h2>
      <EarningsTransactions />
    </div>
  )
}
