import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"
import { Button } from "../components/button"
import { Card, CardContent, CardHeader } from "../components/card"
import { MoreVertical, Search } from "lucide-react"
import Image from "next/image"
import { Check, Download } from "lucide-react"

export function BookingHistory() {
    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg font-semibold">Booking History</h2>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead>No.</TableHead>
                                <TableHead>Check in</TableHead>
                                <TableHead>Check out</TableHead>
                                <TableHead>Guest</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>5500939</TableCell>
                                <TableCell>Wed, 22 Mar 2023</TableCell>
                                <TableCell>Deluxe</TableCell>
                                <TableCell>1139</TableCell>
                                <TableCell>Thu, 23 Mar 2023</TableCell>
                                <TableCell>Sat, 25 Mar 2023</TableCell>
                                <TableCell>2 Guests</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Search className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="default" className="bg-orange-600 hover:bg-orange-700">
                        Complete
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


export function BookingSummary() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Booking Summary</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Room Total (1 night)</span>
            <span>300.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Extra Person</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Extras</span>
            <span>30.00</span>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>330.00</span>
          </div>
          <div className="flex justify-between text-sm text-red-600">
            <span>Discount</span>
            <span>-33.00(10%)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Fixed Amount Taxes</span>
            <span>13.00</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-orange-600">320.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


export function BookingCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">Current Booking</h2>
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[5/3] overflow-hidden rounded-lg">
            <Image
              src="/image.png"
              alt="Room preview"
              fill
              className="object-cover border"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600">
                Deal end - 48:59
              </span>
            </div>
            <h3 className="text-xl font-semibold">Glenn Zimmerman</h3>
            <p className="text-sm text-muted-foreground">Order ID: #5555014</p>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Check in</p>
                  <p className="text-sm text-muted-foreground">Tue, 21 Mar 2023</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Check out</p>
                  <p className="text-sm text-muted-foreground">Thu, 23 mar 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

