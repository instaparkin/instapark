import React, { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/card'

interface SearchFilterProps {
  title: string
  children: ReactNode
}

export const SearchFilter = ({ title, children }: SearchFilterProps) => {
  return (
    <div className="p-4">
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

