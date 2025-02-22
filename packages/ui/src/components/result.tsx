'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from "./progress"
import { Check, X, Loader } from 'lucide-react'
import { motion } from "framer-motion"
import { ApiResponse } from '@instapark/types'

interface EventHandlerProps<T> {
  response?: ApiResponse<T> | string
  timeout?: number
  redirectPath?: string
  customContent?: React.ReactNode
}

export function Result<T>({
  response,
  timeout = 3000,
  redirectPath,
  customContent
}: EventHandlerProps<T>) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (redirectPath) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval)
            router.push(redirectPath)
            return 100
          }
          const newProgress = oldProgress + 100 / (timeout / 100)
          return Math.min(newProgress, 100)
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [router, timeout, redirectPath])

  const renderIcon = () => {
    switch (response?.status) {
      case "SUCCESS":
        return <Check className="w-16 h-16 text-green-600 dark:text-green-300" />
      case "FAILURE":
        return <X className="w-16 h-16 text-red-600 dark:text-red-300" />
      case "LOADING":
        return <Loader className="w-16 h-16 text-blue-600 dark:text-blue-300 animate-spin" />
      default:
        return null
    }
  }

  const getBackgroundColor = () => {
    switch (response?.status) {
      case "SUCCESS":
        return 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800'
      case "FAILURE":
        return 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800'
      case "LOADING":
        return 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800'
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
    }
  }

  const getIconBackgroundColor = () => {
    switch (response?.status) {
      case "SUCCESS":
        return 'bg-green-100 dark:bg-green-700'
      case "FAILURE":
        return 'bg-red-100 dark:bg-red-700'
      case "LOADING":
        return 'bg-blue-100 dark:bg-blue-700'
      default:
        return 'bg-gray-100 dark:bg-gray-700'
    }
  }

  return (
    <div className={`flex flex-col rounded-lg items-center justify-center min-h-screen bg-gradient-to-br ${getBackgroundColor()}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
          className={`w-24 h-24 rounded-full ${getIconBackgroundColor()} flex items-center justify-center mx-auto`}
        >
          {renderIcon()}
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          {response?.status === "LOADING" ? 'Loading...' : response?.status}
        </h1>
        {response && (
          <p className="text-xl text-gray-600 dark:text-gray-300">{response.message}</p>
        )}
        {customContent && (
          <div className="text-gray-600 dark:text-gray-300">{customContent}</div>
        )}
        {redirectPath && (
          <>
            <div className="w-64 mx-auto">
              <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting in {Math.ceil((timeout - (progress / 100) * timeout) / 1000)} seconds...
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}

