import { zodResolver } from "@hookform/resolvers/zod";
import { OTPInputSchema } from "@instapark/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type OTPInputFormType = z.infer<typeof OTPInputSchema>

export const OTPInputForm = () => useForm<OTPInputFormType>({
    resolver: zodResolver(OTPInputSchema),
    defaultValues: {
        otp: "",
    },
})