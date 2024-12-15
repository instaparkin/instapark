'use client'

import { useEffect, useState, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { nanoid } from "nanoid"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import { ScrollArea } from "../components/scroll-area"
import { Avatar, AvatarFallback } from "../components/avatar"
import { Send, UserPlus } from 'lucide-react'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  status: "sent" | "delivered" | "seen"
}

export function ChatMain() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [userId, setUserId] = useState("")
  const [receiverId, setReceiverId] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const socketInstance = io("http://localhost:8084", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      timeout: 10000,
    })

    setSocket(socketInstance)

    socketInstance.on("connection_request", (senderId) => {
      if (window.confirm(`User ${senderId} wants to connect. Accept?`)) {
        console.log(`Connected with ${senderId}`)
        setIsConnected(true)
      }
    })

    socketInstance.on("MESSAGE", ({ sender, message }: { sender: string; message: string }) => {
      const timestamp = new Date().toLocaleTimeString()
      setMessages((prev) => [...prev, { id: nanoid(), sender, content: message, timestamp, status: "delivered" }])
    })

    socketInstance.on("MESSAGE_STATUS", ({ id, status }: { id: string; status: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: status as "sent" | "delivered" | "seen" } : msg
        )
      )
    })

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleRegister = () => {
    if (socket && userId.trim()) {
      socket.emit("REGISTER", userId)
    }
  }

  const handleConnect = () => {
    if (socket && receiverId.trim()) {
      socket.emit("CONNECT_WITH_USER", receiverId)
      setIsConnected(true)
    }
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim() && socket) {
      const messageId = nanoid() // Generate unique ID for the message
      const timestamp = new Date().toLocaleTimeString()

      const newMsg = {
        id: messageId,
        sender: userId,
        content: newMessage,
        timestamp,
        status: "sent",
      }

      setMessages((prev) => [...prev, newMsg])

      socket.emit("MESSAGE", {
        id: messageId,
        receiver: receiverId,
        message: newMessage,
      })

      setNewMessage("")
    }
  }
  return (
    <div className="mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Connect with User</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row items-center">
          <div className="flex gap-2 w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button onClick={handleRegister} variant="secondary">
              Register
            </Button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Receiver ID"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
            />
            <Button onClick={handleConnect} disabled={isConnected}>
              <UserPlus className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="relative">
              <Avatar>
                <AvatarFallback>{receiverId.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>
            {receiverId || 'Chat'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <ScrollArea className="flex-1" ref={scrollRef}>
            <div className="space-y-4 p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${msg.sender === userId
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                      }`}
                  >
                    <p className="break-words">{msg.content}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
                      <span>{msg.timestamp}</span>
                      {msg.sender === userId && (
                        <div className="flex items-center gap-1">
                          {msg.status === "sent" && <SingleTick />}
                          {msg.status === "delivered" && <DoubleTick />}
                          {msg.status === "seen" && <BlueDoubleTick />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form onSubmit={sendMessage} className="flex gap-2 p-4 border-t">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!isConnected}>
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

const SingleTick = () => <span className="text-gray-500">✔</span>
const DoubleTick = () => <span className="text-gray-500">✔✔</span>
const BlueDoubleTick = () => <span className="text-blue-500">✔✔</span>
