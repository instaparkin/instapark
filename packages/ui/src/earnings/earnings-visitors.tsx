"use client";
import React, { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/chart";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { formatPrice } from "../utils/field-name";

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

// Sample Booking Data (Replace with API data)
const rawData = [
  { totalPrice: 3081, updatedAt: 1740079197, status: "Completed" },
  { totalPrice: 2200, updatedAt: 1740165600, status: "Pending" },
  { totalPrice: 4500, updatedAt: 1740252000, status: "Completed" },
  { totalPrice: 5000, updatedAt: 1742803200, status: "Completed" }, // Next month
  { totalPrice: 3500, updatedAt: 1751328000, status: "Completed" }, // Next year
];

// Chart Config (Matching Your Style)
const chartConfig = {
  totalPrice: {
    label: "Total Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Function to group data by Week, Month, or Year
const groupDataByTimeframe = (data: any[], view: string) => {
  const groupedData: Record<string, number> = {};

  data.forEach((item) => {
    const date = dayjs.unix(item.updatedAt); // Convert Unix timestamp to Day.js object
    let key: string;

    if (view === "week") key = `Week ${date.week()} - ${date.year()}`;
    else if (view === "month") key = date.format("MMM YYYY");
    else key = date.format("YYYY"); // Yearly view

    if (!groupedData[key]) groupedData[key] = 0;
    groupedData[key] += item.totalPrice;
  });

  return Object.keys(groupedData).map((key) => ({
    date: key,
    totalPrice: groupedData[key],
  }));
};

export function EarningsVisitors() {
  const [view, setView] = useState("month"); // Default view

  const chartData = useMemo(() => {
    const filteredData = rawData.filter((item) => item.status === "Completed");
    return groupDataByTimeframe(filteredData, view);
  }, [view]);

  return (
    <Card className="my-6">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-sm">Total Revenue</CardTitle>
        <div className="md:hidden lg:block">
          <div className="text-2xl font-bold">{formatPrice(100)}</div>
          <p className="text-xs text-muted-foreground mt-1">{"Total money you made on instapark"}</p>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} width={600} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="totalPrice"
              type="monotone"
              fill={chartConfig.totalPrice.color}
              stroke={chartConfig.totalPrice.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
