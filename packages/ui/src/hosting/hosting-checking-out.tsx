"use client"

import React, { useEffect, useState } from "react";
import { NoResults } from "../components/no-results"
import { CiCircleCheck } from "react-icons/ci";
import axios from "axios";
import { ApiResponse, Booking } from "@instapark/types";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/card";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { unixSecToMonthYearTime } from "../utils/dayjs";

export const HostingCheckingOut = () => {
  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    axios.get<ApiResponse<Booking[]>>(`http://localhost:8085/bookings/all?userId=d045f6ac-35c7-4cfa-afe9-91d5c3f9d7ce&status=complete`)
      .then(res => setData(res.data.data as Booking[]))
      .catch(error => toast.error(error.message))
  }, [])

  if (data.length === 0) {
    return (
      <NoResults
        text="You don't have any guests checking out today or tomorrow."
        icon={<CiCircleCheck className="w-10 h-10" />}
      />
    )
  }

  return (
    <div>
      {
        data.map(b => (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Start Date:</span>
                <span>{unixSecToMonthYearTime(b.startDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">End Date:</span>
                <span>{unixSecToMonthYearTime(b.endDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Status:</span>
                <Badge variant={b.status === "Completed" ? "default" : "secondary"}>{b.status}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={b.status === "Completed"}>
                {"Complete Trip"}
              </Button>
            </CardFooter>
          </Card>
        ))
      }
    </div>
  )
}
