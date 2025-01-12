import React from "react";
import { HostingArrivingSoon } from "./hosting-arriving-soon";
import { HostingCheckingOut } from "./hosting-checking-out";
import { HostingPendingReview } from "./hosting-pending-review";
import { HostingCurrent } from "./hosting-current";
import { HostingUpcoming } from "./hosting-upcoming";

export const HOSTING_MAIN_TABS_LIST = {
    data: [
        {
            name: "Checking Out",
            value: "checking-out",
            content: <HostingCheckingOut />
        },
        {
            name: "Current",
            value: "current",
            content: <HostingCurrent />
        },
        {
            name: "Arriving Soon",
            value: "arriving-soon",
            content: <HostingArrivingSoon />
        },
        {
            name: "Upcoming",
            value: "upcoming",
            content: <HostingUpcoming />
        },
        {
            name: "Pending Review",
            value: "pending-review",
            content: <HostingPendingReview />
        },
    ]
}