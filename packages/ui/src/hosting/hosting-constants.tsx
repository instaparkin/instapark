import React from "react";
import { HostingArrivingSoon } from "./hosting-arriving-soon";
import { HostingCheckingOut } from "./hosting-checking-out";
import { HostingPendingReview } from "./hosting-pending-review";
import { HostingCurrent } from "./hosting-current";
import { HostingCompleted } from "./hosting-completed";

export const HOSTING_MAIN_TABS_LIST = {
    data: [
        {
            name: "Current",
            value: "current",
            content: <HostingCheckingOut />
        },
        {
            name: "Pending Review",
            value: "pending-review",
            content: <HostingPendingReview />
        },
        {
            name: "Completed",
            value: "completed",
            content: <HostingCompleted />
        },
    ]
}