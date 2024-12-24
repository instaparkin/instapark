'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from "../components/progress"
import { Check } from 'lucide-react'
import { motion } from "framer-motion"

interface SuccessPageProps {
  timeout: number
  text: string
  redirectPath: string
}

export function Success({ timeout, text, redirectPath }: SuccessPageProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
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
  }, [router, timeout, redirectPath])

  return (
    <div className="flex flex-col rounded-lg items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
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
          className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-700 flex items-center justify-center mx-auto"
        >
          <Check className="w-16 h-16 text-green-600 dark:text-green-300" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Success!</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">{text}</p>
        <div className="w-64 mx-auto">
          <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700"/>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Redirecting in {Math.ceil((timeout - (progress / 100) * timeout) / 1000)} seconds...
        </p>
      </motion.div>
    </div>
  )
}

