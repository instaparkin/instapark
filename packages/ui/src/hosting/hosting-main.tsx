"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { Page, PageHeader } from '../components/page'
import { HOSTING_MAIN_TABS_LIST } from "./hosting-constants"
import { Button } from "../components/button"
import Link from "next/link"
import { useRedis } from "../hooks/use-redis"
import { useSessionContext } from "@instapark/auth"
import { LISTINGS_ADD_FORM_KEY } from "../utils/global-constants"

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
    return (
        <Page title="Hosting">
            <PageHeader>
                {
                    <CompleteListingButton />
                }
            </PageHeader>
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
        </Page>
    )
}
