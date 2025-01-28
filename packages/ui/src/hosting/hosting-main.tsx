"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { HOSTING_MAIN_TABS_LIST } from "./hosting-constants"
import { Button } from "../components/button"
import Link from "next/link"
import { useRedis } from "../hooks/use-redis"
import { LISTINGS_ADD_FORM_KEY } from "../utils/global-constants"
import { useSessionContext } from "supertokens-auth-react/recipe/session"
import { useAuth } from "../hooks/use-auth"
import { timeInInstapark, unixSecToMonthYearTime } from "../utils/dayjs"
import { MapsMain } from "../maps/maps-main"

export const CompleteListingButton = () => {
    const session = useSessionContext()
    if (session.loading)
        return null
    const { data, isLoading } = useRedis(session.userId, LISTINGS_ADD_FORM_KEY);
    if (data.value.formData && !isLoading) {
        return (
            <Button variant={"outline"} asChild>
                <Link href={"/hosting/listings/add"}>
                    Complete your listing
                </Link>
            </Button>
        );
    }
};

export const HostingMain = () => {
    const { first_name } = useAuth()

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="font-semibold text-lg md:text-xl lg:text-3xl">Welcome, {first_name}!</div>
                <CompleteListingButton />
            </div>
            <Tabs defaultValue={HOSTING_MAIN_TABS_LIST.data[0]?.value} className="w-full overflow-x-auto">
                <TabsList className='space-x-2 mb-6'>
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
