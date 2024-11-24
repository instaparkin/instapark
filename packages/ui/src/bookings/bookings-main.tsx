import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { BookingsPendingReview } from './bookings-pendings-review'
import { BookingsHosting } from './bookings-today'
import { BookingsCheckingOut } from './bookings-checking-out'
import { BookingsUpcoming } from './bookings-upcoming'
import { BookingsArrivingSoon } from './bookings-arriving-soon'
import { Page } from '../components/page'

export const BookingsMain = () => {
    const tabsData = {
        data: [
            {
                name: "Checking Out",
                value: "checking-out",
                content: <BookingsCheckingOut />
            },
            {
                name: "Hosting",
                value: "hosting",
                content: <BookingsHosting />
            },
            {
                name: "Arriving Soon",
                value: "arriving-soon",
                content: <BookingsArrivingSoon />
            },
            {
                name: "Upcoming",
                value: "upcoming",
                content: <BookingsUpcoming />
            },
            {
                name: "Pending Review",
                value: "pending-review",
                content: <BookingsPendingReview />
            },
        ]
    }
    return (
        <Page title="Bookings">
            <Tabs defaultValue={tabsData.data[0]?.name} className="w-full overflow-x-auto">
                <TabsList className='space-x-4'>
                    {
                        tabsData.data.map((tab, index) => {
                            return (
                                <TabsTrigger
                                    key={index}
                                    value={tab.value}>
                                    {tab.name}
                                </TabsTrigger>
                            )
                        })
                    }
                </TabsList>
                {
                    tabsData.data.map((tab, index) => {
                        return (
                            <TabsContent key={index} value={tab.value}>{tab.content}</TabsContent>
                        )
                    })
                }
            </Tabs>
        </Page>
    )
}
