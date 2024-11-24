import { NotificationIcon } from "../components/notification-icon"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"

export function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger>
                <NotificationIcon hasNotifications={true} />
            </PopoverTrigger>
            <PopoverContent className="h-[400px] overflow-y-auto">
                <Tabs defaultValue="messages">
                    <TabsList className="space-x-2">
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                        <TabsTrigger  value="inbox">inbox</TabsTrigger>
                    </TabsList>
                    <TabsContent value="messages">Make changes to your account here.</TabsContent>
                    <TabsContent value="inbox">Change your inbox here.</TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}