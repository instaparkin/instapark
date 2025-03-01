"use client";

import React from "react"
import { Button } from "../components/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/dialog";
import { useMutation } from "@apollo/client";
import { VERIFY_OTP } from "../graphql/verify-otp";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { UseFormReturn } from "react-hook-form";
import { OTPInputFormType } from "../forms/otp-input-form";
import { Form, FormControl, FormField, FormItem,FormMessage } from "./form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
import { redirect } from "next/navigation";

interface OTPDialogProps {
    bookingId: string
    form: UseFormReturn<OTPInputFormType>
}

export function OTPDialog({ bookingId, form }: OTPDialogProps) {
    const [verifyOTP] = useMutation(VERIFY_OTP, {
        onCompleted: (data) => {
            toast.success(data.BookingMutation?.verifyOTP as string)
        },
        onError: (error) => {
            toast.error(`${error}`)
        }
    })
    const onSubmit = (value: OTPInputFormType) => {
        verifyOTP({
            variables: {
                bookingId,
                otp: value.otp
            }
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"responsive"} className="w-full">Approve</Button>
            </DialogTrigger>
            <DialogContent
                onClose={() => {
                    redirect(`/hosting`)
                }}>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <Avatar>
                            <AvatarImage width={200} height={200} src="/instapark.svg" />
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            {"Enter confirmation code"}
                        </DialogTitle>
                    </DialogHeader>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputOTP type="number" maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter className="mt-6">
                                    <Button type="submit">Submit</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}