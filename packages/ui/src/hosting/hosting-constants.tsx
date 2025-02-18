import React from "react";
import { HostingCurrent } from "./hosting-current";
import { HostingPendingReview } from "./hosting-pending-review";
import { HostingCompleted } from "./hosting-completed";

export const HOSTING_MAIN_TABS_LIST = {
    data: [
        {
            name: "Current",
            value: "current",
            content: <HostingCurrent />
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