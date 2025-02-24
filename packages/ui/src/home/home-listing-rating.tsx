import React from "react";
import { SprayCanIcon as Spray, CheckCircle, Key, MessageSquare, MapPin, Tag } from "lucide-react"

export function HomeListingRating() {
    return (
        <div className=" mx-auto p-6 border-t border-b my-4 mb-20">
            <div className="space-y-6">
                {/* Top score section */}
                <div className="flex justify-center items-center gap-4">
                    <span className="text-5xl md:text-6xl font-semibold">4.91</span>
                </div>

                {/* Heading and description */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-semibold">Ratings</h2>
                </div>

                {/* Ratings grid */}
                {/* Category ratings */}
                <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {[
                        { label: "Cleanliness", score: "5.0", icon: Spray },
                        { label: "Accuracy", score: "4.9", icon: CheckCircle },
                        { label: "Check-in", score: "4.8", icon: Key },
                        { label: "Communication", score: "4.9", icon: MessageSquare },
                        { label: "Location", score: "4.9", icon: MapPin },
                        { label: "Value", score: "4.9", icon: Tag },
                    ].map((category) => (
                        <div key={category.label} className="flex flex-col items-center gap-2">
                            <div className="text-xl font-medium">{category.score}</div>
                            <category.icon className="w-6 h-6 text-muted-foreground" />
                            <div className="text-sm text-muted-foreground text-center">{category.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

