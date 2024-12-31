import { useForm } from "react-hook-form";
import { z } from "zod";
import { fullNameSchema } from "./profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserId } from "@instapark/auth";

export type FullnameType = z.infer<typeof fullNameSchema>;
let userId: string;

async function fetchUserId() {
    userId = await getUserId()
}

fetchUserId();

export const fullnameForm = () => useForm<FullnameType>({
    resolver: zodResolver(fullNameSchema),
    defaultValues: {
        userId,
        firstname: "",
        lastname: ""
    }
})