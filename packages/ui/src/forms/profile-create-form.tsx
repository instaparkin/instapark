import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, z } from "@instapark/schemas";
import { useForm } from "react-hook-form";

export type ProfileFormType = z.infer<typeof profileSchema>

export const ProfileForm = () =>
    useForm<ProfileFormType>({
        resolver: zodResolver(profileSchema)
    })