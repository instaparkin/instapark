"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Heart } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { WishListCreateForm } from "../forms/wishlist-create-form";

interface ListingWishlistProps {
    triggerText?: string
}

export const ListingWishlist: React.FC<ListingWishlistProps> = ({ triggerText }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleButtonClick = (event: React.MouseEvent) => {
        setOpen(true);
        event.preventDefault();
        event.stopPropagation();
    };

    const form = WishListCreateForm();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    size="icon"
                    onClick={handleButtonClick}
                >
                    <Heart className="h-4 w-4" />
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-center my-2'>Add To Wishlist</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
