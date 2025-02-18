import React from 'react'
import { ProfilePersonalInfo } from './profile-personal-info'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { CreateVendor } from '../vendor/create-vendor'

const PROFILE_MAIN_CONSTANTS = [
    { name: "Profile", component: <ProfilePersonalInfo /> },
    { name: "Payments", component: <CreateVendor /> }
]

export const ProfileMain = () => {
    return (
        <Tabs defaultValue={PROFILE_MAIN_CONSTANTS[0]?.name}>
        <TabsList className='w-full mx-auto mb-6 space-x-4'>
                {
                    PROFILE_MAIN_CONSTANTS.map((c, i) => (
                        <TabsTrigger key={i} value={c.name}>{c.name}</TabsTrigger>
                    ))
                }
            </TabsList>
            {
                PROFILE_MAIN_CONSTANTS.map((c, i) => (
                    <TabsContent key={i} value={c.name}>
                        {c.component}
                    </TabsContent>
                ))
            }
        </Tabs>
    )
}
