"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '../components/card';
import { Button } from '../components/button';
import { Heart, Star } from 'lucide-react';
import Link from 'next/link';

export const HomeListingsResults = () => {
    const [data, setData] = useState([]);

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
                                q: ""
                            }
                        ]
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    setData(result);
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
                {data?.results?.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden">
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
                            <h2 className="font-semibold text-lg mb-1">{listing.title || "No Title"}</h2>
                            <p className="text-muted-foreground text-sm mb-2">{listing.location || "No Location"}</p>
                            <div className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span>{listing.rating || "N/A"}</span>
                                <span className="text-muted-foreground">({listing.reviews || 0} reviews)</span>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <div>
                                <span className="font-semibold">${listing.price || 0}</span> / night
                            </div>
                            <Button asChild variant={"instapark"}>
                                <Link href={`/listings/${listing.id}`}>View</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
};
