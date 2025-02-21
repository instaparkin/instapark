import React from 'react'
import { ModeToggle } from '../components/mode-toggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"

export const SettingsMain = () => {
  return (
    <Tabs defaultValue="account" className="border grid grid-cols-2">
      <TabsList className='flex flex-col'>
        <ModeToggle />
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent className='border' value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}
