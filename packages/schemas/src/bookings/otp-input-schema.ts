import z from "zod";

export const OTPInputSchema = z.object({
    otp: z.coerce.number().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })
