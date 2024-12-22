import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { Page } from '../components/page'
import { HOSTING_MAIN_TABS_LIST } from "./hosting-constants"

export const HostingMain = () => {
    return (
        <Page title="Hosting">
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
