"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { HOSTING_MAIN_TABS_LIST } from "./hosting-constants"
import { useAuth } from "../hooks/use-auth"

export const HostingMain = () => {
    const { firstName } = useAuth()
    return (
        <div className="space-y-8">
            <div className="font-semibold text-2xl lg:text-3xl">Welcome, {firstName}!</div>
            <Tabs defaultValue={HOSTING_MAIN_TABS_LIST.data[0]?.value} className="">
                <TabsList className='space-x-2 mb-6 w-full overflow-y-hidden'>
                    {
                        HOSTING_MAIN_TABS_LIST.data.map((tab, index) => {
                            return (
                                <TabsTrigger
                                    className="rounded-full font-light px-4 border-2 "
                                    key={index}
                                    value={tab.value}>
                                    {tab.name}
                                </TabsTrigger>
                            )
                        })
                    }
                </TabsList>
                {
                    HOSTING_MAIN_TABS_LIST.data.map((tab, index) => {
                        return (
                            <TabsContent key={index} value={tab.value}>{tab.content}</TabsContent>
                        )
                    })
                }
            </Tabs>
        </div >
    )
}
