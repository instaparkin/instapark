"use client";

import React from "react"
import { cn } from "../utils/cn";
import { Button } from "../components/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/dialog";
import { OTPInput, SlotProps } from "input-otp";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_OTP } from "../graphql/verify-otp";
import toast from "react-hot-toast";

const OTP_VERIFIED = "OTP verified successfully"

interface OTPDialogProps {
    bookingId: string
    otp: string
}

export function OTPDialog({ bookingId }: OTPDialogProps) {
    const [value, setValue] = useState("");
    const [hasGuessed, setHasGuessed] = useState<undefined | boolean>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (hasGuessed) {
            closeButtonRef.current?.focus();
        }
    }, [hasGuessed]);

    const [verifyOTP, { data, loading, error }] = useMutation(VERIFY_OTP)

    async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
        e?.preventDefault?.();
        inputRef.current?.select();
        await new Promise((r) => setTimeout(r, 1_00));
        verifyOTP({
            variables: {
                bookingId,
                otp: parseInt(value)
            }
        })
        if (data?.BookingMutation?.verifyOTP === OTP_VERIFIED) {
            setHasGuessed(true)
            toast.success(`${data?.BookingMutation?.verifyOTP}`)
        }else{
            setHasGuessed(false)
            toast.error(`${data?.BookingMutation?.verifyOTP}`)
        }
        setValue("");
        setTimeout(() => {
            inputRef.current?.blur();
        }, 20);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"responsive"} className="w-full">Approve</Button>
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <svg
                            className="stroke-zinc-800 dark:stroke-zinc-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            {hasGuessed ? "Code verified!" : "Enter confirmation code"}
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            {hasGuessed
                                ? "Your code has been successfully verified."
                                : ``}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {hasGuessed ? (
                    <div className="text-center">
                        <DialogClose asChild>
                            <Button type="button" ref={closeButtonRef}>
                                Close
                            </Button>
                        </DialogClose>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <OTPInput
                                id="cofirmation-code"
                                ref={inputRef}
                                value={value}
                                onChange={setValue}
                                containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                                maxLength={6}
                                onFocus={() => setHasGuessed(undefined)}
                                render={({ slots }) => (
                                    <div className="flex gap-2">
                                        {slots.map((slot, idx) => (
                                            <Slot key={idx} {...slot} />
                                        ))}
                                    </div>
                                )}
                                onComplete={onSubmit}
                            />
                        </div>
                        {hasGuessed === false && (
                            <p
                                className="text-muted-foreground text-center text-xs"
                                role="alert"
                                aria-live="polite"
                            >
                                Invalid code. Please try again.
                            </p>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                "border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
                { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive },
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
        </div>
    );
}
