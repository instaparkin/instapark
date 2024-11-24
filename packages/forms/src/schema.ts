import { z } from "zod";

export const createPaymentSchema = z.object({
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.string(),
    phone: z.string(),
});

export const listingsAddSchema = z.object({
    name : z.string().optional(),
    photos : z.array(z.string()).min(4).max(8),
    review: z.object({
        location: z.number().max(5).optional(),
        cleanliness: z.number().max(5).optional(),
        communication: z.number().max(5).optional(),
        value: z.number().max(5).optional(),
        accuracy: z.number().max(5).optional(),
        description: z.string().min(10).optional(),
        date : z.date().optional(),
    }).optional(),
    ratings: z.object({
        rating: z.number().max(5).optional(),
        date: z.date().optional(),
    }).optional(),
    location: z.object({
        country: z.string({ message: "Country is required" }),
        state: z.string({ message: "State is required" }),
        district: z.string({ message: "District is required" }),
        city: z.string({ message: "City is required" }),
        street: z.string({ message: "Street is required" }),
        pincode: z.number({ message: "Pincode is required" }),
        house: z.string().optional(),
        landmark: z.string().optional(),
    })
});