"use client"

import React from "react"
import { Bar, BarChart } from "recharts"
import { Slider } from "../components/slider"
import { ChartContainer } from "../components/chart"
import { SearchFilter } from "./search-filter"
import { formatPrice } from "../utils/field-name"
import { Badge } from "../components/badge"
import { RootState, useSelector } from "@instapark/state"
import { RangeInput, useRange } from "react-instantsearch"
import { Input } from "../components/input"

interface SearchFilterPriceData {
    price: number
    count: number
}

const chartConfig = {
    count: {
        label: "Count",
        color: "hsl(var(--primary))",
    },
}

export function SearchFilterPrice() {


    const { range } = useRange({
        attribute: "pphcr"
    })

    return (
        <SearchFilter title="Price Range">
            <div className="relative mt-6">
                <ChartContainer config={chartConfig} className="">
                    <BarChart
                        margin={{
                            top: 0,
                            right: 24,
                            left: 24,
                            bottom: 0,
                        }}
                    >
                        <Bar
                            dataKey="count"
                            radius={[2, 2, 2, 2]}
                            fill="currentColor"
                            className="opacity-70"
                            isAnimationActive={false}
                            shape={(props) => {
                                const { x, y, width, height, price } = props
                                return (
                                    <rect
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={isInRange(price) ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                                        rx={2}
                                        ry={2}
                                    />
                                )
                            }}
                        />
                    </BarChart>
                </ChartContainer>
                <RangeInput attribute="pphcr" />
                <div className="px-6">
                    <Slider
                        min={range.min}
                        max={range.min}
                        step={50}
                    />
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between px-6">
                <div className="text-sm">
                    <div className="text-muted-foreground mb-1">Minimum</div>
                    <Input value={range.min} />
                </div>
                <div className="text-sm text-right">
                    <div className="text-muted-foreground mb-1">Maximum</div>
                    <Input value={range.max} />
                </div>
            </div>
        </SearchFilter>
    )
}

