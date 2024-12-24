"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../components/card";
import { Button } from "../components/button";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

type ListingDocument = {
    createdAt: number;
    id: string;
    isOpen: boolean;
    listingId: string;
    updatedAt: number;
    userId: string;
};

type Hit = {
    document: ListingDocument;
    highlight: Record<string, unknown>;
    highlights: unknown[];
};

type SearchResult = {
    facet_counts: unknown[];
    found: number;
    hits: Hit[];
    out_of: number;
    page: number;
    request_params: {
        collection_name: string;
        first_q: string;
        per_page: number;
        q: string;
    };
    search_cutoff: boolean;
    search_time_ms: number;
};

type ApiResponse = {
    results: SearchResult[];
}

export const HomeListingsResults = () => {
    const [data, setData] = useState<Hit[]>([]);

    useEffect(() => {
        async function fetchResults() {
            try {
                const response = await fetch("http://localhost:8086/search/*", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        searches: [
                            {
                                collection: "listings_1",
                                q: "*",
                            },
                            {
                                collection: "places_1",
                                q: "*",
                            },
                        ],
                    }),
                });

                if (response.ok) {
                    const result: ApiResponse = await response.json();
                    console.log(result);
                    const hits = result.results[0]?.hits || [];
                    setData(hits);
                } else {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchResults();
    }, []);

    return (
        <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((hit) => {
                    const { document } = hit;
                    return (
                        <Link href={`/parkings/${hit.document.listingId}`}>
                            <Card key={document.id} className="overflow-hidden">
                                <div className="relative aspect-video">
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-2 right-2 rounded-full"
                                    >
                                        <Heart className="h-4 w-4" />
                                        <span className="sr-only">Save to wishlist</span>
                                    </Button>
                                </div>
                                <CardContent className="p-4">
                                    <h2 className="font-semibold text-lg mb-1">
                                        Listing ID: {document.listingId || "No Title"}
                                    </h2>
                                    <p className="text-muted-foreground text-sm mb-2">
                                        User ID: {document.userId || "No User ID"}
                                    </p>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Star className="h-4 w-4 fill-primary text-primary" />
                                        <span>Status: {document.isOpen ? "Open" : "Closed"}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                    <div>
                                        <span className="font-semibold">Created At:</span>{" "}
                                        {new Date(document.createdAt).toLocaleDateString()}
                                    </div>
                                    <Button asChild variant={"instapark"}>
                                        <Link href={`/listings/${document.id}`}>View</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
};

